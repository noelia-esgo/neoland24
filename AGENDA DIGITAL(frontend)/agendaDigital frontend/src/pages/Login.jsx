import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/Login.css"; 
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const { user, login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/students"); 
        }
    }, [user, navigate]);

    const resetForm = () => {
        setName("");
        setEmail("");
        setPassword("");
        setMessage("");
        setError("");
    };

    const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    
    if (!email || !password) {
        setError("⚠ Todos los campos son obligatorios.");
        return;
    }

    setLoading(true);

    try {
        const response = await api.post("/auth/login", { email, password });
        const { token, user } = response.data;

        login(user, token);
    } catch (err) {
        let errorMessage = "⚠ Error en el inicio de sesión.";

        if (err.response?.status === 401) {
            errorMessage = "⚠ Correo electrónico o contraseña incorrectos.";
        } else if (!err.response) {
            errorMessage = "⚠ No se pudo conectar con el servidor.";
        }

        setError(errorMessage);

    
        setTimeout(() => {
            setError(""); 
            setEmail("")
            setPassword(""); 
            setLoading(false); 
        }, 3000);
    }
};


    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!name || !email || !password) {
            setError("⚠ Todos los campos son obligatorios.");
            return;
        }

        setLoading(true);

        try {
            const response = await api.post("/auth/register", { name, email, password });

            if (response.data.message && response.data.message.toLowerCase().includes("registro exitoso")) {
                setMessage("Usuario registrado con éxito.");

                setTimeout(() => {
                    setMessage(""); 
                    setShowRegister(false);
                    resetForm();
                }, 3000);
            } else {
                throw new Error("⚠ Error inesperado en el registro.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "⚠ Error en el proceso. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">{showRegister ? "Registro" : "Bienvenido"}</h2>

                
                {error && <p className="error-message">{error}</p>}
                {message && <p className="success-message">{message}</p>}

                <form onSubmit={showRegister ? handleRegister : handleLogin}>
                    {showRegister && (
                        <div>
                            <label>Nombre</label>
                            <input
                                type="text"
                                className="login-input"
                                placeholder="Tu Nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    )}

                    <label>Correo Electrónico</label>
                    <input
                        type="email"
                        className="login-input"
                        placeholder="tucorreo@correo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label>Contraseña</label>
                    <input
                        type="password"
                        className="login-input"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />

                    <button type="submit" className="login-button login" disabled={loading}>
                        {loading ? "Procesando..." : showRegister ? "Registrarse" : "Iniciar sesión"}
                    </button>
                </form>

                <button
                    className="login-button register"
                    onClick={() => setShowRegister(!showRegister)}
                >
                    {showRegister ? "¿Ya tienes cuenta? Iniciar sesión" : "Registrarse"}
                </button>
            </div>
        </div>
    );
};

export default LoginPage;




































