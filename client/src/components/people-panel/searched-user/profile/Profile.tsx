import PropTypes from 'prop-types';
import type { InferProps } from 'prop-types';
import ProfilePicture from '../../../ProfilePicture';
import './profile.scss';

function Profile({
  pictureUrl,
  name,
}: InferProps<typeof Profile.propTypes>): JSX.Element {
  return (
    <div className="searched-user__profile">
      <ProfilePicture name={name} link={pictureUrl} />
      <h3>{name}</h3>
    </div>
  );
}

Profile.propTypes = {
  pictureUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Profile;
