import "./App.css";
import { useState } from "react";
import StatCard from "./components/StatCard";
import Navbar from "./components/Navbar";

function App() {
  const [task, setTask] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "app dark" : "app"}>

      <Navbar />

      <div className="theme-button">
        <button
          className="profile-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
        
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
       
      <main className="dashboard">

        <section className="welcome">
          <h1>Welcome Back!</h1>
          <p>Here is your academic overview.</p>
        </section>

        <section className="cards">
          <StatCard title="Courses" value="6" />
          <StatCard title="Assignments" value="12" />
          <StatCard title="Attendance" value="92%" />
          <StatCard title="CGPA" value="8.7" />
        </section>

        <section className="courses">
          <h2>My Courses</h2>

          <ul>
            <li>Data Science</li>
            <li>Database Management Systems</li>
            <li>Computer Networks</li>
            <li>Operating Systems</li>
          </ul>
        </section>

        <section className="tasks">
          <h2>Add a Task</h2>

          <input
            type="text"
            placeholder="Enter your task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button onClick={() => alert(task)}>
            Add Task
          </button>
        </section>

      </main>

    </div>
  );
}

export default App;