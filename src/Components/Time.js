import React, { Component } from 'react';

const Time = (props) => {
    return (
      <div className="timer">
      <span className="time">{`${props.time.min}: ${props.time.sec}`}</span><br/>
      <span className="break">{`${props.session.min} : ${props.session.sec}`}</span>
      </div>
    );
}

export default Time;
