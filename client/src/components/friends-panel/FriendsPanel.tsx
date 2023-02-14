import MainUser from './main-user/MainUser';
import './friends-panel.scss';

function FriendsPanel(): JSX.Element {
  return (
    <div className="friends-panel">
      <MainUser />
    </div>
  );
}

export default FriendsPanel;
