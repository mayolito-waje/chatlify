import axios from 'axios';
import getToken from './fetch-token';

const url = '/api/users';

export const searchUsers = async (query: string): Promise<any> => {
  const result = await axios.get(`${url}?search=${query}`, {
    headers: {
      Authorization: getToken(),
    },
  });

  return result.data;
};

export const fetchById = async (id: string): Promise<any> => {
  const result = await axios.get(`${url}/${id}`, {
    headers: {
      Authorization: getToken(),
    },
  });

  return result.data;
};
