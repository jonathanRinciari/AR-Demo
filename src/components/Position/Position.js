import React from 'react';
import './Position.css';
import PositionIndicator from "../Position-Indicator/Position-Indicator";

const Position = ({i}) => {
  const positionColorMap = {
    1: '#D6AF36',
    2: '#A7A7AD',
    3: '#A77044',
    4: '#FEE101',
    5: '#00953a'
  };

  return (
    <div className="Position-position" style={{backgroundColor: positionColorMap[i+1]}}>
      <PositionIndicator i={i}/>
    </div>
  )
}

export default Position;
