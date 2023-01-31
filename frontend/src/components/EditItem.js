import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getTemperatureSetting, updateTemperatureSetting, fetchTemperatureSetting } from "../store/temperatureSettings";
import { convertCtoF, convertFtoC, findUnitCookie } from "./Settings";


const EditItem = () => {

  const {tempItemId} = useParams(); 
  const tempSetting = useSelector(getTemperatureSetting(tempItemId));
  const dispatch = useDispatch();
  const history = useHistory();
  const [startTime, setStartTime] = useState(tempSetting?.startTime.slice(11, 16));
  const [endTime, setEndTime] = useState(tempSetting?.endTime.slice(11, 16));
  const unit = findUnitCookie().slice(0,1);
  const [temperature, setTemperature] = useState(unit === 'F' ? convertCtoF(tempSetting.temperature) : tempSetting.temperature);


  useEffect(() => {
    dispatch(fetchTemperatureSetting(tempItemId))
  }, [tempItemId])

  const handleUpdate = async (e) => {
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

    const updatedTemperatureSetting = {
      id: tempItemId,
      start_time: startTime,
      end_time: endTime,
      temperature: unit === 'F' ? convertFtoC(temperature) : temperature
    }
    const updatedItem = await dispatch(updateTemperatureSetting(updatedTemperatureSetting));
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
          <label className="temp-setting m-3" >Temperature ({unit})
            <input onChange={e => setTemperature(e.target.value)}className="bg-blue-500 p-3 m-3" type="number" name="temp" id="temp" value={temperature} />
          </label>
        </form>
        <div className="clock-zone"></div>
      </div>
      <button onClick={handleUpdate}>Save</button>
    </>
  );

};


export default EditItem;