import { getCourses } from './src/services/firebaseService.ts';

// Test untuk melihat data
getCourses()
  .then(courses => {
    console.log('Data courses:', courses);
    console.log('Total courses:', courses.length);
  })
  .catch(error => {
    console.error('Error:', error);
  });