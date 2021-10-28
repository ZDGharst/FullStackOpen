import React from 'react'

const Content = ({ courseParts }: { courseParts: Array<any> }) => {
  return <>{courseParts.map(c => <p key={c.name}>{c.name} {c.exerciseCount}</p>)}</>;
};

export default Content;