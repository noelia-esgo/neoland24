import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
    const { user } = useContext(AuthContext); // Obtener el usuario del contexto

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
