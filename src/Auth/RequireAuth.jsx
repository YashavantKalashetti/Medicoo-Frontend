import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

const RequireAuth = ({ allowedRoles }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();


  if (user && allowedRoles.includes(user.role)) {
    return <Outlet />;
  }

  if (user) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export default RequireAuth;
