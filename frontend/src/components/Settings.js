import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../store/session";

export const findUnitCookie = (type) => {
  const targetCookie = type === 'temp' ? 'tempUnit' : 'speedUnit';
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split('=');
    if (cookie[0].trim() === targetCookie) {
      return cookie[1];
    }
  }
  return 'Fahrenheit';
};

export const convertCtoF = (temp) => {
  return Math.round((temp * 9/5) + 32);
};

export const convertFtoC = (temp) => {
  return Math.round(((temp - 32) * 5/9) * 10) / 10;
};

export const speedLabels = {
  'Low': 1,
  'Medium': 2,
  'High': 3
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
  let button1;
  let button2;

  if (userType === 'A') {
    button1 = document.getElementById('farhenheit-button');
    button2 = document.getElementById('celcius-button');
  } else {
    button1 = document.getElementById('numbers-button');
    button2 = document.getElementById('labels-button');
  }

  console.log(findUnitCookie('temp'))

  useEffect(() => {
    if (button1 && button2) {
      if ((userType === 'A' && tempUnit === 'Fahrenheit') || (userType === 'B' && speedUnit === 'numbers')) {
        button1.style.backgroundColor = 'cyan';
        button2.style.backgroundColor = 'gray';
      } else {
        button1.style.backgroundColor = 'gray';
        button2.style.backgroundColor = 'cyan';
      }
    }
  }, [tempUnit, speedUnit, userType]);


  const handleSelect = (e) => {
    e.preventDefault();
    if (userType === 'A') {
      setTempUnit(e.target.innerHTML.split('<')[0]);
    } else {
      setSpeedUnit(e.target.innerHTML.split('<')[0]);
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
        <button id="farhenheit-button" className='bg-slate-200 text-black min-w-[150px]' onClick={handleSelect}>Fahrenheit{tempUnit === 'Fahrenheit' && <i className="fa-solid fa-check"></i>}</button>
        <button id="celcius-button"className='bg-slate-200 text-black min-w-[150px]' onClick={handleSelect}>Celcius{tempUnit === 'Celcius' && <i className="fa-solid fa-check"></i>}</button>
        </>
        }

        {userType === 'B' &&
        <>
        <button id="numbers-button" className='bg-slate-200 text-black min-w-[150px]' onClick={handleSelect}>Numbers{speedUnit === 'Numbers' && <i className="fa-solid fa-check"></i>}</button>
        <button id="labels-button"className='bg-slate-200 text-black min-w-[150px]' onClick={handleSelect}>Labels{speedUnit === 'Labels' && <i className="fa-solid fa-check"></i>}</button>
        </>
        }

        <div className="flex flex-row justify-center items-center">
          <button onClick={handleCancel} className="m-3 bg-slate-200 text-black  min-w-[100px]">Cancel</button>
          <button onClick={handleSave} className="m-3  min-w-[100px]">Save</button>
        </div>
      </div>
    </div>
  )

}

export default Settings;