import React from 'react';

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

export default TimeDisplay;