import * as sessionActions from '../store/session';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Navigation = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    console.log('logout')
    await dispatch(sessionActions.logout());
    history.push('/login');
  };

  return (
    <a onClick={handleLogout} href="/">Log Out</a>
  )
}

export default Navigation;