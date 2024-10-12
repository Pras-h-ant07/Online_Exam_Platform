import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css"
import "./DetailsAndInstructionPage.css";
import "./ConfirmationMessage.css";

function DetailsAndInstructionPage({
  setCandidateName,
  setRollNumber,
  setIsAuthenticated,
  name,
  rollNumber,
}) {

  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleStartExam = () => {
    if (name && rollNumber) {
      if (/^[A-Za-z\s]*$/.test(name)) {
        setModalOpen(true);
        setIsAuthenticated(true);
      }else{
        alert("Name can not have numbers or symbols");
      }
    } else {
      alert("Please enter the details to procced");
    }
  };

  //Confirmation Message Options
  const handleConfirm = () => {
    setModalOpen(false);
    navigate("/examPage");
  };

  const handleCancel = () => {
    setModalOpen(false);
    navigate("/");
  };

  return (
    <div className="exam-container">
      {/* Confirmation message (BONUS FEATURE) */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Start Exam</h2>
            <p>
              Are you sure you want to start the exam? Once the exam starts, you
              cannot pause or go back.
            </p>
            <button id="confirmBtn" onClick={handleConfirm}>
              Yes, Start Exam
            </button>
            <button id="cancelBtn" onClick={handleCancel}>
              No, Cancel
            </button>
          </div>
        </div>
      )}
      {/* candidate details form (BONUS FEATURE)*/}
      <div className="start-exam-container">
        <h2>Candidate Details</h2>

        <div className="input-section">
          <div className="input-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div className="input-group">
            <label htmlFor="rollNumber">Roll Number:</label>
            <input
              type="number"
              id="rollNumber"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              placeholder="Enter your roll number"
            />
          </div>

          <button className="start-exam-btn" onClick={handleStartExam}>
            Start Exam
          </button>
        </div>

        <div className="horizontal-line"></div>
        {/* exam instructions */}
        <div className="instructions">
          <h3>Instructions to Attempt the Exam:</h3>
          <ul>
            <li>Read all questions carefully.</li>
            <li>Each question has four options, choose the correct one.</li>
            <li>Once you submit the exam, you cannot change your answers.</li>
            <li>Manage your time wisely, there is a timer for the exam.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DetailsAndInstructionPage;
