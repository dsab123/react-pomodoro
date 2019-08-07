import React from 'react';
import TimeDisplay from './TimeDisplay';
import PomodoroButton from './PomodoroButton';

const App = () => {
  let targetTimeInSeconds = 25 * 60; // 25 minutes * 60 seconds = 1500 seconds 
  const [countdownTime, updateCountdownTime] = React.useState(targetTimeInSeconds) 
  const [pauseTimer, updatePauseTimer] = React.useState(false);
    
  let startTimerHandler = () => {
    updatePauseTimer(false);
  };
    
  let pauseTimerHandler = () => {
    updatePauseTimer(true);  
  };
    
  let resetTimerHandler = () => {
    updateCountdownTime(targetTimeInSeconds);
    updatePauseTimer(true);
  }; 

  return (
    <div className="container">
      <div className="buttons-container">
        <PomodoroButton text="Start" className="start-button" clickHandler={startTimerHandler} />
        &nbsp;
        <PomodoroButton text="Pause" className="pause-button" clickHandler={pauseTimerHandler} />
        &nbsp;
        <PomodoroButton text="Reset" className="reset-button" clickHandler={resetTimerHandler} />
      </div>
      <TimeDisplay update={updateCountdownTime} pauseTimer={pauseTimer} targetTime={countdownTime}/>
    </div>
  ); 
}

export default App;
