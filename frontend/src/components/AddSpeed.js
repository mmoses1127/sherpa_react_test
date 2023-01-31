import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createTemperatureSetting } from "../store/temperatureSettings";
import { convertFtoC, findUnitCookie } from "./Settings";


const AddSpeed = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [speed, setSpeed] = useState('');
  const unit = findUnitCookie().slice(0,1);

  const handleSave = (e) => {
    e.preventDefault();

    if (!startTime || !endTime || !speed) {
      alert('Please fill out all fields')
      return;
    }

    if (startTime >= endTime) {
      alert('Start time must be before end time')
      return;
    }

    // if (speed < 0 || speed > 100) {
    //   alert('speed must be between 0 and 100')
    //   return;
    // }

    const newSpeedSetting = {
      start_time: startTime,
      end_time: endTime,
      speed: unit === 'labels' ? speedlabels[speed] : speed
    }
    const newItem = dispatch(createSpeedSetting(newSpeedSetting));
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
          <label className="temp-setting m-3" >Speed
            <input onChange={e => setSpeed(e.target.value)}className="bg-blue-500 p-3 m-3" type="number" name="temp" id="temp" value={speed} />
          </label>
        </form>
        <div className="clock-zone"></div>
      </div>
      <button onClick={handleSave}>Save</button>
    </>
  );

}

export default AddSpeed;