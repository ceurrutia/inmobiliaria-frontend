import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent'; 
import Inicio from './components/Inicio';  
import Login from './components/Login';
import Propiedades from './components/Propiedades';
import Emprendimientos from './components/Emprendimientos';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import Logout from './components/Logout';

const App = () => {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />

        {/* protegidas */ }
        <Route path="/propiedades" element={<PrivateRoute element={<Propiedades />} />} />
        <Route path="/emprendimientos" element={<PrivateRoute element={<Emprendimientos />} />} />
      </Routes>
    </Router>
  );
};

export default App;
