import React from 'react'

const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </>
)

const Header = ({ course }) => (
  <h2>{course.name}</h2>
)

const Content = ({ course }) => (
  <>
    {course.parts.map(part => <Part key={part.id} part={part} />)}
  </>
)

const Part = ({ part }) => (
  <p>{part.name} {part.exercises}</p>
)

const Total = ({ course }) => {
  const total = course.parts.reduce((accumulator, current) => accumulator + current.exercises, 0)
  return (
    <p>Number of exercises {total}</p>
  )
}

export default Course