import React, { Component } from 'react';

const Time = (props) => {
  const min = Math.floor(props.time.total / 1000 / 60 % 60);
  const sec = Math.floor(props.time.total / 1000 % 60);
    return (
      <span className="time">{`${min}: ${sec}`}</span>
    );
}

export default Time;
