import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Job from './Job';
import ProductList from './ProductList';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/Job" component={Job} />
        <Route path="/ProductList" component={ProductList} />
      </Switch>
    </Router>
  );
}

export default App;
