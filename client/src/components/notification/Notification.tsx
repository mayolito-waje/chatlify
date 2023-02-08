import { useAppSelector } from '../../hooks/react-redux';
import type { CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './notification.scss';

function Notification(): JSX.Element {
  const { text, type } = useAppSelector((state) => state.notification);

  const style: CSSProperties = {
    transform: text === '' ? 'scale(0)' : 'scale(1)',
  };

  return (
    <div style={style} className={type}>
      {type === 'success' ? (
        <FontAwesomeIcon icon="check" />
      ) : (
        <FontAwesomeIcon icon="triangle-exclamation" />
      )}{' '}
      {text}
    </div>
  );
}

export default Notification;
