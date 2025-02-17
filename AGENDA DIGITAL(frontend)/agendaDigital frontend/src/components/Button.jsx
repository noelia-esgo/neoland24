const LogoutButton = () => {
    const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login"; 
    };
  
    return <button onClick={handleLogout}>Cerrar Sesión</button>;
  };
  
  export default LogoutButton;
  