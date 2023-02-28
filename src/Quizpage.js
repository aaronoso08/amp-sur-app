import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import './PopUp.css';
import './QuizPage.css';
import './style.css';
import './QuizQuestion.css';
import ProgressBar from './ProgressBar';
import MyWebcam from './MyWebcam';
import { AmplifySignOut } from '@aws-amplify/ui-react';


const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [recording, setRecording] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [videoPlayed, setVideoPlayed] = useState(false); // add state variable
  const videoRef = useRef(null);
  const questions = [

    {
      question1: "Hi thank you for choosing Luxor Energy the most reliable solar provider in North America. This call is being recorded for quality assurance. Do we have your permission to proceed?",
      question2: "To record your response, press Video response",
      video: "https://luxorsurveyapp-storage-48413d43211922-luxordev.s3.amazonaws.com/public/questionone.mp4",
    },
    {
      question1: "Please state your full name as listed on the financing agreement",
      question2: "To record your response, press Video response",
      video: "https://luxorsurveyapp-storage-48413d43211922-luxordev.s3.amazonaws.com/public/question-1.mp4",
    },
    {
      question1: "Please state the address where your solar project will be taking place",
      question2: "To record your response, press Video response",
      video: "https://luxorsurveyapp-storage-48413d43211922-luxordev.s3.amazonaws.com/public/questiontwo.mp4",
    },
    {
      question1: "Following questions may be answered either yes or no. Luxor Energy does not guarantee a specific panel or the exact number of panels. Luxor Energy will install the exact system size or larger that was sold by your representative. Is that correct?",
      question2: "To record your response, press Video response",
      video: "https://luxorsurveyapp-storage-48413d43211922-luxordev.s3.amazonaws.com/public/questionthree.mp4",
    },
    {
      question1: "Luxor Energy will install panels on planes most suitable for your home's location. For maximum production. And the most efficient layout. While complying with any and all applicable building code regulations. Is that correct?",
      question2: "To record your response, press Video response",
      video: "https://luxorsurveyapp-storage-48413d43211922-luxordev.s3.amazonaws.com/public/questionfour.mp4",
    },
    {
      question1: "Does Luxor Energy have permission to install without anyone being home? Yes or no",
      question2: "To record your response, press Video response",
      video: "https://luxorsurveyapp-storage-48413d43211922-luxordev.s3.amazonaws.com/public/questionfive.mp4",
    },
    {
      question1: "Will the gate be open for installation?",
      question2: "To record your response, press Video response",
      video: "https://luxorsurveyapp-storage-48413d43211922-luxordev.s3.amazonaws.com/public/questionsix.mp4",
    },
    { 
      question1: "Did your sales representative promise you anything that was not written in your install agreement? Yes or no.",
      question2: "To record your response, press Video response",
      video: "https://luxorsurveyapp-storage-48413d43211922-luxordev.s3.amazonaws.com/public/questionseven.mp4",
    },
  ];

  useEffect(() => {
    const video = videoRef.current;
    video.addEventListener('ended', () => {
    video.pause();
    setVideoPlayed(true);
    });
  }, []);


  const handleNextQuestion = () => {
    if (currentQuestion + 1 === questions.length) {
      setShowModal(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setVideoPlayed(false);
    }
  };
    
  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentQuestion + 1 === questions.length) {
      setShowModal(true);
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
          <div className="background-video-container">
            <MyWebcam onRecordingComplete={handleStopRecording} />
          </div>
          <div className="stop-recording-button">
            <button className="recording-button" onClick={handleStopRecording}>
              stop recording
            </button>
          </div>
        </div>
        ) : (
        <div className="question-container">
          <video
            src={questions[currentQuestion].video}
            controls
            autoPlay={!videoPlayed} // update autoPlay attribute
            ref={videoRef}
            className="question-video"/>
          <form onSubmit={handleSubmit} className="form">
            <h2 className="question-text">{questions[currentQuestion].question1}</h2>
            <h2 className="question-text">{questions[currentQuestion].question2}</h2>
          <div className="form-container">
            <div className="left-button-container">
              <button className="left-button" onClick={handleStartRecording}>
                Video Response
              </button>
            </div>
          {currentQuestion !== questions.length - 1 && (
          <div className="right-button-container">
            <button className="right-button" type="Next" onClick={handleNextQuestion}>
              Next
            </button>
          </div>
          )}
          </div>
          <div className="progress-bar-container">
            <ProgressBar
              currentQuestion={currentQuestion} totalQuestions={questions.length}/>
          </div>
          </form>
            {currentQuestion === questions.length - 1 && (
              <div className="submit-button-container">
                <button className="submit-button" onClick={() => setShowModal(true)}>
                  Submit
                </button>
              </div>
              )}
              </div>
              )}


            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
              <Modal.Header>
                <Modal.Title>Thank you for completing the survey!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Please submit your answers to finalize the survey:</p>
                <AmplifySignOut onSignOut={() => setShowModal(false)} />
              </Modal.Body>
            </Modal>
            </div>
            
            )}

export default QuizPage;

