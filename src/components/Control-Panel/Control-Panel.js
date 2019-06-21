import React from 'react';
import './Control-Panel.css';
import Button from "@material-ui/core/Button";
import PositionIndicator from "../Position-Indicator/Position-Indicator";

const ControlPanel = ({status, getEstimates, reset, selectedName, finishedPosition, score}) => {
  return (
    <>
      <h2>Control Panel</h2>
      <span className="ControlPanel-selectedName"><b>Status:</b> {status}</span>
      <span className="ControlPanel-selectedName"><b>Selected:</b> {selectedName ? selectedName : 'Select an Ant!'}</span>
      {finishedPosition ? (<span className="ControlPanel-selectedName"><b>Finished:</b> <PositionIndicator i={finishedPosition - 1}/></span>) : null}
      {score > 0 ? (<span className="ControlPanel-selectedName"><b>Score:</b> {score}</span>) : null}
      <div className="ControlPanel-button-wrapper">
        <Button disabled={status === 'In Progress' || status === 'Complete' || !selectedName} onClick={getEstimates} size="medium" variant="contained" color="primary">
          {selectedName ? 'Estimate' : 'Select an Ant'}
        </Button>
        <Button onClick={reset} size="medium" variant="contained" color="secondary">
          Reset
        </Button>
      </div>
      <hr/>
      <div className="ControlPanel-instructions">
        <h2>Instructions</h2>
        <span className="ControlPanel-helpText">
          Select the Ant you think will win!
          Depending on the position that they finish at you will receive a score.
          Once an Ant is selected hit the Estimate button, and we will run our state of the art Ant Race Analyzer
          to calculate their finish times! You can Reset the race by pressing the reset button! Happy Racing!
        </span>
      </div>
    </>
  )
};

export default ControlPanel;
