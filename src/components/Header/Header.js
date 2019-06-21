import React from 'react';
import AntRace from "../../assets/racing.png";
import './Header.css'

const AntHeader = () => {
  return (
    <header className="Header-wrapper">
      <div className="Header-image-wrapper">
        <img className="Header-image" src={AntRace} alt="ant-racing"/>
      </div>
    </header>
  )
};

export default AntHeader;
