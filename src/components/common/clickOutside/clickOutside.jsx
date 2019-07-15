import React, { Component } from 'react';
import _omit from 'lodash/omit';
import PropTypes from 'react-proptypes';

class ClickOutside extends Component {
  constructor(props) {
    super(props);
    this.getContainer = this.getContainer.bind(this);
    this.isTouch = false;
  }

  componentDidMount() {
    document.addEventListener('touchend', this.handle, true);
    document.addEventListener('click', this.handle, true);
  }

  componentWillUnmount() {
    document.removeEventListener('touchend', this.handle, true);
    document.removeEventListener('click', this.handle, true);
  }

  getContainer(ref) {
    this.container = ref;
  }

  handle = (e) => {
    if (e.type === 'click' && this.isTouch) return;
    if (e.type === 'touchend') this.isTouch = true;
    const { onClickOutside } = this.props;
    const el = this.container;
    if (!el.contains(e.target) && e.target.dataset) {
      onClickOutside(e);
    }
  };

  render() {
    const { children } = this.props;
    const props = _omit(this.props, ['children', 'onClickOutside']);
    return <div {...props} ref={this.getContainer}>{children}</div>;
  }
}

ClickOutside.propTypes = {
  children: PropTypes.element,
  onClickOutside: PropTypes.func.isRequired,
};

ClickOutside.defaultProps = {
  children: [],
};

export default ClickOutside;
