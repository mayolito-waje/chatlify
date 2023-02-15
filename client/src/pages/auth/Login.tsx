import { useState } from 'react';
import type { FormEvent, FormEventHandler } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleNotification } from '../../reducers/notificationReducer';
import { useAppDispatch } from '../../hooks/react-redux';
import PasswordInput from '../../components/misc/password-input/PasswordInput';
import Logo from '../../components/misc/logo/Logo';
import * as authService from '../../services/auth';
import type { UserLogin } from '../../types/user';
import { AxiosError } from 'axios';
import './auth.scss';
import '../../styles/utils.scss';

function Login(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      const credential: UserLogin = { email, password };
      const loggedUser = await authService.login(credential);

      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
      authService.getToken(loggedUser.token);
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

  return (
    <div className="center-contents">
      <form
        className="auth_container"
        onSubmit={handleSubmit as FormEventHandler}
      >
        <Logo className="auth_logo" />

        <h3>Login</h3>

        <label htmlFor="login_email">E-mail: </label>
        <input
          type="email"
          name="login_email"
          id="login_email"
          placeholder="user@example.com"
          value={email}
          onChange={({ target }) => {
            setEmail(target.value);
          }}
        />
        <br />
        <label htmlFor="login_password">Password: </label>
        <PasswordInput
          password={password}
          name="login_password"
          placeholder="your password..."
          onChange={({ target }) => {
            setPassword(target.value);
          }}
        />
        <br />
        <button type="submit" className="blue-button">
          Login
        </button>
        <button
          type="button"
          className="red-button"
          style={{ marginTop: 10 }}
          onClick={() => {
            setEmail('guest@example.com');
            setPassword('guestUser#001');
          }}
        >
          Login as guest user
        </button>
        <br />
        <Link className="link" to="/auth/register">
          New user? Click here to register.
        </Link>
      </form>
    </div>
  );
}

export default Login;
