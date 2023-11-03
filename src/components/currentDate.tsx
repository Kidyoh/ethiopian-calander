import React from 'react';

interface CurrentDateProps {
  date: any; // Define the type of date prop
}

const CurrentDateComponent: React.FC<CurrentDateProps> = ({ date }) => {
  return (
    <div>
      <p>Current Date: {date.day}/{date.month}/{date.year}</p>
    </div>
  );
};

export default CurrentDateComponent;
