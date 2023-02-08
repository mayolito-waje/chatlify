import axios from 'axios';
import type { UserLogin, UserRegister } from '../types/user';

const userUrl = '/api/users';
const loginUrl = '/api/login';

let token: string;

export const getToken = (setToken: string): void => {
  token = `bearer ${setToken}`;
};

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
      Authorization: token,
    },
  });
  return result.data;
};
