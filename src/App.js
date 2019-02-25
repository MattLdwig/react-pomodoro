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
      initTimer: this.getTime(twentyToMilli),
      initBreak: this.getTime(fiveToMilli),
      workTime: true
    }

    this.getTime = this.getTime.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);

  }

  startTimer() {
    this.updateDisplay();
  }

  updateDisplay() {
    if (this.state.workTime) {
      const min = this.state.initTimer.min,
            sec = this.state.initTimer.sec,
            total = this.state.initTimer.total;
        setInterval(() => {
          const total = this.state.initTimer.total - 1000;   
          this.setState({
            initTimer: {total, min, sec}
          })
        }, 1000);
    } else {
      const min = this.state.initBreak.min,
            sec = this.state.initBreak.sec,
            total = this.state.initBreak.total;
        setInterval(() => {
          const total = this.state.initBreak.total - 1000;   
          this.setState({
            initBreak: {total, min, sec}
          })
        }, 1000);
    }
  }


  getTime(time) {
    const min = Math.floor(time / 1000 / 60 % 60);
    const sec = Math.floor(time / 1000 % 60);
    const total = time;
    return {total, min, sec};
  }

  render() {
    return (
      <div className="App">
      <Time time={this.state.workTime ? this.state.initTimer : this.state.initBreak} />
      <button onClick={this.startTimer}>Click me</button>
      </div>
    );
  }
}

export default App;
