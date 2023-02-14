import { useState, useEffect } from 'react';
import ProfilePicture from '../../ProfilePicture';
import * as authService from '../../../services/auth';
import './main-user.scss';

function MainUser(): JSX.Element {
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchLoggedUser = async (): Promise<void> => {
    try {
      const loggedUser = await authService.getLoggedUser();

      setProfilePicUrl(loggedUser.picture);
      setName(loggedUser.name);
      setEmail(loggedUser.email);
    } catch (error) {
      console.log('Error getting logged user:', error);
    }
  };

  useEffect(() => {
    void fetchLoggedUser();
  }, []);

  return (
    <div className="main-user-container">
      <ProfilePicture size={50} link={profilePicUrl} name={name} />
      <div className="logged-user-details">
        <h3 className="name">{name}</h3>
        <p className="email">{email}</p>
      </div>
    </div>
  );
}

export default MainUser;
