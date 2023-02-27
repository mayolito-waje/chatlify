import PropTypes from 'prop-types';
import type { InferProps } from 'prop-types';
import Profile from './profile/Profile';
import IconButton from '../icon-button/IconButton';
import './searched-user.scss';

function SearchedUser({
  pictureUrl,
  name,
}: InferProps<typeof SearchedUser.propTypes>): JSX.Element {
  return (
    <div>
      <Profile pictureUrl={pictureUrl} name={name} />
      <div className="icon-buttons">
        <IconButton icon="comment" text="Chat" />
        <IconButton icon="user-group" text="Add Friend" />
      </div>
    </div>
  );
}

SearchedUser.propTypes = {
  pictureUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default SearchedUser;
