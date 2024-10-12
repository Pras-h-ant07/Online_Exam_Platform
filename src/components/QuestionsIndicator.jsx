import React from "react";
import "../App.css";
import "./QuestionsIndicator.css"
import { useNavigate } from "react-router-dom";

function QuestionsIndicator() {
  const navigate = useNavigate();

  const handleSubmitExam = () => {
    navigate("/finalReport");
  };

  return (
    <div className="right-section">
      {/* color indicators*/}
      <div class="indicator-container">
        <div class="indicator">
          <div class="bubble not-attempted"></div>
          <p>- Question Not Attempted</p>
        </div>
        <div class="indicator">
          <div class="bubble attempted-answered"></div>
          <p>- Question Answered</p>
        </div>
        <div class="indicator">
          <div class="bubble attempted-not-answered"></div>
          <p>- Question Not Answered</p>
        </div>
        <div class="indicator">
          <div class="bubble marked-for-review"></div>
          <p>- Question Marked for Review</p>
        </div>
      </div>

      <div className="horizontal-line"></div>

      {/* questions bubbles */}
      <div className="question-bubbles">
        {Array.from({ length: 50 }, (_, index) => (
          <div className="bubble" key={index}>
            {index + 1}
          </div>
        ))}
      </div>

      <div className="horizontal-line"></div>

        {/* manual Submit Exam btn (BONUS)*/}
      <div class="button-section">
        <button class="submit-button" onClick={handleSubmitExam}>
          Submit Exam
        </button>
      </div>
    </div>
  );
}

export default QuestionsIndicator;
