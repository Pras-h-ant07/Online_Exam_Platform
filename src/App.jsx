import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailsAndInstructionPage from "./components/DetailsAndInstructionPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ExamPage from "./components/examPage";
import FinalReport from "./components/FinalReport";

function App() {
  const [candidateName, setCandidateName] = useState("");
  const [rollNumber, setRollNumber] = useState();
  const [examStatus, setExamStatus] = useState("COMPLETED");
  const [isAuthenticated, setIsAuthenticated] = useState(false); //authentication for protectedRoute

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <DetailsAndInstructionPage
                setCandidateName={setCandidateName}
                setRollNumber={setRollNumber}
                setIsAuthenticated={setIsAuthenticated}
                name={candidateName}
                rollNumber={rollNumber}
              />
            }
          />

          {/* ProtectedRoute */}
          <Route
            path="/examPage"
            element={
              <ProtectedRoute
                element={
                  <ExamPage
                    candidateName={candidateName}
                    rollNumber={rollNumber}
                    setExamStatus={setExamStatus}
                  />
                }
                isAuthenticated={isAuthenticated}
              />
            }
          />

          <Route
            path="/finalReport"
            element={
              <FinalReport
                examStatus={examStatus}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
