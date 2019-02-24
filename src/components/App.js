import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Checkout from '../components/containers/Checkout';
import GlobalStyle from '../components/styles/GlobalStyle';

const App = () => (
  <BrowserRouter>
    <>
    <Switch>
      <Route exact path='/' component={Checkout} />
    </Switch>
    <GlobalStyle/>
    </>
  </BrowserRouter>
)

export default App