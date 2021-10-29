import React from 'react'
import { CoursePart } from '../types';
import Part from './Part';

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => 
  <>
    {courseParts.map(c => <Part key={c.name} course={c} />)}
  </>;

export default Content;