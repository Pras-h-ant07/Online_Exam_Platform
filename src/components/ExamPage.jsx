import React, { useState, useEffect } from "react";
import "../App.css";
import "./ExamPage.css";
import QuestionWithOption from "./QuestionWithOption";
import QuestionsIndicator from "./QuestionsIndicator";
import { useNavigate } from "react-router-dom";

function ExamPage({ candidateName, rollNumber, setExamStatus }) {
  const [time, setTime] = useState(3600); //exam clock
  const [violationNotification, setViolationNotification] = useState(false);
  const [violationCount, setViolationCount] = useState(0);
  const [reverseTimer, setReverseTimer] = useState(10); //warning timer
  const navigate = useNavigate();

  // Convert seconds to HH:MM:SS format
  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {

    //function for fullscreen mode in different browsers
    const enterFullscreen = () => {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen(); //Modern browser
      } 
      else if (element.mozRequestFullScreen) {  
        element.mozRequestFullScreen(); // Firefox
      } 
      else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(); // Chrome, Safari and Opera
      } 
      else if (element.msRequestFullscreen) {
        element.msRequestFullscreen(); // IE/Edge
      }
    };

    //function to check number of violation ---------------------
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        if (violationCount >= 1) { 
          setViolationCount(0); //reset violation count
          clearAllTimers(); // Clear the present timer
          setExamStatus("TERMINATE"); //exam status 
          navigate("/finalReport");  // navigate to final report
        } else {
          setViolationNotification(true);
          setViolationCount((prevCount) => prevCount + 1);
          startReverseTimer();
        }
      }
    };

    //violation timer  -----------------
    const startReverseTimer = () => {
      setReverseTimer(10);
      const timer = setInterval(() => {
        setReverseTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(timer); // Clear the present timer
            setViolationCount(0); // Reset violation count to 0
            setExamStatus("TERMINATE");//exam status
            navigate("/finalReport"); // Navigate to final report
            return 0; 
          }
          return prevTimer - 1; 
        });
      }, 1000);
      setReverseTimer(timer);
    };

    //function to handle display switch -----------------------------
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && violationCount <= 1) {
        setViolationCount((prev) => prev + 1);
      } else if (document.visibilityState === "hidden" && violationCount > 1) {
        clearAllTimers(); // Clear the present timer
        setViolationCount(0); // Reset violation count to 0
        setExamStatus("TERMINATE");//exam status
        navigate("/finalReport"); // Navigate to final report
      }
    };

    //function to return back to fullscreen mode within the time
    const handleDoubleClick = () => {
      if (!document.fullscreenElement) {
        enterFullscreen();
        clearInterval(reverseTimer); // Clear the present timer
        setReverseTimer(10); // reset timer
        setViolationNotification(false); //hiding the violation warning
      }
    };

    //exam clock hh:mm:ss
    const countdown = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(countdown); // Stop the timer when it reaches 0
          navigate("/finalReport");
          return 0; // Ensure time does not go below 0
        }
        return prevTime - 1;
      });
    }, 1000);

    const clearAllTimers = () => {
      clearInterval(reverseTimer);
      clearInterval(countdown);
    };

    // Call enterFullscreen when the component mounts
    enterFullscreen();

    // fullscreen and visibility change events detection
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // call to go back to fullscreen mode
    document.addEventListener("dblclick", handleDoubleClick);

    return () => {
      clearAllTimers();
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("dblclick", handleDoubleClick);
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    };
  }, [violationCount]);

  return (
    <div className="exam-page">

      {/* Violation Notification */}
      {violationNotification && (
        <div className="violation-notification">
          <p>
            You must remain on this screen and the screen should be in
            fullscreen mode!
          </p>
          <p>Time remaining to re-enter fullscreen: {reverseTimer} seconds</p>
        </div>
      )}

      {/* Top Menu bar */}
      <div className="menu">
        <h2>Online Exam Platform</h2>
        <div className="menu-right">
          <div className="candidate-info">
            <p>Name: {candidateName}</p>
            <p>Roll Number: {rollNumber}</p>
          </div>
          <div className="vertical-line"></div>
          <div className="timer">
            <p>{formatTime(time)}</p>
          </div>
        </div>
      </div>

      <div className="sections">

        {/* Left section for the question and options */}
        <QuestionWithOption />

        <div class="vertical-line"></div>

        {/* Right section for question bubbles */}
        <QuestionsIndicator />
      </div>
    </div>
  );
}

export default ExamPage;
