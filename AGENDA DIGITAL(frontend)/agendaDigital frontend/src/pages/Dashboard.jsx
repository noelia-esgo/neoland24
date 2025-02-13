import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate,isAuthenticated]); // ✅ Solo depende de navigate, evitando bucles

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false); // ✅ Cambia el estado antes de redirigir
    navigate("/login", { replace: true });
    window.location.reload()
  };

  if (!isAuthenticated) return <p className="text-center text-xl">🔄 Cargando...</p>; 
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-6">Bienvenido al Dashboard</h1>
      <button onClick={handleLogout} className="bg-red-500 text-white px-6 py-3 rounded-lg">
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Dashboard;


