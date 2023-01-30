const Login = () => {

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('login')
  }

  return (
    <div className="w-1/2 flex flex-col justify-center items-center">
      <h1 className="text-xl">Welcome to App</h1>
      <form className="w-100% flex flex-col justify-center">
        <label className="m-2" htmlFor="email">Email</label>
        <input className="w-4/4 bg-cyan-300 m-2" type="email" name="email" id="email" />
        <label className="m-2" htmlFor="password">Password</label>
        <input className="w-4/4 bg-cyan-300 m-2" type="password" name="password" id="password" />
        <button className="bg-cyan-500 m-2 w-1/2" onClick={handleLogin}>Login</button>
      </form>
    </div>
  )

}

export default Login;