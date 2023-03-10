import * as sessionActions from '../store/session';
import { useDispatch } from 'react-redux';

const Navigation = () => {

  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(sessionActions.logout());
  };


  return (
    <div className='flex flex-row justify-end items-end w-full'>
      <a className='text-blue m-5' onClick={handleLogout} href="/#">Log Out</a>
      <a className='text-blue m-5' href="/settings">Settings</a>
    </div>
  )
}

export default Navigation;