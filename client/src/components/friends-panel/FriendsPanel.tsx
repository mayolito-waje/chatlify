import MainUser from './main-user/MainUser';
import SearchBar from '../misc/search-bar/SearchBar';
import './friends-panel.scss';

function FriendsPanel(): JSX.Element {
  return (
    <div className="friends-panel">
      <MainUser />
      <SearchBar
        className="friends-panel__search-bar"
        placeholder="Search Friends"
        onChange={({ target }) => {
          console.log(target.value);
        }}
      />
    </div>
  );
}

export default FriendsPanel;
