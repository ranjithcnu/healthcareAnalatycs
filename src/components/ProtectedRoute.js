import { Route, Navigate } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...rest }) {
  const isLoggedIn = localStorage.getItem('token');  

  return (
    <Route 
      {...rest} 
      render={(props) => 
        isLoggedIn ? <Component {...props} /> : <Navigate to="/login" replace />
      }
    />
  );
}
export default ProtectedRoute;