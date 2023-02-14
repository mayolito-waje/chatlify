import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import type { InferProps } from 'prop-types';
import './search-bar.scss';

function SearchBar({
  placeholder,
  onChange,
  className,
}: InferProps<typeof SearchBar.propTypes>): JSX.Element {
  return (
    <div className={`search-bar ${className as string}`}>
      <FontAwesomeIcon icon="magnifying-glass" className="search-icon" />
      <input
        type="text"
        placeholder={placeholder as string}
        onChange={onChange}
      />
    </div>
  );
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

SearchBar.defaultProps = {
  placeholder: 'search',
};

export default SearchBar;
