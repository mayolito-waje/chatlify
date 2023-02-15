import { useState } from 'react';
import SearchBar from '../misc/search-bar/SearchBar';
import SearchResults from '../misc/search-results/SearchResults';
import type { ChangeEvent } from 'react';
import * as userService from '../../services/user';
import './people-panel.scss';

function PeoplePanel(): JSX.Element {
  const [searchedUsers, setSearchedUsers] = useState([]);

  const handleSearch = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const query = event.target.value;

    if (query === '') {
      setSearchedUsers([]);
    } else {
      const result = await userService.searchUsers(query);
      setSearchedUsers(result);
    }
  };

  return (
    <div className="people-panel">
      <div>
        <SearchBar
          className="people-panel__search-bar"
          placeholder="Search People"
          onChange={handleSearch}
        />
        <SearchResults
          users={searchedUsers}
          className="people-panel__search-results"
        />
      </div>
    </div>
  );
}

export default PeoplePanel;
