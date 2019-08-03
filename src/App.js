import React from 'react';
import './App.css';

const Button = (props) => {
  return (
    <button onClick={props.handler}> 
      {props.text}
    </button>
  );
}

const Display = (props) => {  
  const interval = setTimeout(() => {
    console.log('targetTime is ' + props.targetTime + ' seconds');

    props.update(props.targetTime - 1);
  }, 1000);


  let remainingMinutes = Math.floor(props.targetTime / 60);
  let remainingSeconds = props.targetTime % 60;
  
  // hacky, but whatevz
  if (remainingMinutes === 0) {
    remainingMinutes = '00';
  }

  if (remainingMinutes < 10) {
    remainingMinutes = '0' + remainingMinutes;
  }

  if (remainingSeconds < 10) {
    remainingSeconds = '0' + remainingSeconds;
  }

  if (remainingSeconds === 0) {
    remainingSeconds = '00';
  }

  if (remainingMinutes == 0 && remainingSeconds == 0) {
    clearInterval(interval);
  }

  return (
    <div>{remainingMinutes}:{remainingSeconds} left</div>
  );
}


const App = () => {
    let targetTimeInSeconds = 25 * 60; // 25 minutes * 60 seconds = 1500
    //let targetTimeInSeconds = Math.round(24.233 * 60); // this is 24 minutes and 5 seconds 
    const [countdownTime, updateCountdownTime] = React.useState(targetTimeInSeconds)
    
    //let isCountingDown = false;

    let startTimer = () => {
      //isCountingDown = true; 
    };
    
    let stopTimer = () => {
      
      //isCountingDown = false;
    };
    
    let resetTimer = () => {
      updateCountdownTime(targetTimeInSeconds);
    }; 
  
    return (
      <div>
        <Button text="Start" handler={startTimer} />
        &nbsp;
        <Button text="Stop" handler={stopTimer} />
        &nbsp;
        <Button text="Reset" handler={resetTimer} />
        &nbsp;
        <Display update={updateCountdownTime} targetTime={countdownTime}/>
      </div>
    ); 
}


export default App;
