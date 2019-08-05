import React from 'react';
import './App.css';

const Button = (props) => {
  return (
    <button onClick={props.clickHandler}> 
      {props.text}
    </button>
  );
}

const Display = (props) => {
  const [stopTicking, updateStopTicking] = React.useState(false);
  
  // If timer is not stopped or has finished, we continue to count down.
  React.useEffect(() => {
      if (!props.pauseTimer && !stopTicking) {
      const timeout = setTimeout(() => {    
        props.update(props.targetTime - 1);
      }, 1000);

      return () => clearTimeout(timeout);
    }
  });
  
  
  let remainingMinutes = Math.floor(props.targetTime / 60);
  let remainingSeconds = props.targetTime % 60;
  
  if (remainingMinutes < 10) {
    remainingMinutes = '0' + remainingMinutes;
  } else if (remainingMinutes === 0) {
    remainingMinutes = '00';
  }  

  if (remainingSeconds < 10) {
    remainingSeconds = '0' + remainingSeconds;
  } else if (remainingSeconds === 0) {
    remainingSeconds = '00';
  }

  if (props.targetTime === 0) {
    if (!stopTicking) {
      updateStopTicking(true);
    }
  } else if (props.targetTime > 0) {
    if (stopTicking) {
      updateStopTicking(false);
    }
  }

  return (
    <div>{remainingMinutes}:{remainingSeconds} left</div>
  );
}

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
    <div>
      <Button text="Start" clickHandler={startTimerHandler} />
      &nbsp;
      <Button text="Pause" clickHandler={pauseTimerHandler} />
      &nbsp;
      <Button text="Reset" clickHandler={resetTimerHandler} />
      &nbsp;
      <Display update={updateCountdownTime} pauseTimer={pauseTimer} targetTime={countdownTime}/>
    </div>
  ); 
}

export default App;