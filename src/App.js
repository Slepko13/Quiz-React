import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import './App.scss';
import Start from './components/Start/Start';
import Quiz from './components/Quiz/Quiz';
import Result from './components/Result/Result';
import logo from '../src/assets/img/logo.svg';

class App extends Component {

  state = {
    questions: [],
    runningQuestionIndex: 0,
    lastQuestionIndex: undefined,
    runningQuestion: undefined,
    userAnswer: undefined,
    score: 0
  }

  getQuestions = this.getQuestions.bind(this);
  nextQuestion = this.nextQuestion.bind(this);
  resetState = this.resetState.bind(this);
  handleAnswer = this.handleAnswer.bind(this);
  getResult = this.getResult.bind(this);
  getQuestionsAxios = this.getQuestionsAxios.bind(this);

  //!get questions with import from local json file
  async getQuestions(data) {
    await this.getQuestionsAxios();
    let q = Object.values(data);
    this.setState({
      questions: q,
      lastQuestionIndex: q.length - 1,
      runningQuestion: q[0]
    })
  }
  //!get questions with axios from local json file
  async getQuestionsAxios() {
    try {
      const response = await axios.get('./questions.json');
      const data = Object.values(response.data);
      this.setState({
        questions: data,
        lastQuestionIndex: data.length - 1,
        runningQuestion: data[0]
      })
    } catch (error) {
      console.log(error)
    }
  }
  nextQuestion(e) {
    e.preventDefault();
    if (this.state.userAnswer === this.state.runningQuestion.correct_answers[0]) {

      this.setState((prevState) => ({
        score: prevState.score++
      }));
    }
    this.setState((state) => ({
      runningQuestion: state.questions[state.runningQuestionIndex],
      runningQuestionIndex: state.runningQuestionIndex++,
      userAnswer: undefined
    }));
  }

  getResult() {
    if (this.state.userAnswer === this.state.runningQuestion.correct_answers[0]) {
      this.setState((prevState) => ({
        score: prevState.score + 1
      }));
    }
  }
  resetState() {
    this.setState({
      questions: [],
      runningQuestionIndex: 0,
      lastQuestionIndex: undefined,
      runningQuestion: undefined,
      userAnswer: undefined,
      score: 0
    })
  }

  handleAnswer(e) {
    this.setState({
      userAnswer: e.target.value
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light ">
              <a className="navbar-brand " href="http://www.google.com" target="blank">
                <img src={logo} alt="logo" width="150" />
              </a>
              <div className="navbar-brand ">Логотип</div>
              <div className=" navbar-collapse  justify-content-end">
                <ul className="navbar-nav  ">
                  <li className="navbar-item">
                    <Link to="/" className="nav-link" onClick={this.resetState}>Розпочати знову</Link>
                  </li>
                </ul>
              </div>
            </nav>
            <Route path="/" exact >
              <Start
                getQuestions={this.getQuestions}//!get questions with import from local json file
                getQuestionsAxios={this.getQuestionsAxios}//!get questions with axios from local json file
              />
            </Route>
            <Route path="/quiz">
              {this.state.questions.length ?
                <Quiz
                  runningQuestion={this.state.runningQuestion}
                  runningQuestionIndex={this.state.runningQuestionIndex}
                  lastQuestionIndex={this.state.lastQuestionIndex}
                  nextQuestion={this.nextQuestion}
                  handleAnswer={this.handleAnswer}
                  userAnswer={this.state.userAnswer}
                  getResult={this.getResult}
                /> :
                <div className="loading__data">Розпочни знову</div>
              }
            </Route>
            <Route path="/result">
              <Result
                score={this.state.score}
                total={this.state.questions.length}
              />
            </Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
