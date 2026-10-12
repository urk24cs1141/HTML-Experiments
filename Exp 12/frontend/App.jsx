
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:5000/students";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    regNo: "",
    name: "",
    department: "",
    email: "",
    cgpa: ""
  });
  const [editId, setEditId] = useState(null);

  const loadStudents = async () => {
    try {
      const response = await axios.get(API);
      setStudents(response.data);
    } catch {
      alert("Cannot connect to backend. Check your server.");
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = { ...form, cgpa: Number(form.cgpa) };

      if (editId) {
        await axios.put(`${API}/${editId}`, data);
        alert("Student updated successfully");
      } else {
        await axios.post(API, data);
        alert("Student added successfully");
      }

      setForm({
        regNo: "",
        name: "",
        department: "",
        email: "",
        cgpa: ""
      });
      setEditId(null);
      loadStudents();
    } catch (error) {
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (student) => {
    setForm({
      regNo: student.regNo,
      name: student.name,
      department: student.department,
      email: student.email || "",
      cgpa: student.cgpa ?? ""
    });
    setEditId(student._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await axios.delete(`${API}/${id}`);
      alert("Student deleted successfully");
      loadStudents();
    } catch {
      alert("Could not delete student");
    }
  };

  return (
    <div className="container">
      <h1>Student Management System</h1>

      <form onSubmit={handleSubmit}>
        <input name="regNo" placeholder="Register Number" value={form.regNo} onChange={handleChange} required />
        <input name="name" placeholder="Student Name" value={form.name} onChange={handleChange} required />
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <input name="cgpa" type="number" min="0" max="10" step="0.01" placeholder="CGPA" value={form.cgpa} onChange={handleChange} required />
        <button type="submit">{editId ? "Update Student" : "Add Student"}</button>
        {editId && (
          <button type="button" onClick={() => {
            setEditId(null);
            setForm({ regNo: "", name: "", department: "", email: "", cgpa: "" });
          }}>
            Cancel
          </button>
        )}
      </form>

      <h2>Student Records</h2>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Register No.</th>
              <th>Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>CGPA</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.regNo}</td>
                <td>{student.name}</td>
                <td>{student.department}</td>
                <td>{student.email}</td>
                <td>{student.cgpa}</td>
                <td>
                  <button onClick={() => handleEdit(student)}>Edit</button>
                  <button onClick={() => handleDelete(student._id)}>Delete</button>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="6">No student records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
