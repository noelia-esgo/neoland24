import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await api.get(`/students/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error("❌ Error al obtener el estudiante:", error);
      }
    };
    fetchStudent();
  }, [id]);

  return (
    <div>
      {student ? (
        <>
          <h1>{student.name}</h1>
          <p>Edad: {student.age} años</p>
          <button onClick={() => window.history.back()}>Volver</button>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default StudentDetail;
















































