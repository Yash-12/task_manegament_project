import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext'; // Added useAuth import
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          } />
          <Route path="/" element={<Navigate to="/tasks" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;