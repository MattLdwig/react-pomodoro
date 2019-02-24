import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Time from './Components/Time'

const twentyToMilli = 1500000;
const fiveToMilli = 300000;

class App extends Component {
  constructor() {
    super();
    this.state = {
      initTimer: this.getTime(twentyToMilli)
    }

    this.getTime = this.getTime.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);

  }

  startTimer() {
    this.updateDisplay();
  }

  updateDisplay() {
    const min = this.state.initTimer.min,
          sec = this.state.initTimer.sec,
          total = this.state.initTimer.tTime;
      setInterval(() => {
        const tTime = this.state.initTimer.tTime - 1000;

        console.log(total);

        this.setState({
          initTimer: {tTime, min, sec}
        })
      }, 1000);
  }

  getTime(time) {
    const min = Math.floor(time / 1000 / 60 % 60);
    const sec = Math.floor(time / 1000 % 60);
    const tTime = time;
    return {tTime, min, sec};
  }

  render() {
    return (
      <div className="App">
      <Time time={this.state.initTimer} />
      <button onClick={this.updateDisplay}>Click me</button>
      </div>
    );
  }
}

export default App;
