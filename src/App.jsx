
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4 shadow">
      <Link className="navbar-brand fw-bold" to="/">
        Employee Dashboard
      </Link>

      <div className="ms-auto d-flex gap-3">
        <Link
          className={`nav-link text-white ${
            location.pathname === "/" ? "fw-bold" : ""
          }`}
          to="/"
        >
          Home
        </Link>

        <Link
          className={`nav-link text-white ${
            location.pathname === "/employee-form" ? "fw-bold" : ""
          }`}
          to="/employee-form"
        >
          Employee Form
        </Link>
      </div>
    </nav>
  );
}

function Home() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load employees.");
        }
        return response.json();
      })
      .then((data) => {
        setEmployees(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load employees. Please check your internet connection.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-2">Employee Dashboard</h2>
      <p className="text-secondary mb-4">
        View employee details below.
      </p>

      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-3">
            <h6 className="text-secondary">Total Employees</h6>
            <h2 className="text-primary">{employees.length}</h2>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-header bg-white py-3">
          <h5 className="mb-0">Employee List</h5>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr>
                  <td colSpan="3" className="text-center py-4">
                    Loading employees...
                  </td>
                </tr>
              )}

              {error && (
                <tr>
                  <td colSpan="3" className="text-danger text-center py-4">
                    {error}
                  </td>
                </tr>
              )}

              {!loading &&
                !error &&
                employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function EmployeeForm() {
  const [form, setForm] = useState({
    name: "",
    designation: "",
    location: "",
    salary: "",
  });

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    alert("Employee form submitted successfully!");

    setForm({
      name: "",
      designation: "",
      location: "",
      salary: "",
    });
  }

  return (
    <div className="container py-5">
      <div className="card border-0 shadow-sm mx-auto" style={{ maxWidth: "650px" }}>
        <div className="card-header bg-primary text-white py-3">
          <h4 className="mb-0">Add Employee</h4>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Enter employee name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Designation</label>
              <input
                className="form-control"
                type="text"
                name="designation"
                placeholder="Enter designation"
                value={form.designation}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                className="form-control"
                type="text"
                name="location"
                placeholder="Enter location"
                value={form.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Salary</label>
              <input
                className="form-control"
                type="number"
                name="salary"
                placeholder="Enter salary"
                min="0"
                value={form.salary}
                onChange={handleChange}
                required
              />
            </div>

            <button className="btn btn-primary w-100" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-vh-100 bg-light">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee-form" element={<EmployeeForm />} />
        </Routes>

        <footer className="text-center text-secondary py-4">
          Employee Dashboard Project
        </footer>
      </div>
    </BrowserRouter>
  );
}

