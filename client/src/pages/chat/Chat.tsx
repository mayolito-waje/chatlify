import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/react-redux';
import { handleNotification } from '../../reducers/notificationReducer';
import FriendsPanel from '../../components/friends-panel/FriendsPanel';
import './chat.scss';

function Chat(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const hasLoggedUser = window.localStorage.getItem('loggedUser');
    if (hasLoggedUser === null) {
      dispatch(handleNotification('no token found, please log in', 'error'));
      navigate('/auth/login');
    }
  }, []);

  return (
    <div className="chat">
      <FriendsPanel />
      <div className="main-panel"></div>
      <div className="people-panel"></div>
    </div>
  );
}

export default Chat;
