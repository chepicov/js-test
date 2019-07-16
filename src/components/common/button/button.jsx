import React from 'react';
import cx from 'classnames';
import PropTypes from 'react-proptypes';
import _omit from 'lodash/omit';
import noop from 'lodash/noop';

import './button.styles.css';

class Button extends React.PureComponent {
  onChange = (e) => {
    this.props.onChange(e.target.value);
  };

  render() {
    const {
      children,
      onClick,
      grey,
    } = this.props;
    const props = _omit(this.props, ['className', 'classNames', 'onClick', 'label', 'value', 'grey']);
    return (
      <button
        className={cx('button', {
          'button--grey': grey,
        })}
        onClick={onClick}
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
};

Button.defaultProps = {
  grey: false,
  children: '',
  onClick: noop,
};

export default Button;
