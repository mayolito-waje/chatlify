import PropTypes, { type InferProps } from 'prop-types';
import './notification.scss';

const notificationType = (
  props: any,
  propName: string,
  componentName: string
): any => {
  const types = ['success', 'error'];

  if (!types.includes(props[propName])) {
    return new Error(
      `Invalid prop ${propName} passed to ${componentName}. Expected a valid notification type.`
    );
  }
};

function Notification({
  type,
  text,
}: InferProps<typeof Notification.propTypes>): JSX.Element {
  return <div className={type as string}>{text as string}</div>;
}

Notification.propTypes = {
  type: notificationType,
  text: PropTypes.string,
};

export default Notification;
