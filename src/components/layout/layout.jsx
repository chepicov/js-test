import React from 'react';
import { Switch, Route } from 'react-router-dom';
import List from 'components/list';
import Form from 'components/form';
import Header from './components/header';
import './layout.styles.css';

class Layout extends React.Component {
  render() {
    return (
      <div className="App" >
        <Header />
        <div className="App__container">
          <Switch>
            <Route path="/list" exact component={List} />
            <Route path="/" exact component={Form} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Layout;
