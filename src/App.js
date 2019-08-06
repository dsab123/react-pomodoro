import React from 'react';
import './App.css';

const PomodoroButton = (props) => {
  return (
    <button className={props.className} onClick={props.clickHandler}> 
      {props.text}
    </button>
  );
}

const TimeDisplay = (props) => {
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


  let createBeep = () => {
    const context = new AudioContext();
    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.connect(gain);
    gain.connect(context.destination);
    gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 4);
    osc.start(0);
  }

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

  // if targetTime is 0, pomodoro is over
  if (props.targetTime === 0) {
    if (!stopTicking) {
      createBeep();
      updateStopTicking(true);
    }
    // need this else to handle reset
  } else if (props.targetTime > 0) {
    if (stopTicking) {
      updateStopTicking(false);
    }
  }

  return (
    <label>{remainingMinutes}:{remainingSeconds} left</label>
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
