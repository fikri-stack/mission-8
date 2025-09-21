import { create } from 'zustand';
import { getCourses, addCourse, updateCourse, deleteCourse, clearAllCourses } from '../services/firebaseService';
import type { Content } from '../utils/types';

interface CourseState {
  courses: Content[];
  loading: boolean;
  error: string | null;
  
  // Actions
  loadCourses: () => Promise<void>;
  createCourse: (courseData: Omit<Content, 'id'>) => Promise<void>;
  editCourse: (id: string, courseData: Partial<Content>) => Promise<void>;
  removeCourse: (id: string) => Promise<void>;
  clearAll: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  loading: false,
  error: null,

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  loadCourses: async () => {
    try {
      set({ loading: true, error: null });
      const courses = await getCourses();
      set({ courses, loading: false });
    } catch (error) {
      set({ 
        error: 'Failed to load courses', 
        loading: false 
      });
      console.error(error);
    }
  },

  createCourse: async (courseData) => {
    try {
      set({ loading: true, error: null });
      const newCourse = await addCourse(courseData);
      set((state) => ({ 
        courses: [...state.courses, newCourse],
        loading: false 
      }));
    } catch (error) {
      set({ 
        error: 'Failed to create course', 
        loading: false 
      });
      throw error;
    }
  },

  editCourse: async (id, courseData) => {
    try {
      set({ loading: true, error: null });
      await updateCourse(id, courseData);
      set((state) => ({
        courses: state.courses.map(course => 
          String(course.id) === String(id) 
            ? { ...course, ...courseData }
            : course
        ),
        loading: false
      }));
    } catch (error) {
      set({ 
        error: 'Failed to update course', 
        loading: false 
      });
      throw error;
    }
  },

  removeCourse: async (id) => {
    try {
      set({ loading: true, error: null });
      await deleteCourse(id);
      set((state) => ({
        courses: state.courses.filter(course => String(course.id) !== String(id)),
        loading: false
      }));
    } catch (error) {
      set({ 
        error: 'Failed to delete course', 
        loading: false 
      });
      throw error;
    }
  },

  clearAll: async () => {
    try {
      set({ loading: true, error: null });
      await clearAllCourses();
      set({ courses: [], loading: false });
    } catch (error) {
      set({ 
        error: 'Failed to clear all courses', 
        loading: false 
      });
      throw error;
    }
  },
}));