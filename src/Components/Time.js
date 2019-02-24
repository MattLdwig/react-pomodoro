import React, { Component } from 'react';

const Time = (props) => {
    return (
      <span className="time">{`${props.time.min}: ${props.time.sec}`}</span>
    );
}

export default Time;
