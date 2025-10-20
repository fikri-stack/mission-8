import axios from 'axios';
import type { Content } from '../utils/types';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
});

export const fetchCourses = async (): Promise<Content[]> => {
  try {
    const response = await api.get('/posts');
    return response.data.slice(0, 10).map((post: any, index: number) => ({
      id: post.id,
      title: post.title,
      description: post.body.substring(0, 100) + '...',
      price: `Rp ${(index + 1) * 50}K`,
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
      reviewCount: Math.floor(Math.random() * 200) + 50,
      contentImage: `/assets/contents/content${(index % 9) + 1}.jpg`,
      details: {
        descriptionDetail: post.body,
        reviews: [],
        tutordetails: [{
          avatar: "/assets/avatar.png",
          name: "API Instructor",
          position: "Online Tutor",
          detail: "Experienced online instructor"
        }],
        courseDetails: []
      }
    }));
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};