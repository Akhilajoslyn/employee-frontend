import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [showTable, setShowTable] = useState(false);

  const API = "http://localhost:8081/employees";

  // Fetch employees
  const fetchEmployees = async () => {
    const res = await axios.get(API);
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Add or Update
  const addOrUpdateEmployee = async () => {
    if (editingId) {
      await axios.put(`${API}/${editingId}`, { name, email, role });
      setEditingId(null);
    } else {
      await axios.post(API, { name, email, role });
    }

    setName("");
    setEmail("");
    setRole("");
    fetchEmployees();
  };

  // Delete
  const deleteEmployee = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchEmployees();
  };

  // Edit
  const editEmployee = (emp) => {
    setName(emp.name);
    setEmail(emp.email);
    setRole(emp.role);
    setEditingId(emp.id);
  };

  return (
    <div className="container">
      <h1>Employee Management System</h1>

      {/* FORM */}
      <div className="form">
        <input
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          value={role}
          placeholder="Role"
          onChange={(e) => setRole(e.target.value)}
        />

        <button onClick={addOrUpdateEmployee}>
          {editingId ? "Update" : "Add"}
        </button>
      </div>

      {/* VIEW BUTTON */}
      <button
        style={{ marginTop: "20px" }}
        onClick={() => setShowTable(!showTable)}
      >
        {showTable ? "Hide Employees" : "View All Employees"}
      </button>

      {/* TABLE */}
      {showTable && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
                <td>
                  <button onClick={() => editEmployee(emp)}>Edit</button>
                  <button onClick={() => deleteEmployee(emp.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;