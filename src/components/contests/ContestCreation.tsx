import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const ContestCreation: React.FC = () => {
  const [contestName, setContestName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [problems, setProblems] = useState([]);
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const handleContestNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setContestName(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const problemId = event.target.value;
    setSelectedProblems((prevSelectedProblems) =>
      event.target.checked
        ? [...prevSelectedProblems, problemId]
        : prevSelectedProblems.filter((id) => id !== problemId)
    );
  };

  const validateForm = () => {
    if (selectedProblems.length === 0) {
      alert("Please select at least one problem.");
      return false;
    }
    return true;
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      if (formRef.current) {
        const formData = new FormData(formRef.current);
        const startTime = formData.get("startTime") as string;
        const endTime = formData.get("endTime") as string;
        console.log("Creating contest:", contestName);
        console.log("Start time:", startTime);
        console.log("End time:", endTime);
        console.log("Selected problems:", selectedProblems);
      }
    }
  };

  useEffect(() => {
    console.log("Fetching problems");
    axios.get("/api/problem").then((res) => {
      if (res.data) {
        setProblems(res.data.problems);
      }
    });
  }, []);

  return (
    <div>
      <h1>Create Contest</h1>
      <form ref={formRef} onSubmit={handleFormSubmit}>
        <label>
          Contest Name:
          <input
            type="text"
            value={contestName}
            onChange={handleContestNameChange}
            required
          />
        </label>
        <label>
          Start Time:
          <input
            type="datetime-local"
            name="startTime"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </label>
        <label>
          End Time:
          <input
            type="datetime-local"
            name="endTime"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </label>
        {problems.length > 0 && (
          <ul>
            {problems.map((problem: any) => (
              <li key={problem.problem_id}>
                <label>
                  <input
                    type="checkbox"
                    value={problem.problem_id}
                    onChange={handleCheckboxChange}
                  />
                  <h3>{problem.problem_title}</h3>
                  <p>{problem.problem_description}</p>
                </label>
              </li>
            ))}
          </ul>
        )}
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default ContestCreation;
