import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/StudentDetail.css";

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [records, setRecords] = useState([]);
  const [morningSleep, setMorningSleep] = useState({ hours: "", minutes: "" });
  const [middaySleep, setMiddaySleep] = useState({ hours: "", minutes: "" });
  const [afternoonSleep, setAfternoonSleep] = useState({ hours: "", minutes: "" });
  const [mealType, setMealType] = useState("");
  const [foodType, setFoodType] = useState("");
  const [foodQuantity, setFoodQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await api.get(`/students/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error("Error al obtener datos del estudiante:", error);
      }
    };

    const fetchRecords = async () => {
      try {
        const response = await api.get(`/students/${id}/records`);
        setRecords(response.data);
      } catch (error) {
        console.error("Error al obtener registros:", error);
      }
    };

    fetchStudentDetails();
    fetchRecords();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newRecord = { morningSleep, middaySleep, afternoonSleep, mealType, foodType, foodQuantity };
      const response = await api.post(`/students/${id}/records`, newRecord);
      setRecords([...records, response.data]);
      setMorningSleep({ hours: "", minutes: "" });
      setMiddaySleep({ hours: "", minutes: "" });
      setAfternoonSleep({ hours: "", minutes: "" });
      setMealType("");
      setFoodType("");
      setFoodQuantity("");
    } catch (error) {
      console.error("Error al guardar el registro:", error);
    }

    setLoading(false);
  };

  if (!student) return <p>Cargando datos del estudiante...</p>;

  return (
    <div className="student-details-container">
      <div className="student-card">
        <h1>{student.name}</h1>
        <p>Edad: {student.age} años</p>
      </div>

      <div className="register-card">
        <h2>Registrar Actividades</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Tipo de Comida:
            <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
              <option value="">Selecciona una opción</option>
              <option value="desayuno">Desayuno</option>
              <option value="comida">Comida</option>
              <option value="merienda">Merienda</option>
            </select>
          </label>
          <label>
            Registro de Alimentación:
            <input type="text" placeholder="Ej. Pan con leche" value={foodType} onChange={(e) => setFoodType(e.target.value)} />
          </label>
          <label>
            Cantidad Comida:
            <select value={foodQuantity} onChange={(e) => setFoodQuantity(e.target.value)}>
              <option value="">Selecciona una opción</option>
              <option value="poco">Poco</option>
              <option value="bastante">Bastante</option>
              <option value="todo">Todo</option>
              <option value="nada">Nada</option>
            </select>
          </label>
          <h3>Tiempo Dormido</h3>
          {[{ label: "Mañana", state: morningSleep, setState: setMorningSleep },
            { label: "Mediodía", state: middaySleep, setState: setMiddaySleep },
            { label: "Tarde", state: afternoonSleep, setState: setAfternoonSleep }].map(({ label, state, setState }) => (
            <label key={label}>
              {label}:
              <input type="number" placeholder="Horas" value={state.hours} onChange={(e) => setState({ ...state, hours: e.target.value })} min="0" />
              <input type="number" placeholder="Minutos" value={state.minutes} onChange={(e) => setState({ ...state, minutes: e.target.value })} min="0" max="59" />
            </label>
          ))}
          <button type="submit" className="save-button" disabled={loading}>{loading ? "Guardando..." : "Guardar Registro"}</button>
        </form>
      </div>

      <div className="records-card">
        <h2>Registros</h2>
        {records.length === 0 ? <p>No hay registros aún.</p> : (
          <ul>
            {records.map((record, index) => (
              <li key={index}>
                <p><strong>Comida:</strong> {record.mealType} - {record.foodType} ({record.foodQuantity})</p>
                <p><strong>Tiempo de sueño:</strong> Mañana: {record.morningSleep.hours}h {record.morningSleep.minutes}m, Mediodía: {record.middaySleep.hours}h {record.middaySleep.minutes}m, Tarde: {record.afternoonSleep.hours}h {record.afternoonSleep.minutes}m</p>
                <button className="edit-button">✏️ Editar</button>
                <button className="delete-button">🗑️ Eliminar</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;





















































