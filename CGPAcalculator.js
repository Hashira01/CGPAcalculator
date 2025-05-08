import React, { useState } from 'react';

function CGPACalculator() {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [creditHours, setCreditHours] = useState('');
  const [grade, setGrade] = useState('');
  const [cgpa, setCGPA] = useState(0);

  const addCourse = () => {
    if (courseName && creditHours && grade) {
      setCourses([...courses, { name: courseName, creditHours: parseInt(creditHours), grade }]);
      setCourseName('');
      setCreditHours('');
      setGrade('');
    }
  };

  const calculateCGPA = () => {
    let totalGradePoints = 0;
    let totalCreditHours = 0;

    courses.forEach(course => {
      let gradePoint = 0;
      switch (course.grade) {
        case 'A': gradePoint = 5; break;
        case 'B': gradePoint = 4; break;
        case 'C': gradePoint = 3; break;
        case 'D': gradePoint = 2; break;
        case 'E': gradePoint = 1; break;
        case 'F': gradePoint = 0; break;
        default: gradePoint = 0;
      }
      totalGradePoints += gradePoint * course.creditHours;
      totalCreditHours += course.creditHours;
    });
    if (totalCreditHours > 0) {
        setCGPA((totalGradePoints / totalCreditHours).toFixed(2));
    } else {
        setCGPA(0);
    }
  };

  const deleteCourse = (index) => {
    const newCourses = [...courses];
    newCourses.splice(index, 1);
    setCourses(newCourses);
  }

  return (
    <div>
      <h2>CGPA Calculator</h2>
      <div>
        <input
          type="text"
          placeholder="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Credit Hours"
          value={creditHours}
          onChange={(e) => setCreditHours(e.target.value)}
        />
        <select value={grade} onChange={(e) => setGrade(e.target.value)}>
          <option value="">Select Grade</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
        </select>
        <button onClick={addCourse}>Add Course</button>
      </div>
      <div>
        <h3>Courses</h3>
        {courses.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Credit Hours</th>
                <th>Grade</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index}>
                  <td>{course.name}</td>
                  <td>{course.creditHours}</td>
                  <td>{course.grade}</td>
                  <td><button onClick={() => deleteCourse(index)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <button onClick={calculateCGPA}>Calculate CGPA</button>
      {cgpa > 0 && (
        <div>
          <h3>CGPA: {cgpa}</h3>
        </div>
      )}
    </div>
  );
}

export default CGPACalculator;