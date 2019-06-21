import React from 'react';
import './Badge.css';

const Badge = ({status}) => {
  return (
    <div className="Badge-badge">
      {status}
    </div>
  )
};

export default Badge;
