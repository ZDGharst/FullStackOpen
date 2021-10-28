import React from 'react'

const Total = ({ courseParts }: { courseParts: Array<any> }) => (
  <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

export default Total;