import PropTypes from 'prop-types';
import type { InferProps } from 'prop-types';
import ProfilePicture from '../../ProfilePicture';
import './search-results.scss';

function SearchResults({
  users,
  className,
}: InferProps<typeof SearchResults.propTypes>): JSX.Element {
  return (
    <ul className={`search-results__container ${className as string}`}>
      {users.map((user) => {
        return (
          <li key={user?.id} className="search-results__list-item">
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
};

export default SearchResults;
