'use client';
import React, { useState } from 'react';

import CourseList from '@/components/CourseList';
// import GradeChart from './GradeChart';

function Home() {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [creditHours, setCreditHours] = useState('');
  const [grade, setGrade] = useState('');

  const addCourse = () => {
    if (courseName && creditHours && grade) {
      const newCourse = {
        courseName,
        creditHours: parseFloat(creditHours),
        grade,
      };

      setCourses([...courses, newCourse]);
      setCourseName('');
      setCreditHours('');
      setGrade('');
    }
  };

  const deleteCourse = (index) => {
    const updatedCourses = [...courses];
    updatedCourses.splice(index, 1);
    setCourses(updatedCourses);
  };

  const onEditCourse = (editedCourse) => {
    const updatedCourses = [...courses];
    const index = updatedCourses.findIndex((course) => course === editedCourse);
    if (index !== -1) {
      updatedCourses[index] = editedCourse;
      setCourses(updatedCourses);
    }
  };

  const calculateCGPA = () => {
    const totalCreditPoints = courses.reduce(
      (total, course) =>
        total + course.creditHours * getGradePoints(course.grade),
      0
    );
    const totalCredits = courses.reduce(
      (total, course) => total + course.creditHours,
      0
    );

    return totalCreditPoints / totalCredits;
  };

  const getGradePoints = (grade) => {
    const gradingScale = {
      'A+': 4.0,
      A: 3.75,
      'B+': 3.5,
      B: 3.25,
      'C+': 3,
      'C:': 2.75,
      'D+': 2.5,
      D: 2.25,
      F: 0,
    };

    return gradingScale[grade] || 0.0;
  };

  return (
    <div className='App'>
      <h1>CGPA Calculator</h1>
      <div className='course-entry'>
        <input
          type='text'
          placeholder='Course Name'
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <select
          value={creditHours}
          onChange={(e) => setCreditHours(e.target.value)}
        >
          <option value=''>Select Credit Hours</option>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
        </select>
        <select value={grade} onChange={(e) => setGrade(e.target.value)}>
          <option value=''>Select Grade</option>
          <option value='A+'>A+</option>
          <option value='A'>A</option>
          <option value='B+'>B+</option>
          <option value='B'>B</option>
          <option value='C+'>C+</option>
          <option value='C'>C</option>
          <option value='D+'>D+</option>
          <option value='D'>D</option>
          <option value='F'>F</option>
          {/* Add more grade options here */}
        </select>
        <button onClick={addCourse}>Add Course</button>
      </div>
      <CourseList
        courses={courses}
        onDeleteCourse={deleteCourse}
        onEditCourse={onEditCourse}
      />
      {/* <GradeChart /> */}
      {courses.length > 1 && (
        <div className='cgpa'>CGPA: {calculateCGPA().toFixed(2)}</div>
      )}
    </div>
  );
}

export default Home;
