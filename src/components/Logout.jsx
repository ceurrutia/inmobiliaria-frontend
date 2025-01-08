import { useNavigate } from 'react-router-dom';

const NavbarComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); //Redirige a login
  };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="/">Inicio</a>
        </li>
        <li>
          <a href="/propiedades">Propiedades</a>
        </li>
        <li>
          <a href="/emprendimientos">Emprendimientos</a>
        </li>
        <li>
          <button onClick={handleLogout}>Cerrar sesión</button> 
        </li>
      </ul>
    </nav>
  );
};

export default NavbarComponent;
