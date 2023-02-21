import { useAppDispatch } from './react-redux';
import { useNavigate } from 'react-router-dom';
import { handleNotification } from '../reducers/notificationReducer';
import type { UserLogin, UserRegister } from '../types/user';
import axios, { AxiosError } from 'axios';

const useAuth = (): {
  login: (credentials: UserLogin) => Promise<void>;
  register: (credentials: UserRegister) => Promise<void>;
} => {
  const userUrl = '/api/users';
  const loginUrl = '/api/login';

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const login = async (credentials: UserLogin): Promise<void> => {
    try {
      const loginFromServer = await axios.post(loginUrl, credentials);
      const loggedUser = loginFromServer.data;

      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));

      dispatch(
        handleNotification(
          `logged in as ${loggedUser.name as string}`,
          'success'
        )
      );

      navigate('/chat');
    } catch (error: any) {
      if (error instanceof AxiosError) {
        dispatch(
          handleNotification(error.response?.data.error as string, 'error')
        );
      }
    }
  };

  const register = async (credentials: UserRegister): Promise<void> => {
    try {
      await axios.post(userUrl, credentials);
      await login({
        email: credentials.email,
        password: credentials.password,
      });
    } catch (error: any) {
      if (error instanceof AxiosError) {
        dispatch(
          handleNotification(error.response?.data.error as string, 'error')
        );
      }
    }
  };

  return { login, register };
};

export default useAuth;
