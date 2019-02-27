import React, { Component } from 'react';

const Time = (props) => {
    return (
      <div className="timer">
        <h1 className="time-left" id="time-left">{`${props.time.min}:${props.time.sec}`}</h1>
      </div>
    );
}

export default Time;
