import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTriangleExclamation,
  faCheck,
  faUser,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from './hooks/react-redux';
import { handleNotification } from './reducers/notificationReducer';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Chat from './pages/chat/Chat';
import Notification from './components/notification/Notification';
import * as authService from './services/auth';

library.add(faTriangleExclamation, faCheck, faUser, faMagnifyingGlass);

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loggedUser = window.localStorage.getItem('loggedUser');

  if (loggedUser !== null) {
    const { token } = JSON.parse(loggedUser);
    authService.getToken(token);

    void authService
      .getLoggedUser()
      .then((user) => {
        dispatch(
          handleNotification(`logged in as ${user.name as string}`, 'success')
        );
      })
      .catch(() => {
        window.localStorage.removeItem('loggedUser');
        dispatch(
          handleNotification('token expired, please log-in again', 'error')
        );
        navigate('/auth/login');
      });
  }

  return (
    <div>
      <Routes>
        <Route path="/auth" element={<Navigate replace to="/auth/login" />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route
          path="/"
          element={
            loggedUser === null ? (
              <Navigate replace to="/auth/login" />
            ) : (
              <Navigate replace to="/chat" />
            )
          }
        />
      </Routes>

      <Notification />
    </div>
  );
}

export default App;
