import * as React from 'react'
import { HashRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import { render } from 'react-dom';
import logo from './logo.svg';
import './App.css';


import Login from './screen/login/Login';
import Dashboard from './screen/dashboard/Dashboard';
import CategoryList from './component/categoryList/CategoryList';
import DetailCategory from './component/DetailCategory';

function App() {
  return (
    <div className="App">

      <Switch>
        <Route exact path='/'>
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login" component={Login} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/category" component={CategoryList} />
        <Route exact path="/category/detail" component={DetailCategory} />
      </Switch>
    </div>
  );
}

export default App;
