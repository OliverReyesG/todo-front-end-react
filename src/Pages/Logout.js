import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    return (
      localStorage.removeItem('access'),
      localStorage.removeItem('refresh'),
      navigate('/login/')
    );
  });
};

export default Logout;
