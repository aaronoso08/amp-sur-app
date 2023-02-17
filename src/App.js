import React, { Component } from 'react';
import './App.css';
// import { Amplify } from 'aws-amplify';
import QuizPage from './Quizpage';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

class App extends Component {
  state = { currentPage: 'home' };

  render() {
    return (
      <div className="App">
          {this.state.currentPage === 'home' && (
            <div>
            <div className="typerwriter-container">
              <div className="typewriter">
                <h1>DIGITAL SURVEY</h1>
              <button className="start-quiz-button" onClick={() => this.setState({ currentPage: 'quiz' })}>BEGIN SURVEY</button>
            </div>
            </div>
          </div>
          )}
          {this.state.currentPage === 'quiz' && <QuizPage />}
          <AmplifySignOut/>
        </div>
   
    );
  }
}

export default withAuthenticator(App);
//adskfhal;kasdlkjfa;