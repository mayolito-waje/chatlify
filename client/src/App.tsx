import { Routes, Route, Navigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTriangleExclamation,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Chat from './pages/chat/Chat';
import Notification from './components/notification/Notification';

library.add(faTriangleExclamation, faCheck);

function App(): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<Navigate replace to="/auth/login" />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<Navigate replace to="/auth/login" />} />
      </Routes>

      <Notification />
    </div>
  );
}

export default App;
