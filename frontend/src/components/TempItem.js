import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteTemperatureSetting } from "../store/temperatureSettings";


const TempItem = ({temperatureSetting}) => {
  console.log(temperatureSetting)
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteTemperatureSetting(temperatureSetting.id))
    alert('Deleted')
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log('update')
    history.push(`/edit-temp-item/${temperatureSetting.id}`)
  };

  return (
    <div className="flex flex-row justify-between items-center bg-cyan-200 m-3 h-10 p-3" key={temperatureSetting.id}>
      <p>Start: {temperatureSetting.startTime.slice(11,16)}  End: {temperatureSetting.endTime.slice(11,16)}  Temperature: {temperatureSetting.temperature}°C</p>
      <div>
        <button onClick={handleDelete} className="bg-red-500 m-3">Delete</button>
        <button onClick={handleUpdate} className="m-3">Edit</button>
      </div>
    </div>
  )

}

export default TempItem;