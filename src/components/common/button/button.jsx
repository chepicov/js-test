import React from 'react';
import cx from 'classnames';
import PropTypes from 'react-proptypes';
import _omit from 'lodash/omit';
import noop from 'lodash/noop';

import './button.styles.css';

class Button extends React.PureComponent {
  render() {
    const {
      children,
      className,
      onClick,
      grey,
    } = this.props;
    const props = _omit(this.props, ['className', 'classNames', 'onClick', 'label', 'value', 'grey']);
    return (
      <button
        className={cx('button', className, {
          'button--grey': grey,
        })}
        onClick={onClick}
        type="button"
        {...props}
      >
        {children}
      </button>
    );
  }
}

Button.propTypes = {
  grey: PropTypes.bool,
  children: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Button.defaultProps = {
  grey: false,
  children: '',
  className: '',
  onClick: noop,
};

export default Button;
