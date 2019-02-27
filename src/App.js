import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faRedo, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'

import './App.css';

import Time from './Components/Time'
import Infos from './Components/Infos'
import Sound from './sound.wav'

let twentyToMilli = 1500000;
let fiveToMilli = 300000;

class App extends Component {
  constructor() {
    super();
    this.state = {
      time: this.getTime(twentyToMilli),
      workTime: false,
      interval: null,
      breakTimeDisplayed : this.getTimeDisplayed(fiveToMilli),
      workTimeDisplayed: this.getTimeDisplayed(twentyToMilli),
      isOn: false
    }

    this.getTime = this.getTime.bind(this);
    this.getTimeDisplayed = this.getTimeDisplayed.bind(this);
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
      this.setState({ 
        interval: setInterval(this.updateDisplay, 1000),
        isOn: true,
        workTime: true
       })
    } else {
      clearInterval(this.state.interval);
      this.setState({ interval: null, isOn: false })
    }
  }

  resetTimer() {
    clearInterval(this.state.interval);
    twentyToMilli = 1500000;
    fiveToMilli = 300000;
    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
    this.setState({
      time: this.getTime(twentyToMilli),
      breakTimeDisplayed : this.getTimeDisplayed(fiveToMilli),
      workTimeDisplayed: this.getTimeDisplayed(twentyToMilli),
      workTime: false,
      interval: null,
      isOn: false
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
    const audio = document.getElementById('beep');
    audio.currentTime = 0;
    audio.play().catch(err => {console.log(err);});
  }

  getTime(time) {
    let min = Math.floor(time / 1000 / 60 % 60) < 10 ? '0' + Math.floor(time / 1000 / 60 % 60) : Math.floor(time / 1000 / 60 % 60) ;
    let sec = Math.floor(time / 1000 % 60) < 10 ? '0' + Math.floor(time / 1000 % 60) : Math.floor(time / 1000 % 60);
    let total = time;
    if (time === 3600000) {min = 60; sec = 0;} 
    return {total, min, sec};
  }

  getTimeDisplayed(time) {
    let min = Math.floor(time / 1000 / 60 % 60);
    if (time === 3600000) {min = 60;} 
    return {min};
  }

  incrementWorkSession() {
    if (twentyToMilli < 3600000) { twentyToMilli = twentyToMilli + 60000 }
    this.setState({
      time: this.getTime(twentyToMilli),
      workTimeDisplayed: this.getTimeDisplayed(twentyToMilli)
    })
  }

  incrementBreakSession() {
    if (fiveToMilli < 3600000) { fiveToMilli = fiveToMilli + 60000 }
    this.setState({
      breakTimeDisplayed: this.getTimeDisplayed(fiveToMilli)
    })
  }

  decrementWorkSession() {
    if (twentyToMilli > 60000) { twentyToMilli = twentyToMilli - 60000 }
    this.setState({
      time: this.getTime(twentyToMilli),
      workTimeDisplayed: this.getTimeDisplayed(twentyToMilli)
    })
  }

  decrementBreakSession() {
    if (fiveToMilli > 60000) { fiveToMilli = fiveToMilli - 60000 }
    this.setState({
      breakTimeDisplayed: this.getTimeDisplayed(fiveToMilli)
    })
  }


  render() {
    return (
      <div className="App">
        <Time time={this.state.time} />
        <div className="controls">
          <div className="controls--core">
            <button onClick={this.startTimer} id="start_stop"><FontAwesomeIcon icon={faPlay} /></button>
            <button onClick={this.resetTimer} id="reset"><FontAwesomeIcon icon={faRedo} /></button>
          </div>
          <div className="controls--custom">
            <button onClick={this.incrementWorkSession} id="session-increment"><FontAwesomeIcon icon={faAngleUp} /> Work Session</button>
            <button onClick={this.decrementWorkSession} id="session-decrement"><FontAwesomeIcon icon={faAngleDown} /> Work Session</button>
            <button onClick={this.incrementBreakSession} id="break-increment"><FontAwesomeIcon icon={faAngleUp} /> Break Session</button>
            <button onClick={this.decrementBreakSession} id="break-decrement"><FontAwesomeIcon icon={faAngleDown} /> Break Session</button>
          </div>
          <Infos           
            break={this.state.breakTimeDisplayed} 
            session={this.state.workTimeDisplayed}
            sessionInitialized={this.state.workTime} />
          <audio id="beep" src={Sound}></audio>
        </div>
      </div>
    );
  }
}

export default App;
