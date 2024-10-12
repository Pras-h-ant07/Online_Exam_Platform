import React, { useEffect } from "react";
import "./FinalReport.css";

function FinalReport({examStatus,setIsAuthenticated}) {

  useEffect(() => {
    //preventing back to exam option
    setIsAuthenticated(false);
  },[])

  return (
    <div className="exam-container">
      <div className="start-exam-container">
        <h2>Candidate Exam Basic Report</h2>
        
        <div className="report-section">
          {/* exam status completed/terminate (BONUS FEATURE) */}
          <div className="report-data" id={examStatus==='COMPLETED'?"exam-status1":"exam-status2"}>
            <p>Exam Status:</p>
            <p>
              <strong>{examStatus}</strong>
            </p>
          </div>

          <div className="report-data">
            <p>Questions Attempted:</p>
            <p>
              <strong>40</strong>
            </p>
          </div>

          <div className="report-data">
            <p>Questions Marked for Review:</p>
            <p>
              <strong>20</strong>
            </p>
          </div>
          
          <div className="report-data">
            <p>Questions Not Attempted:</p>
            <p>
              <strong>10</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FinalReport;
