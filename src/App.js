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
      breakTimeDisplayed : this.getTime(fiveToMilli),
      isOn: false
    }

    this.getTime = this.getTime.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.switchToNextPhase = this.switchToNextPhase.bind(this);
    this.incrementWorkSession = this.incrementWorkSession.bind(this);
    this.incrementBreakSession = this.incrementBreakSession.bind(this);
    this.decrementWorkSession = this.decrementWorkSession.bind(this);
    this.decrementBreakSession = this.decrementBreakSession.bind(this);
  }

  startTimer() {
    if(!this.state.isOn) {
      this.updateDisplay();
      this.setState({ 
        interval: setInterval(this.updateDisplay, 1000),
        isOn: true
       })
    } else {
      clearInterval(this.state.interval);
      this.setState({ interval: null, isOn: false })
    }
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
    const min = Math.floor(time / 1000 / 60 % 60) < 10 ? '0' + Math.floor(time / 1000 / 60 % 60) : Math.floor(time / 1000 / 60 % 60);
    const sec = Math.floor(time / 1000 % 60) < 10 ? '0' + Math.floor(time / 1000 % 60) : Math.floor(time / 1000 % 60);
    const total = time;
    return {total, min, sec};
  }

  incrementWorkSession() {
    if (twentyToMilli < 3600000) { twentyToMilli = twentyToMilli + 60000 }
    this.setState({
      time: this.getTime(twentyToMilli)
    })
  }

  incrementBreakSession() {
    if (fiveToMilli < 3600000) { fiveToMilli = fiveToMilli + 60000 }
    this.setState({
      breakTimeDisplayed: this.getTime(fiveToMilli)
    })
  }

  decrementWorkSession() {
    if (twentyToMilli > 60000) { twentyToMilli = twentyToMilli - 60000 }
    this.setState({
      time: this.getTime(twentyToMilli)
    })
  }

  decrementBreakSession() {
    if (fiveToMilli > 60000) { fiveToMilli = fiveToMilli - 60000 }
    this.setState({
      breakTimeDisplayed: this.getTime(fiveToMilli)
    })
  }


  render() {
    return (
      <div className="App">
        <Time time={this.state.time} break={this.state.breakTimeDisplayed} />
        <div className="controls">
          <button onClick={this.startTimer} id="start_stop">Start</button>
          <button onClick={this.resetTimer} id="reset">Reset</button>
          <button onClick={this.incrementWorkSession} id="session-increment">Increment work Session</button>
          <button onClick={this.incrementBreakSession} id="break-increment">Increment break Session</button>
          <button onClick={this.decrementBreakSession} id="break-decrement">Decrement break Session</button>
          <button onClick={this.decrementWorkSession} id="session-decrement">Decrement work Session</button>
        </div>
      </div>
    );
  }
}

export default App;
