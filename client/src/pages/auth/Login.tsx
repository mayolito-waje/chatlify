import { Link } from 'react-router-dom';
import Logo from '../../components/misc/logo/Logo';
import './auth.scss';
import '../../styles/utils.scss';

function Login(): JSX.Element {
  return (
    <div className="center-contents">
      <form className="auth_container">
        <Logo className="auth_logo" />

        <h3>Login</h3>

        <label htmlFor="login_email">E-mail: </label>
        <input
          type="email"
          name="login_email"
          id="login_email"
          placeholder="user@example.com"
        />
        <br />
        <label htmlFor="login_password">Password: </label>
        <input
          type="password"
          name="login_password"
          id="login_password"
          placeholder="your password..."
        />
        <br />
        <button type="submit" className="blue-button">
          Login
        </button>
        <button type="button" className="red-button" style={{ marginTop: 10 }}>
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
