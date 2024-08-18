import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
interface ContestCreate {
  contest_title: string;
  contest_description: string;
  contest_start_time: string;
  contest_end_time: string;
  contest_problems: Array<number>;
}
const ContestCreation: React.FC = () => {
  const [contestName, setContestName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [problems, setProblems] = useState([]);
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const session = useSession();
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

        // Extract the time portion from the datetime string
        const startTimeOnly = new Date(startTime).toLocaleTimeString("en-GB", {
          hour12: false,
        });
        const endTimeOnly = new Date(endTime).toLocaleTimeString("en-GB", {
          hour12: false,
        });

        const contestData = {
          contest_title: contestName,
          contest_start_time: startTimeOnly,
          contest_end_time: endTimeOnly,
          contest_problems: selectedProblems.map(Number),
          user_id: session.data.user.id,
        };
        console.log(contestData);
        axios.post("/api/contests/createcontest", contestData).then((res) => {
          if (res.data) {
            alert("Contest created successfully");
            setContestName("");
            setStartTime("");
            setEndTime("");
            setSelectedProblems([]);
          }
        });
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
