// Imports:
import PropTypes from 'prop-types';
import { cn } from '../lib/class-name';

export default function Wrapper({ children, className }) {
  return (
    <div className={cn('w-full h-screen overflow-hidden', className)}>
      {children}
    </div>
  );
}

Wrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
