import React from 'react';
import { Router } from 'react-router-dom';
import Layout from 'components/layout';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import configureStore from './resources/store';


function App() {
  const initialState = {};

  const history = createBrowserHistory();
  const store = configureStore(initialState, history);

  return (
    <Provider store={store}>
      <Router history={history}>
        <Layout />
      </Router>
    </Provider>
  );
}

export default App;
