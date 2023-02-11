import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import type { InferProps } from 'prop-types';
import type { CSSProperties } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ProfilePicture({
  size,
  link,
  name,
}: InferProps<typeof ProfilePicture.propTypes>): JSX.Element {
  const [img, setImg] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchImg = async (): Promise<void> => {
    const res = await fetch(link);
    const blob = await res.blob();
    const objectURL = URL.createObjectURL(blob);
    setImg(objectURL);
    setLoading(false);
  };

  useEffect(() => {
    void fetchImg();
  }, []);

  const imgStyle: CSSProperties = {
    borderRadius: '50%',
    width: size as number,
    height: size as number,
    backgroundColor: '#cdcdb1',
  };

  return (
    <>
      {loading ? (
        <div
          style={{
            ...imgStyle,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <FontAwesomeIcon
            icon="user"
            style={{
              height: '50%',
              width: '50%',
              color: '#ebebe0',
            }}
          />
        </div>
      ) : (
        <img style={imgStyle} src={img} alt={name + "'s profile picture"} />
      )}
    </>
  );
}

ProfilePicture.propTypes = {
  size: PropTypes.number,
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

ProfilePicture.defaultProps = {
  size: 100,
};

export default ProfilePicture;
