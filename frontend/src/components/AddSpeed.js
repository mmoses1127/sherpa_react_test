import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSpeedSetting } from "../store/speedSettings";
import { findSpeedLabel, findUnitCookie, speedLabels } from "./Settings";


const AddSpeed = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [speed, setSpeed] = useState(1);
  const unit = findUnitCookie('speed');

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

    const newSpeedSetting = {
      
      start_time: startTime,
      end_time: endTime,
      speed
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
          <label className="speed-setting m-3 min-w-[280px] flex flex-row justify-between items-center" >Speed: {unit === 'Labels' ? findSpeedLabel(parseInt(speed)) : speed}
            <input onChange={e => setSpeed(e.target.value)}className="bg-blue-500 m-3" type="range" name="temp" id="speed" min="1" max="3" value={speed} />
          </label>
        </form>
        <div className="clock-zone"></div>
      </div>
      <button onClick={handleSave}>Save</button>
    </>
  );

}

export default AddSpeed;