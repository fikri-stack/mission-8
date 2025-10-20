import { useState, useEffect } from "react";
import { useCourseStore } from "../stores/courseStore";
import { ButtonUI } from "../components/UIs/button";
import { TextInput } from "../components/UIs/input";
import { HeaderLayout } from "../layouts/header";
import { FooterLayout } from "../layouts/footer";
import { getData } from "../services/getData";
import type { Content } from "../utils/types";

export const AdminPage = () => {
  const { courses, loading, createCourse, editCourse, removeCourse, loadCourses, clearAll } = useCourseStore();
  
  useEffect(() => {
    loadCourses();
  }, []);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    rating: 0,
    reviewCount: 0,
    contentImage: "/assets/contents/content1.jpg"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const courseData = {
      ...formData,
      rating: Number(formData.rating),
      reviewCount: Number(formData.reviewCount),
      details: {
        descriptionDetail: formData.description,
        reviews: [],
        tutordetails: [{
          avatar: "/assets/avatar.png",
          name: "Admin User",
          position: "Instructor at Academy",
          detail: "Experienced instructor"
        }],
        courseDetails: []
      }
    };

    try {
      if (editingId) {
        await editCourse(editingId, courseData);
      } else {
        await createCourse(courseData);
      }
      
      setFormData({
        title: "",
        description: "",
        price: "",
        rating: 0,
        reviewCount: 0,
        contentImage: "/assets/contents/content1.jpg"
      });
      setShowForm(false);
      setEditingId(null);
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  const handleEdit = (course: Content) => {
    setFormData({
      title: course.title,
      description: course.description,
      price: course.price,
      rating: course.rating,
      reviewCount: course.reviewCount,
      contentImage: course.contentImage
    });
    setEditingId(String(course.id));
    setShowForm(true);
  };

  const handleDelete = async (id: string | number) => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        await removeCourse(String(id));
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  return (
    <>
      <HeaderLayout />
      <div className="px-standard py-14">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-heading3 font-bold">Admin - Course Management</h1>
          <div className="flex gap-2">
            <ButtonUI 
              variant="tertiary"
              onClick={async () => {
                if (confirm('Delete ALL courses? This cannot be undone!')) {
                  try {
                    await clearAll();
                    alert('All courses deleted!');
                  } catch (error) {
                    console.log(error)
                    alert('Failed to delete courses!');
                  }
                }
              }}
              className="bg-red-500 text-white"
            >
              Clear All
            </ButtonUI>
            <ButtonUI 
              variant="secondary"
              onClick={async () => {
                if (courses.length > 0) {
                  alert('Database already has data! Use Clear All first.');
                  return;
                }
                
                const mockData = getData().getAllData().data;
                for (const course of mockData.slice(0, 3)) {
                  const { id, ...courseData } = course;
                  await createCourse(courseData);
                }
                alert('3 sample courses added!');
              }}
            >
              Seed Data
            </ButtonUI>
            <ButtonUI onClick={() => setShowForm(!showForm)}>
              {showForm ? "Cancel" : "Add New Course"}
            </ButtonUI>
          </div>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-md shadow mb-8">
            <h2 className="text-heading5 font-bold mb-4">
              {editingId ? "Edit Course" : "Add New Course"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <TextInput
                label="Title"
                value={formData.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, title: e.target.value})}
                required
              />
              <TextInput
                label="Description"
                value={formData.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, description: e.target.value})}
                required
              />
              <TextInput
                label="Price"
                value={formData.price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, price: e.target.value})}
                required
              />
              <TextInput
                label="Rating (0-5)"
                type="number"
                value={formData.rating.toString()}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, rating: Number(e.target.value)})}
                required
              />
              <TextInput
                label="Review Count"
                type="number"
                value={formData.reviewCount.toString()}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, reviewCount: Number(e.target.value)})}
                required
              />
              <div className="flex gap-4">
                <ButtonUI type="submit">
                  {editingId ? "Update Course" : "Add Course"}
                </ButtonUI>
                <ButtonUI 
                  type="button" 
                  variant="secondary"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                >
                  Cancel
                </ButtonUI>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">Loading courses...</div>
        ) : (
          <div className="grid gap-4">
            {courses.map((course) => (
              <div key={course.id} className="bg-white p-4 rounded-md shadow flex justify-between items-center">
                <div>
                  <h3 className="text-heading6 font-bold">{course.title}</h3>
                  <p className="text-bodyMedium text-gray-600">{course.description}</p>
                  <p className="text-bodySmall">Price: {course.price} | Rating: {course.rating}/5</p>
                </div>
                <div className="flex gap-2">
                  <ButtonUI 
                    variant="secondary" 
                    onClick={() => handleEdit(course)}
                    className="px-4 py-2"
                  >
                    Edit
                  </ButtonUI>
                  <ButtonUI 
                    variant="tertiary" 
                    onClick={() => handleDelete(course.id)}
                    className="px-4 py-2 bg-red-500 text-white"
                  >
                    Delete
                  </ButtonUI>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <FooterLayout />
    </>
  );
};