import {Switch, Route, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navigation from './components/Navigation';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddItem from './components/AddItem';


function App() {

  const currentUser = useSelector(state => state.session.user);

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
        <Route path="/add-item">
          {!currentUser ? <Redirect to="/login" /> : <AddItem />}
        </Route>
        <Route path="">
          <Redirect to='/'/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
