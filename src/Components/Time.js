import React, { Component } from 'react';

const Time = (props) => {
    return (
      <div className="timer">
      <span className="time" id="session-label">{`${props.time.min}: ${props.time.sec}`}</span><br/>
      <span className="break" id="break-label">{`${props.break.min} : ${props.break.sec}`}</span>
      </div>
    );
}

export default Time;
