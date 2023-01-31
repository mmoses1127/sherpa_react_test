import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteTemperatureSetting } from "../store/temperatureSettings";
import { findUnitCookie, convertCtoF } from "./Settings";


const TempItem = ({temperatureSetting}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const unit = findUnitCookie().slice(0,1);
  const temp = unit === 'F' ? convertCtoF(temperatureSetting.temperature) : temperatureSetting.temperature;

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteTemperatureSetting(temperatureSetting.id))
    alert('Deleted')
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log('update')
    history.push(`/temps/${temperatureSetting.id}`)
  };

  return (
    <div className="flex flex-row justify-between items-center bg-cyan-200 m-3 h-10 p-3 min-w-[80%]" key={temperatureSetting.id}>
      <p>Start: {temperatureSetting.startTime.slice(11,16)}  End: {temperatureSetting.endTime.slice(11,16)}  Temperature: {temp[temp.length - 1] === '0' ? temp.slice(0,-2) : temp}°{unit}</p>
      <div>
        <button onClick={handleDelete} className="bg-red-500 m-3">Delete</button>
        <button onClick={handleUpdate} className="m-3">Edit</button>
      </div>
    </div>
  )

}

export default TempItem;