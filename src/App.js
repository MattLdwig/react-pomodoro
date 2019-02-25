import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Time from './Components/Time'

const twentyToMilli = 2000;
const fiveToMilli = 3000;

class App extends Component {
  constructor() {
    super();
    this.state = {
      time: this.getTime(twentyToMilli),
      workTime: true,
      inverval: null
    }

    this.getTime = this.getTime.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.switchToNextPhase = this.switchToNextPhase.bind(this);

  }

  startTimer() {
    this.updateDisplay();
    this.setState({ interval: setInterval(this.updateDisplay, 1000) })
  }

  updateDisplay() {
    if (this.state.time.total > 0) {
      let time = this.getTime(this.state.time.total - 1000);
      this.setState({ time })
    } else {
      this.switchToNextPhase();
    }
  }

  switchToNextPhase() {
    this.state.workTime ? this.setState({ time: this.getTime(fiveToMilli), workTime: false }) : this.setState({ time: this.getTime(twentyToMilli), workTime: true })
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
      <Time time={this.state.time} />
      <button onClick={this.startTimer}>Click me</button>
      </div>
    );
  }
}

export default App;
