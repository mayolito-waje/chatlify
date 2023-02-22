import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './chat-button.scss';

function ChatButton(): JSX.Element {
  return (
    <div className="chat-button__container">
      <div className="circle">
        <FontAwesomeIcon
          icon="comment"
          style={{ width: '50%', height: '50%' }}
          className="icon"
        />
      </div>
      <span>Chat</span>
    </div>
  );
}

export default ChatButton;
