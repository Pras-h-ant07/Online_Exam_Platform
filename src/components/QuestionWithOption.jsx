import React, { useEffect } from "react";
import "../App.css";
import "./QuestionWithOption.css"

function QuestionWithOption() {
  useEffect(() => {
    const preventDefaultActions = (e) => {
      // Prevent right click menu to prevent copying any question (BONUS FEATURE)
      if (e.button === 2) {
        e.preventDefault();
      }
    };

    // Attach event listeners
    document.addEventListener("contextmenu", preventDefaultActions);
    document.addEventListener("selectstart", preventDefaultActions);

    // Cleanup function to remove the event listeners
    return () => {
      document.removeEventListener("contextmenu", preventDefaultActions);
      document.removeEventListener("selectstart", preventDefaultActions);
    };
  }, []);

  return (
    // left section ----current question section :dummy data
    <div className="left-section">
      <div className="question-section">
        <div className="question">
          <h3>Question 1</h3>
          <p>What is the capital of France?</p>
        </div>

        <div className="options">
          <label>
            <input type="radio" name="q1" value="A" /> A. Berlin
          </label>
          <br />
          <label>
            <input type="radio" name="q1" value="B" /> B. Madrid
          </label>
          <br />
          <label>
            <input type="radio" name="q1" value="C" /> C. Paris
          </label>
          <br />
          <label>
            <input type="radio" name="q1" value="D" /> D. Rome
          </label>
        </div>
      </div>

      {/*question changing options  */}
      <div className="question-action-btn">
        <div>
          <button className="action-btn">Previous</button>
        </div>
        <div>
          <button className="action-btn">Mark for Review</button>
        </div>
        <div>
          <button className="action-btn">Next</button>
        </div>
      </div>
    </div>
  );
}

export default QuestionWithOption;
