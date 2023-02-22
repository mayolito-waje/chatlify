import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTriangleExclamation,
  faCheck,
  faUser,
  faMagnifyingGlass,
  faEye,
  faEyeSlash,
  faComment,
} from '@fortawesome/free-solid-svg-icons';

const setUpFontAwesomeIcons = (): void => {
  library.add(
    faTriangleExclamation,
    faCheck,
    faUser,
    faMagnifyingGlass,
    faEye,
    faEyeSlash,
    faComment
  );
};

export default setUpFontAwesomeIcons;
