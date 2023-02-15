import axios from 'axios';
import type { UserLogin, UserRegister } from '../types/user';
import getToken from './fetch-token';

const userUrl = '/api/users';
const loginUrl = '/api/login';

export const login = async (credentials: UserLogin): Promise<any> => {
  const result = await axios.post(loginUrl, credentials);
  return result.data;
};

export const createUser = async (
  registerDetails: UserRegister
): Promise<any> => {
  const result = await axios.post(userUrl, registerDetails);
  return result.data;
};

export const getUsers = async (): Promise<any> => {
  const result = await axios.get(userUrl, {
    headers: {
      Authorization: getToken(),
    },
  });
  return result.data;
};

export const getLoggedUser = async (): Promise<any> => {
  const result = await axios.get(userUrl + '/@me', {
    headers: {
      Authorization: getToken(),
    },
  });
  return result.data;
};
