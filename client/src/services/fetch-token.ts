const getToken = (): string | null => {
  const loggedUser = window.localStorage.getItem('loggedUser');
  if (loggedUser === null) return null;

  const { token } = JSON.parse(loggedUser);
  return `bearer ${token as string}`;
};

export default getToken;
