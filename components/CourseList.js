'use client';
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons from a library like react-icons

function CourseList({ courses, onDeleteCourse, onEditCourse }) {
  const [editMode, setEditMode] = useState(false);
  const [editedCourse, setEditedCourse] = useState({});

  const handleEditClick = (course) => {
    setEditedCourse(course);
    setEditMode(true);
  };

  const handleSaveEdit = () => {
    // Validate edited course details
    if (
      editedCourse.courseName &&
      editedCourse.creditHours &&
      editedCourse.grade
    ) {
      onEditCourse(editedCourse);
      setEditMode(false);
      setEditedCourse({});
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedCourse({});
  };

  return (
    <div className='course-list'>
      <h2>Course List</h2>
      <div className='table-container'>
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Credit Hours</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td>{course.courseName}</td>
                <td>{course.creditHours}</td>
                <td>{course.grade}</td>
                <td>
                  <span
                    className='icon-button'
                    onClick={() => handleEditClick(course)}
                    style={{ display: 'inlineBlock', marginRight: '20px' }}
                  >
                    <FaEdit />
                  </span>
                  <span
                    className='icon-button'
                    onClick={() => onDeleteCourse(index)}
                  >
                    <FaTrash />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {editMode && (
        <div className='edit-course'>
          <input
            type='text'
            placeholder='Course Name'
            value={editedCourse.courseName}
            onChange={(e) =>
              setEditedCourse({ ...editedCourse, courseName: e.target.value })
            }
          />
          <select
            value={editedCourse.creditHours}
            onChange={(e) =>
              setEditedCourse({
                ...editedCourse,
                creditHours: parseFloat(e.target.value),
              })
            }
          >
            <option value=''>Select Credit Hours</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </select>
          <select
            value={editedCourse.grade}
            onChange={(e) =>
              setEditedCourse({ ...editedCourse, grade: e.target.value })
            }
          >
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
          <button onClick={handleCancelEdit} style={{ marginRight: '10px' }}>
            Cancel
          </button>
          <button onClick={handleSaveEdit}>Save</button>
        </div>
      )}
    </div>
  );
}

export default CourseList;
