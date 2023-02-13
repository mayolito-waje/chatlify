import FriendsPanel from '../../components/friends-panel/FriendsPanel';
import './chat.scss';

function Chat(): JSX.Element {
  return (
    <div className="chat">
      <FriendsPanel />
      <div className="main-panel"></div>
      <div className="people-panel"></div>
    </div>
  );
}

export default Chat;
