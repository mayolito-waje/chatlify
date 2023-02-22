import PropTypes from 'prop-types';
import type { InferProps } from 'prop-types';
import Profile from './profile/Profile';

function SearchedUser({
  pictureUrl,
  name,
}: InferProps<typeof SearchedUser.propTypes>): JSX.Element {
  return (
    <div>
      <Profile pictureUrl={pictureUrl} name={name} />
    </div>
  );
}

SearchedUser.propTypes = {
  pictureUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default SearchedUser;
