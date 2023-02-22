import { useState } from 'react';
import SearchBar from '../misc/search-bar/SearchBar';
import SearchResults from '../misc/search-results/SearchResults';
import SearchedUser from './searched-user/SearchedUser';
import type { ChangeEvent, MouseEvent } from 'react';
import * as userService from '../../services/user';
import './people-panel.scss';

function PeoplePanel(): JSX.Element {
  interface FetchedUser {
    name: string;
    picture: string;
  }

  const [searchedUsers, setSearchedUsers] = useState([]);
  const [viewedUser, setViewedUser] = useState<FetchedUser | null>(null);

  const handleClick = async (
    event: MouseEvent<HTMLLIElement>
  ): Promise<void> => {
    const { id } = event.currentTarget.dataset;
    const fetchedUser = await userService.fetchById(id as string);
    setViewedUser(fetchedUser);
    setSearchedUsers([]);
  };

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
          onClick={handleClick}
        />
      </div>
      {viewedUser !== null ? (
        <SearchedUser
          pictureUrl={viewedUser?.picture}
          name={viewedUser?.name}
        />
      ) : (
        <p
          style={{
            opacity: 0.5,
            position: 'absolute',
            top: '50%',
          }}
        >
          Searched user shows here...
        </p>
      )}
    </div>
  );
}

export default PeoplePanel;
