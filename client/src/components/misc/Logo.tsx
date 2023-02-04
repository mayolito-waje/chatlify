import './logo.scss';
import PropTypes, { type InferProps } from 'prop-types';

function Logo({ className }: InferProps<typeof Logo.propTypes>): JSX.Element {
  return (
    <div className={className as string}>
      <h2 className="chatlify-logo">Chatlify</h2>
      <h3 className="chatlify-text">Meet people with same interests!</h3>
    </div>
  );
}

Logo.propTypes = {
  className: PropTypes.string,
};

export default Logo;
