const LogoutButton = () => {
    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login"; // Redirigir al login
    };
  
    return <button onClick={handleLogout}>Cerrar Sesión</button>;
  };
  
  export default LogoutButton;
  