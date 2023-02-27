import PropTypes from 'prop-types';
import type { InferProps } from 'prop-types';
import type { MouseEventHandler } from 'react';
import ProfilePicture from '../../ProfilePicture';
import './search-results.scss';

function SearchResults({
  users,
  className,
  onClick,
}: InferProps<typeof SearchResults.propTypes>): JSX.Element {
  return (
    <div className={`search-results__container ${className as string}`}>
      <ul>
        {users.slice(0, 5).map((user) => {
          return (
            <li
              key={user?.id}
              className="search-results__list-item"
              data-id={user?.id}
              onClick={onClick as MouseEventHandler<HTMLLIElement>}
            >
              <ProfilePicture
                size={20}
                link={user?.picture as string}
                name={user?.name as string}
              />
              <span>{user?.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

SearchResults.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    })
  ).isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default SearchResults;
