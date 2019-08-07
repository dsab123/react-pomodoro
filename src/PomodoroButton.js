import React from 'react';

const PomodoroButton = (props) => {
return (
    <button className={props.className} onClick={props.clickHandler}> 
    {props.text}
    </button>
);
}

export default PomodoroButton;