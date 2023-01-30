import * as sessionActions from '../store/session';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(sessionActions.login({email, password}))
    .catch(async (res) => {
      let data;
      try {
        // .clone() essentially allows you to read the response body twice
        data = await res.clone().json();
      } catch {
        data = await res.text(); // Will hit this case if the server is down
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    });
  }

  return (
    <div className="w-1/2 flex flex-col justify-center items-center">
      <h1 className="text-xl">Welcome to App</h1>
      <form className="w-100% flex flex-col justify-center">
        {errors.length > 0 && (
          <ul className="w-4/4 bg-red-300 m-2">
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </ul>
        )}
        <label className="m-2" htmlFor="email">Email</label>
        <input onChange={e => setEmail(e.target.value)} className="w-4/4 bg-cyan-300 m-2" type="email" name="email" id="email" />
        <label className="m-2" htmlFor="password">Password</label>
        <input onChange={e => setPassword(e.target.value)} className="w-4/4 bg-cyan-300 m-2" type="password" name="password" id="password" />
        <button className="bg-cyan-500 m-2 w-1/2" onClick={handleLogin}>Login</button>
      </form>
    </div>
  )

}

export default Login;