import React from 'react';

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }

  const Total = ({ course }) => {
    const sum = course.parts.map((part) => part.exercises).reduce((acc, currVal) => acc + currVal, 0)
    return(
      <p><b>total of {sum} exercises</b></p>
    )
  }

  const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }

  const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map((part, i) => <Part part={part} key={i}/>)}
      </div>
    )
  }

  const Course = ({ course }) => {

    return (
      <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
  }

  export default Course;
