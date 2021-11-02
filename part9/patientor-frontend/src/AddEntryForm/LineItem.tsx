import React from 'react';

type NewValueFunction = (value: string) => void;

const LineItem = ({ name, value, onChange } : {
  name: string;
  value: string;
  onChange: NewValueFunction
  },
) => {
  return (
    <div>
      <label htmlFor={name}>{name}</label><br />
      <input
        id={name}
        name={name}
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default LineItem;