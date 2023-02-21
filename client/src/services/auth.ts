import axios from 'axios';
import getToken from './fetch-token';

const userUrl = '/api/users';

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
