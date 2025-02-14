import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const StudentDetail = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [records, setRecords] = useState([]);
  const [sleep, setSleep] = useState({
    morning: { hours: 0, minutes: 0 },
    midday: { hours: 0, minutes: 0 },
    evening: { hours: 0, minutes: 0 },
  });
  const [food, setFood] = useState({
    mealType: "",
    description: "",
    quantity: "",
  });

  // ✅ Obtener los datos del estudiante
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        console.log(`📌 Haciendo GET a: /api/students/${id}`);
        const response = await api.get(`/students/${id}`);
        console.log("✅ Estudiante obtenido:", response.data);
        setStudent(response.data);
      } catch (error) {
        console.error("❌ Error al obtener el estudiante:", error);
      }
    };

    const fetchRecords = async () => {
      try {
        console.log(`📌 Haciendo GET a: /api/students/${id}/records`);
        const response = await api.get(`/students/${id}/records`);
        console.log("✅ Registros obtenidos:", response.data);
        setRecords(response.data);
      } catch (error) {
        console.error("❌ Error al obtener los registros:", error);
      }
    };

    fetchStudent();
    fetchRecords();
  }, [id]);

  // ✅ Manejar el envío del formulario
  const handleSaveRecord = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/students/${id}/records`, { sleep, food });
      console.log("✅ Registro guardado:", response.data);
      
      // 🔹 Agregar nuevo registro a la lista
      setRecords([...records, response.data.record]); 
    } catch (error) {
      console.error("❌ Error al guardar el registro:", error);
    }
  };

  if (!student) return <p>Cargando...</p>;

  return (
    <div className="student-detail-container">
      {/* 🔹 Nombre del estudiante */}
      <h1>{student.name}</h1>

      <div className="student-detail-content">
        {/* 🔹 Formulario para registrar sueño y alimentación */}
        <div className="register-form">
          <h2>Agregar Registro</h2>
          <form onSubmit={handleSaveRecord}>
            <h3>Sueño</h3>
            <label>
              Mañana: 
              <input type="number" value={sleep.morning.hours} onChange={(e) => setSleep({ ...sleep, morning: { ...sleep.morning, hours: e.target.value } })} /> h
              <input type="number" value={sleep.morning.minutes} onChange={(e) => setSleep({ ...sleep, morning: { ...sleep.morning, minutes: e.target.value } })} /> min
            </label>
            <label>
              Mediodía: 
              <input type="number" value={sleep.midday.hours} onChange={(e) => setSleep({ ...sleep, midday: { ...sleep.midday, hours: e.target.value } })} /> h
              <input type="number" value={sleep.midday.minutes} onChange={(e) => setSleep({ ...sleep, midday: { ...sleep.midday, minutes: e.target.value } })} /> min
            </label>
            <label>
              Tarde: 
              <input type="number" value={sleep.evening.hours} onChange={(e) => setSleep({ ...sleep, evening: { ...sleep.evening, hours: e.target.value } })} /> h
              <input type="number" value={sleep.evening.minutes} onChange={(e) => setSleep({ ...sleep, evening: { ...sleep.evening, minutes: e.target.value } })} /> min
            </label>

            <h3>Alimentación</h3>
            <label>
              Tipo de comida:
              <select value={food.mealType} onChange={(e) => setFood({ ...food, mealType: e.target.value })}>
                <option value="">Selecciona...</option>
                <option value="desayuno">Desayuno</option>
                <option value="almuerzo">Almuerzo</option>
                <option value="cena">Cena</option>
              </select>
            </label>
            <label>
              Descripción: <input type="text" value={food.description} onChange={(e) => setFood({ ...food, description: e.target.value })} />
            </label>
            <label>
              Cantidad: <input type="text" value={food.quantity} onChange={(e) => setFood({ ...food, quantity: e.target.value })} />
            </label>

            <button type="submit">Guardar Registro</button>
          </form>
        </div>

        {/* 🔹 Mostrar registros guardados */}
        <div className="records-list">
          <h2>Registros de {student.name}</h2>
          {records.length === 0 ? (
            <p>No hay registros aún.</p>
          ) : (
            records.map((record, index) => (
              <div key={index} className="record-item">
                <h3>Registro {index + 1}</h3>

                {/* Verificamos si el registro tiene datos de sueño */}
                {record.sleep ? (
                  <p>
                    <strong>Sueño:</strong> Mañana: {record.sleep?.morning?.hours ?? 0}h {record.sleep?.morning?.minutes ?? 0}min, 
                    Mediodía: {record.sleep?.midday?.hours ?? 0}h {record.sleep?.midday?.minutes ?? 0}min, 
                    Tarde: {record.sleep?.evening?.hours ?? 0}h {record.sleep?.evening?.minutes ?? 0}min
                  </p>
                ) : (
                  <p><strong>Sueño:</strong> No hay datos disponibles.</p>
                )}

                {/* Verificamos si el registro tiene datos de comida */}
                {record.food ? (
                  <p>
                    <strong>Alimentación:</strong> {record.food?.mealType ?? "No especificado"} - 
                    {record.food?.description ?? "Sin descripción"} ({record.food?.quantity ?? "Desconocida"})
                  </p>
                ) : (
                  <p><strong>Alimentación:</strong> No hay datos disponibles.</p>
                )}

                <button onClick={() => console.log("Editar")}>Editar</button>
                <button onClick={() => console.log("Eliminar")}>Eliminar</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;



























































