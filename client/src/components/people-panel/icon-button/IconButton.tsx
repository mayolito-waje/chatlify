import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import type { InferProps } from 'prop-types';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import './icon-button.scss';

function IconButton({
  icon,
  text,
}: InferProps<typeof IconButton.propTypes>): JSX.Element {
  return (
    <div className="icon-button__container">
      <div className="circle">
        <FontAwesomeIcon
          icon={icon as FontAwesomeIconProps['icon']}
          style={{ width: '50%', height: '50%' }}
          className="icon"
        />
      </div>
      <span>{text}</span>
    </div>
  );
}

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default IconButton;
