import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import MainPage from "./components/MainPage";

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          component={ MainPage }
        />
      </Switch>
    </Router>
  );
};

export default App;
