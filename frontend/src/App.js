import {Switch, Route, Redirect} from 'react-router-dom';
import Navigation from './components/Navigation';
import Login from './components/Login';


function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/">
          <Login/>
        </Route>
        <Route path="/signup">
          <Redirect to='/'/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
