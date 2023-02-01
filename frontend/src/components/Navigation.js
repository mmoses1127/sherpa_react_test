import * as sessionActions from '../store/session';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Navigation = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(sessionActions.logout());
    // history.push('/login');
  };


  return (
    <div className='flex flex-row justify-end items-end w-full'>
      <a className='text-blue m-5' onClick={handleLogout} href="#">Log Out</a>
      <a className='text-blue m-5' href="/settings">Settings</a>
    </div>
  )
}

export default Navigation;