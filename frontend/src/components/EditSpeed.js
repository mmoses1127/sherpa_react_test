import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { findUnitCookie, findSpeedLabel } from "./Settings";
import { getSpeedSetting, fetchSpeedSetting, updateSpeedSetting } from "../store/speedSettings";


const EditSpeed = () => {

  const {speedItemId} = useParams(); 
  const speedSetting = useSelector(getSpeedSetting(speedItemId));
  const dispatch = useDispatch();
  const history = useHistory();
  const [startTime, setStartTime] = useState(speedSetting?.startTime.slice(11, 16));
  const [endTime, setEndTime] = useState(speedSetting?.endTime.slice(11, 16));
  const unit = findUnitCookie();
  const [speed, setSpeed] = useState(speedSetting.speed);


  useEffect(() => {
    dispatch(fetchSpeedSetting(speedItemId))
  }, [speedItemId])

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!startTime || !endTime || !speed) {
      alert('Please fill out all fields')
      return;
    }

    if (startTime >= endTime) {
      alert('Start time must be before end time')
      return;
    }

    const updatedSpeedSetting = {
      id: speedItemId,
      start_time: startTime,
      end_time: endTime,
      speed: unit === 'Labels' ? speed : speed
    }
    const updatedItem = await dispatch(updateSpeedSetting(updatedSpeedSetting));
    if (updatedItem) {
      history.push('/');
    } else {
      alert('Item could not be updated')
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
      <button onClick={handleUpdate}>Save</button>
    </>
  );

};


export default EditSpeed;