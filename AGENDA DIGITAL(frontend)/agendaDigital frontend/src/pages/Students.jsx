import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import api from "../services/api";
import { FaUserPlus, FaTrash, FaEdit, FaSignOutAlt } from "react-icons/fa"; 
import "../styles/Students.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [editingStudentId, setEditingStudentId] = useState(null);
  const navigate = useNavigate();
  const { logout } = useAuth(); //

  // Cargar estudiantes desde la API al inicio
  useEffect(() => {
    const fetchStudents = async () => {
        try {
            console.log("📌 Haciendo GET a: /api/students");
            const response = await api.get("/students"); // ✅ Asegurar que la URL es correcta
            console.log("✅ Lista de estudiantes obtenida:", response.data);
            setStudents(response.data);
        } catch (error) {
            console.error("❌ Error al obtener los estudiantes:", error);
        }
    };

    fetchStudents();
}, []);


  // Agruparalumnos por edad
  const groupedStudents = {
    Gateadores: students.filter(student => student.age === 0),
    Andarines: students.filter(student => student.age === 1),
    Saltarines: students.filter(student => student.age === 2 || student.age === 3),
  };

  // Guardar o editar alumno
  const handleSaveStudent = async (e) => {
    e.preventDefault();

    if (!name.trim() || age === "" || age === null || age === undefined) {
        alert("⚠ Completa todos los campos correctamente.");
        return;
    }

    try {
        let response;
        if (editingStudentId) {
            // Editar alumno 
            response = await api.put(`/students/${editingStudentId}`, { name, age: Number(age) });
            console.log(" Estudiante actualizado:", response.data);

            //  Actualizar la lista de alumnos en el frontend
            setStudents((prevStudents) =>
                prevStudents.map((student) =>
                    student._id === editingStudentId ? response.data : student
                )
            );
        } else {
            // Agregar nuevo alumno
            response = await api.post("/students", { name, age: Number(age) });
            console.log("Alumno guardado:", response.data);

            if (!response.data) {
                throw new Error("La respuesta del servidor es inválida.");
            }

            // Agregar nuevo alumno
            setStudents((prevStudents) => [...prevStudents, response.data]); 
        }

        setShowModal(false);
        setName("");
        setAge("");
        setEditingStudentId(null);
    } catch (error) {
        console.log("❌ Error al guardar el estudiante:", error);
    }
};



  // Editar alumno
  const handleEditStudent = (student) => {
    console.log("📌 Editando estudiante:", student);

    setEditingStudentId(student._id);
    setName(student.name);
    setAge(student.age);

    setTimeout(() => {
        setShowModal(true);
        console.log(" showModal cambiado a true después de timeout.");
    }, 0);
};

  // Eliminar alumno
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
      <div className="header">
        <h1 className="students-title">Lista de Alumnos</h1>
        <button className="logout-button" onClick={logout}>
          <FaSignOutAlt /> Cerrar Sesión
        </button>
      </div>

      <button className="register-button" onClick={() => setShowModal(true)}>
        <FaUserPlus /> Agregar Nuevo Alumno
      </button>
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
                    onClick={() => {
                      console.log("📌 Navegando a: ", `/students/${student._id}`);
                      navigate(`/students/${student._id}`); 
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <h3>{student.name}</h3>
                    <p>Edad: {student.age} años</p>

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
    onChange={(e) => {
        console.log("Nombre ingresado:", e.target.value); // 🔍 Depuración
        setName(e.target.value);
    }} 
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
};

export default Students;
