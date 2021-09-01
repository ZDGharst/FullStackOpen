import React from 'react'

const Course = ({ course }) => (
  <>
    <Header course={course} />
    <Content course={course} />
  </>
)

const Header = ({ course }) => (
  <h1>{course.name}</h1>
)

const Content = ({ course }) => (
  <>
    {course.parts.map(part => <Part key={part.id} part={part} />)}
  </>
)

const Part = ({ part }) => (
  <p>{part.name} {part.exercises}</p>
)

const Total = (props) => (
  <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
)

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App