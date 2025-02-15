// Imports:
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

export default function MetaData({ title }) {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
}

// Prop types:
MetaData.propTypes = {
  title: PropTypes.string.isRequired,
};
