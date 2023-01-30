import {Switch, Route, Redirect} from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { useSelector } from 'react-redux';


function App() {

  const currentUser = useSelector(state => state.session.user);
  console.log(currentUser)
  // const loggedIn = false;

  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/">
          {!currentUser ? <Redirect to="/login" /> : <Dashboard />}
        </Route>
        <Route path="/login">
          {currentUser ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="">
          <Redirect to='/'/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
