import {Switch, Route, Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddItem from './components/AddItem';
import EditItem from './components/EditItem';
import Settings from './components/Settings';


function App() {

  const currentUser = useSelector(state => state.session.user);

  return (
    <>
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
        <Route path="/temps/:tempItemId">
          {!currentUser ? <Redirect to="/login" /> : <EditItem />}
        </Route>
        <Route path="/settings">
          {!currentUser ? <Redirect to="/login" /> : <Settings />}
        </Route>
        <Route path="">
          <Redirect to='/'/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
