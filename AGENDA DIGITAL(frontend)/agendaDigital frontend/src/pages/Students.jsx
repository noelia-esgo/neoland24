import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { FaUserPlus, FaTrash, FaEdit } from "react-icons/fa";
import "../styles/Students.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editingStudentId, setEditingStudentId] = useState(null);
  const navigate = useNavigate();

  // ✅ Cargar estudiantes desde la API al inicio
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get("/students");
        console.log("✅ Lista de estudiantes cargada:", response.data);
        setStudents(response.data);
      } catch (error) {
        console.error("❌ Error al obtener los estudiantes:", error);
      }
    };
    fetchStudents();
  }, []);

  // ✅ Agrupar estudiantes por edad
  const groupedStudents = {
    Gateadores: students.filter(student => student.age === 0),
    Andarines: students.filter(student => student.age === 1),
    Saltarines: students.filter(student => student.age === 2 || student.age === 3),
  };

  // ✅ Guardar o editar estudiante
  const handleSaveStudent = async (e) => {
    e.preventDefault();

    if (!name || age === "" || age === null || age === undefined) {
      return alert("⚠ Completa todos los campos correctamente.");
    }

    try {
      const studentData = { name, age: Number(age) };

      if (editingStudentId) {
        // Editar estudiante
        const response = await api.put(`/students/${editingStudentId}`, studentData);
        setStudents(prevStudents =>
          prevStudents.map(student =>
            student._id === editingStudentId ? response.data : student
          )
        );
      } else {
        // Agregar nuevo estudiante
        const response = await api.post("/students", studentData);
        setStudents(prevStudents => [...prevStudents, response.data.student]);
      }

      setShowModal(false);
      setName("");
      setAge("");
      setEditingStudentId(null);
    } catch (error) {
      console.error("❌ Error al guardar el estudiante:", error);
      alert(error.response?.data?.message || "Hubo un error al guardar el alumno.");
    }
  };

  // ✅ Editar estudiante
  const handleEditStudent = (student) => {
    setEditingStudentId(student._id);
    setName(student.name);
    setAge(student.age);
    setShowModal(true);
  };

  // ✅ Eliminar estudiante
  const handleDeleteStudent = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este alumno?")) return;

    try {
      await api.delete(`/students/${id}`);
      setStudents(prevStudents => prevStudents.filter(student => student._id !== id));
    } catch (error) {
      console.error("❌ Error al eliminar estudiante:", error);
    }
  };

  return (
    <div className="students-container">
      <h1 className="students-title">Lista de Alumnos</h1>
  
      <button className="register-button" onClick={() => setShowModal(true)}>
        <FaUserPlus /> Agregar Nuevo Alumno
      </button>
  
      {/* 🔹 Mostrar grupos de estudiantes */}
      <div className="students-groups">
        {Object.entries(groupedStudents).map(([groupName, students]) => (
          <div key={groupName} className="student-group">
            <h2 className="group-title">{groupName}</h2>
  
            {students.length === 0 ? (
              <p>No hay alumnos en este grupo.</p>
            ) : (
              <div className="students-grid">
                {students.map((student) => (
                  <div 
                    key={student._id} 
                    className="student-card"
                    onClick={() => navigate(`/students/${student._id}`)} // ✅ Ahora la tarjeta completa es clickeable
                    style={{ cursor: "pointer" }} 
                  >
                    <h3>{student.name}</h3>
                    <p>Edad: {student.age} años</p>
  
                    {/* 🔹 Evitar que los botones de editar/eliminar activen la navegación */}
                    <div className="student-actions">
                      <FaEdit 
                        className="edit-icon" 
                        onClick={(e) => { e.stopPropagation(); handleEditStudent(student); }} 
                      />
                      <FaTrash 
                        className="delete-icon" 
                        onClick={(e) => { e.stopPropagation(); handleDeleteStudent(student._id); }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
  
      {/* 🔹 Modal para agregar/editar alumno */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={() => setShowModal(false)}>✖</button>
            <h2>{editingStudentId ? "Editar Alumno" : "Agregar Alumno"}</h2>
  
            <form onSubmit={handleSaveStudent}>
              <input 
                type="text" 
                placeholder="Nombre del Alumno" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
              />
              <select value={age} onChange={(e) => setAge(Number(e.target.value))}>
                <option value="">Seleccione una edad</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
  
              <div className="modal-buttons">
                <button type="submit" className="submit-button">
                  {editingStudentId ? "Actualizar" : "Agregar"}
                </button>
                <button type="button" className="cancel-button" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}  

export default Students;












