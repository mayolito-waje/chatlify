import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import type { InferProps } from 'prop-types';
import type { ChangeEventHandler } from 'react';
import './password-input.scss';

function PasswordInput({
  password,
  name,
  placeholder,
  onChange,
}: InferProps<typeof PasswordInput.propTypes>): JSX.Element {
  const [viewPassword, setViewPassword] = useState(false);

  const toggleClick = (): void => {
    setViewPassword(!viewPassword);
  };

  return (
    <div className="password-input">
      <input
        type={viewPassword ? 'text' : 'password'}
        name={name as string}
        className={name as string}
        placeholder={placeholder as string}
        value={password}
        onChange={onChange as ChangeEventHandler<HTMLInputElement>}
      />
      <FontAwesomeIcon
        icon={viewPassword ? 'eye-slash' : 'eye'}
        onClick={toggleClick}
        className="eye-icon"
      />
    </div>
  );
}

PasswordInput.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  password: PropTypes.string.isRequired,
};

PasswordInput.defaultProps = {
  name: 'password',
  placeholder: 'password...',
};

export default PasswordInput;
