import { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/StudentDetail.css";
import { useAuth } from "../context/AuthContext";
import { FaSignOutAlt,FaArrowLeft } from "react-icons/fa";


const StudentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [records, setRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null); // Para modo edición
  const { logout } = useAuth();

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

  // ✅ Obtener los datos del estudiante y registros
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await api.get(`/students/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error("❌ Error al obtener el estudiante:", error);
      }
    };

    const fetchRecords = async () => {
      try {
        const response = await api.get(`/registers/student/${id}`);
        setRecords(response.data);
      } catch (error) {
        console.error("❌ Error al obtener los registros:", error);
      }
    };

    fetchStudent();
    fetchRecords();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1); // Volver a la página anterior
  };
    // 🔹 Cerrar sesión
    const handleLogout = () => {
      console.log("Intentando cerrar sesión...");
      logout()
      // Depuración en consola
    }
    
  // ✅ Guardar o actualizar un registro
  const handleSaveRecord = async (e) => {
    e.preventDefault();

    try {
      if (editingRecord) {
        // 🔹 Modo edición
        const response = await api.put(`/registers/record/${editingRecord._id}`, { sleep, food });
        console.log("✅ Registro actualizado correctamente:", response.data);

        setRecords(records.map((rec) => (rec._id === editingRecord._id ? response.data.register : rec)));
        setEditingRecord(null); // Salir del modo edición
      } else {
        // 🔹 Modo crear nuevo registro
        const response = await api.post(`/registers/student/${id}`, { sleep, food });
        console.log("✅ Registro guardado correctamente:", response.data);

        setRecords([...records, response.data.register]); // Agregar nuevo registro a la UI
      }

      // Resetear el formulario
      setSleep({ morning: { hours: 0, minutes: 0 }, midday: { hours: 0, minutes: 0 }, evening: { hours: 0, minutes: 0 } });
      setFood({ mealType: "", description: "", quantity: "" });
    } catch (error) {
      console.error("❌ Error al guardar el registro:", error);
    }
  };

  // ✅ Cargar datos de un registro en el formulario para editar
  const handleEditRecord = (record) => {
    setEditingRecord(record);
    setSleep(record.sleep);
    setFood(record.food);
  };

  // ✅ Eliminar un registro
  const handleDeleteRecord = async (recordId) => {
    if (!window.confirm("¿Seguro que quieres eliminar este registro?")) return;

    try {
      await api.delete(`/registers/record/${recordId}`);
      console.log("✅ Registro eliminado correctamente");
      setRecords(records.filter((record) => record._id !== recordId));
    } catch (error) {
      console.error("❌ Error al eliminar el registro:", error);
    }
  };

  if (!student) return <p>Cargando...</p>;

  return (
    <div className="student-detail-container">
      <h1 className="student-name">{student.name}</h1>

      
       {/* Botón para volver atrás */}
       <div className="button-container">
  <button className="back-button" onClick={() => navigate(-1)}>
    <FaArrowLeft /> Volver
  </button>
  <button className="logout-button" onClick={logout}>
    <FaSignOutAlt /> Cerrar Sesión
  </button>
</div>



      <div className="student-detail-content">
        {/* 🔹 Formulario para agregar/editar registros */}
        <div className="register-form">
          <h2>{editingRecord ? "Editar Registro" : "Agregar Registro"}</h2>
          <form onSubmit={handleSaveRecord}>
            <h3>Sueño</h3>
            <label>
              Mañana: 
              <input type="number" value={sleep.morning.hours} onChange={(e) => setSleep({ ...sleep, morning: { ...sleep.morning, hours: Number(e.target.value) } })} /> h
              <input type="number" value={sleep.morning.minutes} onChange={(e) => setSleep({ ...sleep, morning: { ...sleep.morning, minutes: Number(e.target.value) } })} /> min
            </label>
            <label>
              Mediodía: 
              <input type="number" value={sleep.midday.hours} onChange={(e) => setSleep({ ...sleep, midday: { ...sleep.midday, hours: Number(e.target.value) } })} /> h
              <input type="number" value={sleep.midday.minutes} onChange={(e) => setSleep({ ...sleep, midday: { ...sleep.midday, minutes: Number(e.target.value) } })} /> min
            </label>
            <label>
              Tarde: 
              <input type="number" value={sleep.evening.hours} onChange={(e) => setSleep({ ...sleep, evening: { ...sleep.evening, hours: Number(e.target.value) } })} /> h
              <input type="number" value={sleep.evening.minutes} onChange={(e) => setSleep({ ...sleep, evening: { ...sleep.evening, minutes: Number(e.target.value) } })} /> min
            </label>

            <h3>Alimentación</h3>
            <label>
              Tipo de comida:
              <select value={food.mealType} onChange={(e) => setFood({ ...food, mealType: e.target.value })}>
                <option value="">Selecciona...</option>
                <option value="desayuno">Desayuno</option>
                <option value="almuerzo">Comida</option>
                <option value="cena">Merienda</option>
              </select>
            </label>
            <label>
              Descripción: 
              <input type="text" value={food.description} onChange={(e) => setFood({ ...food, description: e.target.value })} />
            </label>
            <label>
  Cantidad:
  <select value={food.quantity} onChange={(e) => setFood({ ...food, quantity: e.target.value })}>
    <option value="">Seleccione una opción</option>
    <option value="Todo">Todo</option>
    <option value="Bastante">Bastante</option>
    <option value="Poco">Poco</option>
    <option value="Nada">Nada</option>
  </select>
</label>


            <button type="submit">{editingRecord ? "Actualizar" : "Guardar Registro"}</button>
          </form>
        </div>

        {/* 🔹 Lista de registros guardados */}
        <div className="records-list">
          <h2>Registros de {student.name}</h2>
          {records.length === 0 ? (
            <p>No hay registros aún.</p>
          ) : (
            records.map((record, index) => (
              <div key={record._id} className="record-item">
                <h3>Registro {index + 1}</h3>
                <p><strong>Sueño:</strong> Mañana: {record.sleep?.morning?.hours ?? 0}h {record.sleep?.morning?.minutes ?? 0}min, Mediodía: {record.sleep?.midday?.hours ?? 0}h {record.sleep?.midday?.minutes ?? 0}min, Tarde: {record.sleep?.evening?.hours ?? 0}h {record.sleep?.evening?.minutes ?? 0}min</p>
                <p><strong>Alimentación:</strong> {record.food?.mealType ?? "No especificado"} - {record.food?.description ?? "Sin descripción"} ({record.food?.quantity ?? "Desconocida"})</p>

                <button onClick={() => handleEditRecord(record)}>Editar</button>
                <button onClick={() => handleDeleteRecord(record._id)}>Eliminar</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;





























































