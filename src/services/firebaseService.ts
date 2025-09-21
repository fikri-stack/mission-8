import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  getDoc 
} from "firebase/firestore";
import { db } from "../firebase";
import type { Content } from "../utils/types";

const COLLECTION_NAME = "courses";

// CREATE - Tambah course baru
export const addCourse = async (courseData: Omit<Content, 'id'>) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), courseData);
    return { id: docRef.id, ...courseData };
  } catch (error) {
    console.error("Error adding course:", error);
    throw error;
  }
};

// READ - Ambil semua courses
export const getCourses = async (): Promise<Content[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const courses: Content[] = [];
    querySnapshot.forEach((doc) => {
      courses.push({ id: parseInt(doc.id), ...doc.data() } as Content);
    });
    return courses;
  } catch (error) {
    console.error("Error getting courses:", error);
    throw error;
  }
};

// READ - Ambil course by ID
export const getCourseById = async (id: string): Promise<Content | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: parseInt(docSnap.id), ...docSnap.data() } as Content;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting course:", error);
    throw error;
  }
};

// UPDATE - Update course
export const updateCourse = async (id: string, courseData: Partial<Content>) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, courseData);
    return { id, ...courseData };
  } catch (error) {
    console.error("Error updating course:", error);
    throw error;
  }
};

// DELETE - Hapus course
export const deleteCourse = async (id: string) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
    return id;
  } catch (error) {
    console.error("Error deleting course:", error);
    throw error;
  }
};

// DELETE ALL - Hapus semua courses
export const clearAllCourses = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
    return true;
  } catch (error) {
    console.error("Error clearing all courses:", error);
    throw error;
  }
};