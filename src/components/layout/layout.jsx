import React from 'react';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { getUser } from 'resources/user/user.selectors';
import TeamList from 'components/teams';
import SignIn from 'components/signin';
import Form from 'components/form';
import Header from './components/header';
import './layout.styles.css';

class Layout extends React.Component {
  render() {
    const {
      user,
    } = this.props;
    return (
      <div className="App">
        <Header />
        <div className="App__container">
          <Switch>
            <Route path="/signin" exact component={SignIn} />
            {
              !user && (<Redirect path="/" to="/signin" />)
            }
            <Route path="/teams" exact component={TeamList} />
            <Route path="/teams/:id" exact component={Form} />
            <Redirect path="/" to="/teams" />
          </Switch>
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  user: PropTypes.shape().isRequired,
};

export default connect(state => ({
  user: getUser(state),
}))(Layout);
