import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; 

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('token'); 

  if (!isAuthenticated) {
    return <Navigate to="/login" />; 
  }

  return element; 
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired, 
};

export default PrivateRoute;

