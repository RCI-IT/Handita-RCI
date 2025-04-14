import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../authService';
import { setTokenWithExpiry } from '../../../utils/localStorage';

export const useAuth = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async (username: string, password: string) => {
    try {
      const { token } = await login(username, password);
      setTokenWithExpiry(token, 3600000); // 1 jam
      navigate('/dashboard');
    } catch (err) {
      setError('Username/password salah');
    }
  };

  const handleLogout = () => {
    localStorage.clear(); // atau hapus item tertentu
    navigate('/login');
  };

  return { handleLogin, handleLogout, error };
};
