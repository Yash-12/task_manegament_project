import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as authLogin, register as authRegister } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const clearError = () => setError(null);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authLogin(username, password);
      if (response && response.user && response.token) {
        setUser(response.user);
        setToken(response.token);
        navigate('/tasks');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 
                         err.message || 
                         'Login failed. Please try again.';
      setError(errorMessage);
      throw errorMessage; // Re-throw for form handling if needed
    } finally {
      setLoading(false);
    }
  };

  const register = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authRegister(username, password);
      if (response && response.user && response.token) {
        setUser(response.user);
        setToken(response.token);
        navigate('/tasks');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || 
                         err.message || 
                         'Registration failed. Please try again.';
      setError(errorMessage);
      throw errorMessage; // Re-throw for form handling if needed
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setError(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      error,
      loading,
      login, 
      register, 
      logout,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};