import React, { useState } from 'react';
import './App.css';
import QuizPage from './Quizpage';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);


const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
 
  return (
    <div className="App">
      {currentPage === 'home' && (
        <div>
          <div className="typerwriter-container">
            <div className="typewriter">
              <h1>DIGITAL SURVEY</h1>
              <button className="start-quiz-button" onClick={() => setCurrentPage('quiz')}>
                BEGIN SURVEY
              </button>
            </div>
          </div>
        </div>
      )}
      {currentPage === 'quiz' && <QuizPage/>}
    </div>
  );
};

export default withAuthenticator(App);
