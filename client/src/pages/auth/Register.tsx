import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Logo from '../../components/misc/logo/Logo';
import './auth.scss';
import '../../styles/utils.scss';

function Register(): JSX.Element {
  return (
    <div className="center-contents">
      <form className="auth_container">
        <Logo className="auth_logo" />

        <h3>Register</h3>

        <label htmlFor="register_name">Name: </label>
        <input
          type="text"
          name="register_name"
          id="register_name"
          placeholder="example: John Doe"
        />
        <br />
        <label htmlFor="register_email">Email: </label>
        <input
          type="email"
          name="register_email"
          id="register_email"
          placeholder="user@example.com"
        />
        <br />
        <label htmlFor="register_password">Password: </label>
        <input
          type="password"
          name="register_password"
          id="register_password"
          placeholder="your password..."
        />
        <br />
        <label htmlFor="register_confirm-password">Confirm Password:</label>
        <input
          type="password"
          name="register_confirm-password"
          id="register_confirm-password"
          placeholder="confirm password..."
        />
        <br />
        <label htmlFor="register_profile-pic">Profile Picture</label>
        <input type="file" accept="image/*" />
        <br />

        <button type="submit" className="blue-button">
          <span style={{ visibility: 'hidden' }}>Register</span>
          <CircularProgress
            size={15}
            color="inherit"
            sx={{ position: 'absolute' }}
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
