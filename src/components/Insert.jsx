import { useEffect, useState } from "react";
import axios from "axios";

function Insert() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [students, setStudents] = useState([]);
    const [editId, setEditId] = useState(null);

    // Insert and Update
    async function saveData(e) {
        e.preventDefault();
        if (!name || !age) {
            alert("Please fill in all fields");
            return;
        }

        try {
            let response;
            if (editId) {
                response = await axios.put(
                    `http://localhost:5000/students/${editId}`,
                    { name, age }
                );
                setEditId(null);
            } else {
                response = await axios.post(
                    "http://localhost:5000/students",
                    { name, age }
                );
            }

            alert(response.data.message);
            clearForm();
            getStudents();
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }
    }

    function clearForm() {
        setName("");
        setAge("");
        setEditId(null);
    }

    function editStudent(student) {
        setName(student.name);
        setAge(student.age);
        setEditId(student._id);
    }

    async function getStudents() {
        try {
            const response = await axios.get("http://localhost:5000/students");
            setStudents(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getStudents();
    }, []);

    async function deleteStudent(id) {
        if (!window.confirm("Are you sure you want to delete this record?")) return;

        try {
            const response = await axios.delete(`http://localhost:5000/students/${id}`);
            alert(response.data.message);
            getStudents();
        } catch (error) {
            console.log(error);
            alert("Delete Failed!");
        }
    }

    return (
        <div className="min-vh-100 bg-light py-5">
            <div className="container-xl">
                
                {/* APPLICATION HEADER */}
                <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-b text-dark">
                    <div>
                        <h1 className="h3 mb-1 fw-bold text-dark">🎓 Student Management Portal</h1>
                        <p className="text-muted small mb-0">Create, view, update, and manage student records cleanly.</p>
                    </div>
                </div>

                {/* TWO-COLUMN SPLIT LAYOUT */}
                <div className="row g-4">
                    
                    {/* LEFT COLUMN: FIXED FORM PANEL */}
                    <div className="col-lg-4">
                        <div className="card shadow-sm border-0 sticky-top" style={{ top: "24px", zIndex: 10 }}>
                            <div className={`card-header py-3 ${editId ? "bg-warning text-dark" : "bg-dark text-white"}`}>
                                <h5 className="card-title mb-0 fw-bold">
                                    {editId ? "📝 Update Records" : "✨ Register Student"}
                                </h5>
                            </div>
                            <div className="card-body p-4">
                                <form onSubmit={saveData}>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold text-secondary text-uppercase tracking-wider">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="form-value form-control form-control-lg bg-light border-0"
                                            style={{ fontSize: "0.95rem" }}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label small fw-bold text-secondary text-uppercase tracking-wider">Age (Years)</label>
                                        <input
                                            type="number"
                                            placeholder="20"
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                            className="form-control form-control-lg bg-light border-0"
                                            style={{ fontSize: "0.95rem" }}
                                        />
                                    </div>

                                    <div className="d-grid gap-2">
                                        <button 
                                            type="submit" 
                                            className={`btn btn-lg fw-semibold ${editId ? "btn-warning text-dark" : "btn-primary"}`}
                                            style={{ fontSize: "0.9rem" }}
                                        >
                                            {editId ? "Apply Modifications" : "Save Record"}
                                        </button>
                                        
                                        {editId && (
                                            <button 
                                                type="button" 
                                                onClick={clearForm} 
                                                className="btn btn-sm btn-link text-muted text-decoration-none mt-1"
                                            >
                                                Dismiss Changes
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: SCROLLABLE DATA TABLE */}
                    <div className="col-lg-8">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
                                <h5 className="mb-0 text-dark fw-bold">Database Records</h5>
                                <span className="badge bg-light text-dark border fw-medium px-3 py-2 rounded-pill">
                                    {students.length} Total Enrolled
                                </span>
                            </div>
                            
                            <div className="table-responsive" style={{ maxHeight: "70vh" }}>
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="table-light sticky-top" style={{ zIndex: 1 }}>
                                        <tr>
                                            <th className="px-4 py-3 text-secondary text-uppercase font-size-sm tracking-wider" style={{ fontSize: "0.75rem" }}>Student Details</th>
                                            <th className="py-3 text-secondary text-uppercase font-size-sm tracking-wider" style={{ fontSize: "0.75rem" }}>Age</th>
                                            <th className="px-4 py-3 text-end text-secondary text-uppercase font-size-sm tracking-wider" style={{ fontSize: "0.75rem" }}>Management</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-top-0">
                                        {students.length === 0 ? (
                                            <tr>
                                                <td colSpan="3" className="text-center py-5 text-muted">
                                                    <div className="fs-2 mb-2">📁</div>
                                                    <p className="mb-0 small fw-medium">No students registered yet.</p>
                                                    <span className="text-xs text-secondary">Fill out the left panel to add data.</span>
                                                </td>
                                            </tr>
                                        ) : (
                                            students.map((student) => (
                                                <tr key={student._id}>
                                                    <td className="px-4 py-3">
                                                        <div className="d-flex align-items-center">
                                                            <div className="avatar bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center me-3 fw-bold shadow-sm" style={{ width: "38px", height: "38px", minWidth: "38px", backgroundColor: "#e0e7ff", color: "#4f46e5" }}>
                                                                {student.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div>
                                                                <h6 className="mb-0 fw-semibold text-dark">{student.name}</h6>
                                                                <small className="text-muted text-xs">ID: {student._id.slice(-6)}</small>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 fw-medium text-secondary">
                                                        <span className="badge bg-light text-secondary border px-2 py-1.5">{student.age} yrs old</span>
                                                    </td>
                                                    <td className="px-4 py-3 text-end">
                                                        <div className="d-inline-flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => editStudent(student)}
                                                                className="btn btn-sm btn-light border text-warning-hover px-3 font-weight-medium"
                                                                style={{ fontSize: "0.8rem" }}
                                                            >
                                                                ✏️ Edit
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => deleteStudent(student._id)}
                                                                className="btn btn-sm btn-light border text-danger px-3 font-weight-medium hover-danger"
                                                                style={{ fontSize: "0.8rem" }}
                                                            >
                                                                🗑️ Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Insert;