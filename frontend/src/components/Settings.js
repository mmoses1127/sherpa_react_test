import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../store/session";

export const findUnitCookie = (type) => {
  const targetCookie = type === 'temp' ? 'tempUnit' : 'speedUnit';
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split('=');
    console.log(cookie[0])
    if (cookie[0].trim() === targetCookie) {
      console.log('cookie found')
      return cookie[1];
    }
  }
  console.log('cookie not found')
  return 'Fahrenheit';
};

export const convertCtoF = (temp) => {
  return Math.round((temp * 9/5) + 32);
};

export const convertFtoC = (temp) => {
  return Math.round(((temp - 32) * 5/9) * 10) / 10;
};

export const speedLabels = {
  'low': 1,
  'medium': 2,
  'high': 3
}

export const findSpeedLabel = (speedNumber) => {
  for (let key in speedLabels) {
    if (speedLabels[key] === speedNumber) {
      return key;
    }
  }
}

const Settings = () => {

  const history = useHistory();
  const userType = useSelector(getCurrentUser).userType;

  const [tempUnit, setTempUnit] = useState(findUnitCookie('temp'));
  const [speedUnit, setSpeedUnit] = useState(findUnitCookie('speed'));

  useEffect(() => {
    if (tempUnit === 'Fahrenheit' || speedUnit === 'numbers') {
      document.getElementById('farhenheit-button').style.backgroundColor = 'cyan';
      document.getElementById('celcius-button').style.backgroundColor = 'gray';
    } else {
      document.getElementById('farhenheit-button').style.backgroundColor = 'gray';
      document.getElementById('celcius-button').style.backgroundColor = 'cyan';
    }
  }, [tempUnit, speedUnit]);


  const handleSelect = (e) => {
    e.preventDefault();
    if (userType === 'A') {
      setTempUnit(e.target.innerHTML);
    } else {
      setSpeedUnit(e.target.innerHTML);
    }
    e.target.style.backgroundColor = 'cyan';
  };
  
  const handleCancel = (e) => {
    e.preventDefault();
    history.push('/')
  };
  
  const handleSave = (e) => {
    e.preventDefault();
    if (userType === 'A') {
      document.cookie = `tempUnit=${tempUnit}; path=/; max-age=31536000; SameSite=Lax; Secure;`
    } else {
      document.cookie = `speedUnit=${speedUnit}; path=/; max-age=31536000; SameSite=Lax; Secure;`
    }
    history.push('/')
  };

  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <h1 className='text-3xl'>Settings</h1>
      <div>
        {userType === 'A' &&
        <>
        <button id="farhenheit-button" className='bg-slate-200 text-black' onClick={handleSelect}>Fahrenheit{tempUnit === 'Fahrenheit' && <i className="fa-solid fa-check"></i>}</button>
        <button id="celcius-button"className='bg-slate-200 text-black' onClick={handleSelect}>Celcius{tempUnit === 'Celcius' && <i className="fa-solid fa-check"></i>}</button>
        </>
        }

        {userType === 'B' &&
        <>
        <button id="farhenheit-button" className='bg-slate-200 text-black' onClick={handleSelect}>Numbers{speedUnit === 'Numbers' && <i className="fa-solid fa-check"></i>}</button>
        <button id="celcius-button"className='bg-slate-200 text-black' onClick={handleSelect}>Labels{speedUnit === 'Labels' && <i className="fa-solid fa-check"></i>}</button>
        </>
        }

        <div>
          <button onClick={handleCancel} className="m-3 bg-slate-200 text-black">Cancel</button>
          <button onClick={handleSave} className="m-3">Save</button>
        </div>
      </div>
    </div>
  )

}

export default Settings;