import React from 'react';

const PositionIndicator = ({i}) => {
  return (
    <span>{i + 1}<sup>{i+1 === 3 ? 'rd' : (i+1 === 5 || i+1 === 4) ? 'th' : i+1 === 2 ? 'nd' : 'st'}</sup></span>
  )
};

export default PositionIndicator;
