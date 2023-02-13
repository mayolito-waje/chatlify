import { useState } from 'react';
import { useAppDispatch } from '../../hooks/react-redux';
import { handleNotification } from '../../reducers/notificationReducer';
import { Link, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import * as authService from '../../services/auth';
import axios, { AxiosError } from 'axios';
import Logo from '../../components/misc/logo/Logo';
import type { FormEvent, FormEventHandler } from 'react';
import type { UserRegister } from '../../types/user';
import './auth.scss';
import '../../styles/utils.scss';

function Register(): JSX.Element {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [picture, setPicture] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlePicture = async (pics: File): Promise<any> => {
    setLoading(true);
    if (pics === null) {
      return null;
    }
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const apiUrl = import.meta.env.VITE_CLOUDINARY_API;
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

      const picData = new FormData();
      picData.append('file', pics);
      picData.append('upload_preset', 'chatlify');
      picData.append('cloud_name', cloudName);

      try {
        const res = await axios.post(apiUrl, picData);
        setPicture(res.data.url.toString());
        setLoading(false);
      } catch (error: any) {
        console.log(error);
        setLoading(false);
      }
    } else {
      dispatch(handleNotification('please select an image', 'error'));
      setLoading(false);
    }
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ): Promise<any> => {
    event.preventDefault();

    if (password !== confirmPassword) {
      dispatch(handleNotification('passwords are not matched', 'error'));
      return null;
    }

    const newUser: UserRegister = { name, email, password, picture };

    try {
      await authService.createUser(newUser);

      const loggedIn = await authService.login({ email, password });
      authService.getToken(loggedIn.token);
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedIn));
      dispatch(handleNotification(`registered as ${name}`, 'success'));

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

        <h3>Register</h3>

        <label htmlFor="register_name">Name: </label>
        <input
          type="text"
          name="register_name"
          id="register_name"
          placeholder="example: John Doe"
          value={name}
          onChange={({ target }) => {
            setName(target.value);
          }}
        />
        <br />
        <label htmlFor="register_email">Email: </label>
        <input
          type="email"
          name="register_email"
          id="register_email"
          placeholder="user@example.com"
          value={email}
          onChange={({ target }) => {
            setEmail(target.value);
          }}
        />
        <br />
        <label htmlFor="register_password">Password: </label>
        <input
          type="password"
          name="register_password"
          id="register_password"
          placeholder="your password..."
          value={password}
          onChange={({ target }) => {
            setPassword(target.value);
          }}
        />
        <br />
        <label htmlFor="register_confirm-password">Confirm Password:</label>
        <input
          type="password"
          name="register_confirm-password"
          id="register_confirm-password"
          placeholder="confirm password..."
          value={confirmPassword}
          onChange={({ target }) => {
            setConfirmPassword(target.value);
          }}
        />
        <br />
        <label htmlFor="register_profile-pic">Profile Picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={({ target }) => {
            if (target.files === null) return;
            void handlePicture(target.files[0]);
          }}
        />
        <br />

        <button type="submit" className="blue-button">
          <span style={{ visibility: loading ? 'hidden' : 'visible' }}>
            Register
          </span>
          <CircularProgress
            size={15}
            color="inherit"
            sx={{
              position: 'absolute',
              visibility: loading ? 'visible' : 'hidden',
            }}
          />
        </button>
        <br />
        <Link className="link" to="/auth/login">
          Go to login page.
        </Link>
      </form>
    </div>
  );
}

export default Register;
