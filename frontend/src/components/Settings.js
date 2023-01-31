import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

export const findUnitCookie = () => {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split('=');
    if (cookie[0] === 'tempUnit') {
      return cookie[1];
    }
  }
  return 'Fahrenheit';
};

export const convertCtoF = (temp) => {
  return Math.round((temp * 9/5) + 32);
};

const Settings = () => {

  const history = useHistory();


  const [tempUnit, setTempUnit] = useState(findUnitCookie());

  useEffect(() => {
    if (tempUnit === 'Fahrenheit') {
      document.getElementById('farhenheit-button').style.backgroundColor = 'cyan';
      document.getElementById('celcius-button').style.backgroundColor = 'gray';
    } else {
      document.getElementById('farhenheit-button').style.backgroundColor = 'gray';
      document.getElementById('celcius-button').style.backgroundColor = 'cyan';
    }
  }, [tempUnit]);


  const handleSelect = (e) => {
    e.preventDefault();
    setTempUnit(e.target.innerHTML);
    console.log(tempUnit)
    e.target.style.backgroundColor = 'cyan';
  };

  const handleCancel = (e) => {
    e.preventDefault();
    console.log('cancel')
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log('save')
    document.cookie = `tempUnit=${tempUnit}; path=/; max-age=31536000; SameSite=Lax; Secure;`
    console.log(document.cookie)
    history.push('/')
  };

  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <h1 className='text-3xl'>Settings</h1>
      <div>
          {/* <input className="appearance-none bg-slate-200 text-black checked:bg-cyan-500 h-10 w-10 position-absolute" type='radio' name='tempUnit' value='Fahrenheit' id='fahrenheit'/>
          <label className="h-10 w-10 bg-slate-200 text-black" for="fahrenheit">Fahrenheit</label>

          <input className="appearance-none bg-slate-200 text-black checked:bg-cyan-500 h-10 w-10 position-absolute" type='radio' name='tempUnit' value='Celcius' id='Celcius' />
          <label className="h-10 w-10 bg-slate-200 text-black" for="celcius">Celcius</label> */}

        <button id="farhenheit-button" className='bg-slate-200 text-black' onClick={handleSelect}>Fahrenheit{tempUnit === 'Fahrenheit' && <i className="fa-solid fa-check"></i>}</button>
        <button id="celcius-button"className='bg-slate-200 text-black' onClick={handleSelect}>Celcius{tempUnit === 'Celcius' && <i className="fa-solid fa-check"></i>}</button>

        <div>
          <button onClick={handleCancel} className="m-3 bg-slate-200 text-black">Cancel</button>
          <button onClick={handleSave} className="m-3">Save</button>
        </div>
      </div>
    </div>
  )

}

export default Settings;