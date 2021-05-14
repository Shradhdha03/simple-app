
import './App.css';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Signin from './components/Signin';
import Checkout from './components/Checkout';
import Error from './components/Signin';
function App() {
  return (
    <div className="App">

      <Switch>
        <Route path="/" component={Signin} exact />
        <Route path="/checkout" component={Checkout} />
        <Route component={Error} />
      </Switch>

  
    </div>
  );
}

export default App;
