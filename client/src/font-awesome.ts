import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faTriangleExclamation,
  faCheck,
  faUser,
  faMagnifyingGlass,
  faEye,
  faEyeSlash,
  faComment,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';

const setUpFontAwesomeIcons = (): void => {
  library.add(
    faTriangleExclamation,
    faCheck,
    faUser,
    faMagnifyingGlass,
    faEye,
    faEyeSlash,
    faComment,
    faUserGroup
  );
};

export default setUpFontAwesomeIcons;
