import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createTemperatureSetting } from "../store/temperatureSettings";
import { convertCtoF, convertFtoC, findUnitCookie } from "./Settings";


const AddItem = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [temperature, setTemperature] = useState('');
  const unit = findUnitCookie().slice(0,1);

  const handleSave = (e) => {
    e.preventDefault();

    if (!startTime || !endTime || !temperature) {
      alert('Please fill out all fields')
      return;
    }

    if (startTime >= endTime) {
      alert('Start time must be before end time')
      return;
    }

    if (temperature < 0 || temperature > 100) {
      alert('Temperature must be between 0 and 100')
      return;
    }

    const newTemperatureSetting = {
      start_time: startTime,
      end_time: endTime,
      temperature: unit === 'F' ? convertFtoC(temperature) : temperature
    }
    const newItem = dispatch(createTemperatureSetting(newTemperatureSetting));
    if (newItem) {
      history.push('/');
    } else {
      alert('Item could not be created')
    }
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <form className="settings-form flex flex-col items-center justify-evenly">
          <label className="start-time-setting m-3">Start
            <input onChange={e => setStartTime(e.target.value)} className="bg-blue-500 p-3 m-3" type="time" name="start-time" id="start-time" value={startTime} />
          </label>
          <label className="end-time-setting m-3">End
            <input onChange={e => setEndTime(e.target.value)} className="bg-blue-500 p-3 m-3" type="time" name="end-time" id="end-time" value={endTime} />
          </label>
          <label className="temp-setting m-3" >Temperature ({unit})
            <input onChange={e => setTemperature(e.target.value)}className="bg-blue-500 p-3 m-3" type="number" name="temp" id="temp" value={temperature} />
          </label>
        </form>
        <div className="clock-zone"></div>
      </div>
      <button onClick={handleSave}>Save</button>
    </>
  );

}

export default AddItem;