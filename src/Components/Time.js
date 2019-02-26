import React, { Component } from 'react';

const Time = (props) => {
    return (
      <div className="timer">
        <h1 className="time-left" id="time-left">{`${props.time.min}: ${props.time.sec}`}</h1>
        <div className="info">
          <p className="session" id="session-label">Session Length: <span id="session-length">{`${props.session.min}`}</span></p>
          <p className="break" id="break-label">Break Length: <span id="break-length">{`${props.break.min}`}</span></p>
        </div>
        <p id="timer-label">{props.sessionInitialized ? "Session running" : "Session stopped"}</p>
      </div>
    );
}

export default Time;
