import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';

function App(): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<Navigate replace to="/auth/login" />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/" element={<Navigate replace to="/auth/login" />} />
      </Routes>
    </div>
  );
}

export default App;
