import SearchBar from '../misc/search-bar/SearchBar';
import './people-panel.scss';

function PeoplePanel(): JSX.Element {
  return (
    <div className="people-panel">
      <SearchBar
        className="people-panel__search-bar"
        placeholder="Search People"
        onChange={() => {
          return null;
        }}
      />
    </div>
  );
}

export default PeoplePanel;
