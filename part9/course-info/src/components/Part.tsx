import React from 'react';
import { CoursePart } from '../types';

const Part = ({ course }: { course: CoursePart }) => {
  switch(course.type) {
    case 'normal':
      return (<>
        <h2>Course: {course.name}</h2>
        <p>Description: <em>{course.description}</em></p>
        <p>Number of exercises: {course.exerciseCount}</p>
      </>);
    case 'groupProject':
      return (<>
        <h2>Course: {course.name}</h2>
        <p>Number of group projects: <em>{course.groupProjectCount}</em></p>
        <p>Number of exercises: {course.exerciseCount}</p>
      </>);
    case 'submission':
      return (<>
        <h2>Course: {course.name}</h2>
        <p>Description: <em>{course.description}</em></p>
        <p>Submission link: {course.exerciseSubmissionLink}</p>
        <p>Number of exercises: {course.exerciseCount}</p>
      </>);
    case 'special':
      return (<>
        <h2>Course: {course.name}</h2>
        <p>Description: <em>{course.description}</em></p>
        <p>Submission link: {course.requirements.join(', ')}</p>
        <p>Number of exercises: {course.exerciseCount}</p>
      </>);
  }
};

export default Part;