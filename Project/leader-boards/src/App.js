import { Welcome } from './pages/Welcome'
import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { Header } from './pages/Header'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Router>
      <Header />
      
      <Switch>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/">
          <Welcome />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
