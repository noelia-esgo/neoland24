import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import LoginPage from "./pages/Login";
import Students from "./pages/Students";
import StudentDetail from "./pages/StudentDetail";

const PrivateRoute = ({ element }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    return user ? element : <Navigate to="/login" replace />;
};

const App = () => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    return (
        <Routes>
            <Route path="/login" element={user ? <Navigate to="/students" replace /> : <LoginPage />} />
            <Route path="/students" element={<PrivateRoute element={<Students />} />} />
            <Route path="/students/:id" element={<PrivateRoute element={<StudentDetail />} />} />
            <Route path="/" element={<Navigate to={user ? "/students" : "/login"} replace />} />
        </Routes>
    );
};

export default App;








