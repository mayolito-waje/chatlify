import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App(): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<Navigate replace to="/auth/login" />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/" element={<Navigate replace to="/auth/login" />} />
      </Routes>
    </div>
  );
}

export default App;
