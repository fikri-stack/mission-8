import { useState, useEffect } from "react";
import { getCourses, addCourse, updateCourse, deleteCourse } from "../firebaseService";
import type { Content } from "../../utils/types";

export const useFirebase = () => {
  const [courses, setCourses] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load courses from Firebase
  const loadCourses = async () => {
    try {
      setLoading(true);
      const data = await getCourses();
      setCourses(data);
      setError(null);
    } catch (err) {
      setError("Failed to load courses");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add new course
  const createCourse = async (courseData: Omit<Content, 'id'>) => {
    try {
      const newCourse = await addCourse(courseData);
      setCourses(prev => [...prev, newCourse]);
      return newCourse;
    } catch (err) {
      setError("Failed to add course");
      throw err;
    }
  };

  // Update existing course
  const editCourse = async (id: string, courseData: Partial<Content>) => {
    try {
      await updateCourse(id, courseData);
      setCourses(prev => 
        prev.map(course => 
          course.id.toString() === id 
            ? { ...course, ...courseData } as Content
            : course
        )
      );
    } catch (err) {
      setError("Failed to update course");
      throw err;
    }
  };

  // Delete course
  const removeCourse = async (id: string) => {
    try {
      await deleteCourse(id);
      setCourses(prev => prev.filter(course => course.id.toString() !== id));
    } catch (err) {
      setError("Failed to delete course");
      throw err;
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  return {
    courses,
    loading,
    error,
    createCourse,
    editCourse,
    removeCourse,
    refreshCourses: loadCourses
  };
};