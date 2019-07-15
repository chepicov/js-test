import React from 'react';
import PropTypes from 'react-proptypes';
import cx from 'classnames';
import _uniq from 'lodash/uniq';
import _omit from 'lodash/omit';
import noop from 'lodash/noop';

import './input.styles.css';

class Input extends React.PureComponent {
  onChange = (e) => {
    this.props.onChange(e.target.value);
  };

  errors() {
    if (!this.props.errors.length) {
      return null;
    }

    return <div className="input-wrapper__errors">{_uniq(this.props.errors).join(', ')}</div>;
  }

  render() {
    const {
      label,
      value,
      errors,
      inputRef,
      classNames: {
        mainContainer,
      },
    } = this.props;
    const hasErrors = !!errors.length;
    const props = _omit(this.props, ['className', 'classNames', 'defaultValue', 'inputRef', 'errors', 'onChange', 'onBlur', 'label', 'value', 'leftIcon']);
    return (
      <div
        ref={(c) => { this.input = c; }}
        className={cx('input-wrapper', mainContainer)}
      >
        <span
          className="input-container__label"
        >
          {label}
        </span>
        <div
          className={cx(['input-container', {
            'input-container--errors': hasErrors,
          }])}
        >
          <input
            className="input-container__input"
            onChange={this.onChange}
            value={value}
            ref={inputRef}
            {...props}
          />
        </div>
        {this.errors()}
      </div>
    );
  }
}

Input.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  classNames: PropTypes.shape({
    mainContainer: PropTypes.string,
  }),
  value: PropTypes.string,
  errors: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.object]),
  inputRef: PropTypes.func,
};

Input.defaultProps = {
  label: '',
  classNames: {},
  value: '',
  errors: [],
  onChange: noop,
  onBlur: noop,
  onFocus: noop,
  inputRef: noop,
};

export default Input;
