import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', { email, password });
      
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate('/propiedades');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(`Error de autenticación: ${err.response.data.message}`);
      } else {
        setError('Error de autenticación. Intenta de nuevo.');
      }
    }
  };

  return (
    <div className="container">
    <div className="row justify-content-center mt-5">
      <div className="col-md-6">
        <div className="card shadow-lg rounded-3 border-0">
          <div className="card-body p-5">
            <h5 className="card-title text-center mb-4">Iniciar sesión</h5>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 py-2">Iniciar sesión</button>
            </form>
            <p className="mt-3 text-center">
              ¿No tienes cuenta? <a href="/register">Regístrate</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;
