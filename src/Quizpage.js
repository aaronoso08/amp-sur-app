import React, { useState } from 'react';
import Webcam from "react-webcam";
import Modal from 'react-bootstrap/Modal';
import './PopUp.css';
import './QuizPage.css';
import './style.css';
import './QuizQuestion.css';
import ProgressBar from './ProgressBar';
import Question from './images/question.mp4';
import Questiontwo from './images/questiontwo.mp4';
import Questionthree from './images/questionthree.mp4';
import Questionfour from './images/questionfour.mp4';
import Questionfive from './images/questionfive.mp4';
import Questionsix from './images/questionsix.mp4';
import Questionseven from './images/questionseven.mp4';
import Questionone from './images/questionone.mp4';

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [recording, setRecording] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const webcamRef = React.useRef(null);
  const questions = [

    {
      question: "Press Video Response to submit answer after viewing",
      video: Questionone,
    },
    {
      question: "Press Video Response to submit answer after viewing",
      video: Question,
    },
    {
        question: "Press Video Response to submit answer after viewing",
        video: Questiontwo,
    },
    {
      question: "Press Video Response to submit answer after viewing",
      video: Questionthree,
    },
    {
        question: "Press Video Response to submit answer after viewing",
            video: Questionfour,
          },
          {
              question: "Press Video Response to submit answer after viewing",
              video: Questionfive,
          },
          {
            question: "Press Video Response to submit answer after viewing",
            video: Questionsix,
          },
      {
          question: "Press Video Response to submit answer after viewing",
          video: Questionseven
        },
  ];


  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentQuestion + 1 === questions.length) {
      setShowModal(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleStartRecording = () => {
    setRecording(true);
  };

  const handleStopRecording = () => {
    setRecording(false);
  };
  return (
    <div className="quiz-page">
        {recording ? (
            <div className="recording-container">
              <div className="stop-recording-button">
                <button className="recording-button" onClick={handleStopRecording}>stop recording</button>
                <p>Answer, then stop recording."</p>
                <div class="webcam-container">
                 <Webcam audio={false} height={400} ref={webcamRef} screenshotFormat="image/jpeg" width={400} />
                </div>
              </div>
            </div>
          ) : (
            <div className="question-container">
              <video src={questions[currentQuestion].video} controls autoPlay className="question-video"/>
              <form onSubmit={handleSubmit} className="form">
                <h2 className="question-text">{questions[currentQuestion].question}</h2>
                <div className="form-container">
                  <div className="left-button-container">
                    <button className="left-button" onClick={handleStartRecording}>Video Response</button>
                  </div>
                  <div className="right-button-container">
                    <button className="right-button" type="Next">Next</button>
                  </div>
                  <div className="progress-bar-container">
                    <ProgressBar currentQuestion={currentQuestion} totalQuestions={questions.length} />
                  </div>
                </div>
              </form>
            </div>
          )}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header>
            <Modal.Title>Thank you for completing the survey!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src="https://static.wixstatic.com/media/be82eb_535dea45d44d436b863ab3f1e87963ca~mv2.png/v1/fit/w_2500,h_1330,al_c/be82eb_535dea45d44d436b863ab3f1e87963ca~mv2.png" alt="Logo" style={{width: "300px", height: "200px", display: "block", margin: "0 auto"}} />
            <p>Please submit your answers to finalize the survey:</p>
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
          </Modal.Body>
        </Modal>
    </div>
  );
};

export default QuizPage;


//fdfsfasdfasdfsdadddaasfafrgjererewreger