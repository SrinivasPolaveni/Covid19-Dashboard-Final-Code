import {Route, Redirect, Switch} from 'react-router-dom'

import './App.css'
import Home from './components/Home'
import About from './components/About'
import NotFound from './components/NotFound'
import StateWiseCaronaCasesView from './components/StateWiseCaronaCasesView'
import Vaccination from './components/Vaccination'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/vaccination" component={Vaccination} />
    <Route
      exact
      path="/state/:stateCode"
      component={StateWiseCaronaCasesView}
    />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
