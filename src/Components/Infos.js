import React, { Component } from 'react';

const Infos = (props) => {
    return (
      <div className="info">
        <p className="session" id="session-label">Session Length: <span id="session-length">{`${props.session.min}`}</span></p>
        <p className="break" id="break-label">Break Length: <span id="break-length">{`${props.break.min}`}</span></p>
        <p id="timer-label">{props.sessionInitialized ? "Session running" : "Session stopped"}</p>
      </div>
    );
}

export default Infos;
