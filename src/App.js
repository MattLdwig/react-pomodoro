import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Time from './Components/Time'

let twentyToMilli = 10000;
let fiveToMilli = 300000;

class App extends Component {
  constructor() {
    super();
    this.state = {
      time: this.getTime(twentyToMilli),
      workTime: true,
      interval: null,
      currentPhase: 1,
      breakTimeDisplayed : this.getTime(fiveToMilli)
    }

    this.getTime = this.getTime.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.switchToNextPhase = this.switchToNextPhase.bind(this);
    this.incrementWorkSession = this.incrementWorkSession.bind(this);
    this.incrementBreakSession = this.incrementBreakSession.bind(this);
    this.decrementWorkSession = this.decrementWorkSession.bind(this);
    this.decrementBreakSession = this.decrementBreakSession.bind(this);
  }

  startTimer() {
    this.updateDisplay();
    this.setState({ interval: setInterval(this.updateDisplay, 1000) })
    console.log(fiveToMilli);
  }

  pauseTimer() {
    clearInterval(this.state.interval);
    this.setState({ interval: null })
  }

  resetTimer() {
    clearInterval(this.state.interval);
    this.setState({
      time: this.getTime(twentyToMilli),
      workTime: true,
      interval: null
    })
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

  incrementWorkSession() {
    twentyToMilli = twentyToMilli + 60000;
    this.setState({
      time: this.getTime(twentyToMilli)
    })
  }

  incrementBreakSession() {
    fiveToMilli = fiveToMilli + 60000;
    this.setState({
      breakTimeDisplayed: this.getTime(fiveToMilli)
    })
  }

  decrementWorkSession() {
    twentyToMilli = twentyToMilli - 60000;
    this.setState({
      time: this.getTime(twentyToMilli)
    })
  }

  decrementBreakSession() {
    fiveToMilli = fiveToMilli - 60000;
    this.setState({
      breakTimeDisplayed: this.getTime(fiveToMilli)
    })
  }


  render() {
    return (
      <div className="App">
        <Time time={this.state.time} session={this.state.breakTimeDisplayed} />
        <button onClick={this.startTimer}>Start</button>
        <button onClick={this.pauseTimer}>Pause</button>
        <button onClick={this.resetTimer}>Reset</button>
        <button onClick={this.incrementWorkSession}>Increment work Session</button>
        <button onClick={this.incrementBreakSession}>Increment break Session</button>
        <button onClick={this.decrementBreakSession}>Decrement break Session</button>
        <button onClick={this.decrementWorkSession}>Decrement work Session</button>
      </div>
    );
  }
}

export default App;
