import { Outlet } from 'react-router-dom';
import Login from '../Pages/Login';

const useAuth = () => {
  const accessToken = localStorage.getItem('access');
  return true && accessToken;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
