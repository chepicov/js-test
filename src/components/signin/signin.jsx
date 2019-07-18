import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'react-proptypes';
import Input from 'components/common/input';
import Button from 'components/common/button';
import { setSessionUser } from 'resources/user/user.actions';
import './signin.styles.css';

class Form extends React.Component {
  state = {
    name: '',
    email: '',
  }

  onChangeName = (value) => {
    this.setState({
      name: value,
    });
  }

  onChangeEmail = (value) => {
    this.setState({
      email: value,
    });
  }

  onSubmit = (e) => {
    const {
      email, name,
    } = this.state;
    const {
      setSessionUser: setUser, history,
    } = this.props;
    e.preventDefault();
    if (!name || !email) {
      return;
    }
    const user = {
      name,
      email,
    };
    setUser(user);
    history.push('/');
  }

  render() {
    const {
      email,
      name,
    } = this.state;

    return (
      <div className="signin">
        <form className="form" onSubmit={this.onSubmit}>
          <h1>Sign in</h1>
          <div className="form__label">name:</div>
          <Input
            name="name"
            type="text"
            onChange={this.onChangeName}
            value={name}
          />
          <div className="form__label">email:</div>
          <Input
            name="email"
            type="email"
            onChange={this.onChangeEmail}
            value={email}
          />
          <Button
            type="submit"
            disabled={!email || !name}
          >
            Sign in
          </Button>
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  setSessionUser: PropTypes.func.isRequired,
};

export default withRouter(connect(() => {}, {
  setSessionUser,
})(Form));
