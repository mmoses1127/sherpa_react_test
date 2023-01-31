import { useSelector, useDispatch } from "react-redux";
import { fetchTemperatureSettings, getTemperatureSettings } from "../store/temperatureSettings";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";


const Dashboard = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const temperatureSettings = useSelector(getTemperatureSettings);

  useEffect(() => {
    dispatch(fetchTemperatureSettings());
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    history.push('/add-item')
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {temperatureSettings.map(temperatureSetting => {
          return (
            <div className="flex flex-row justify-between items-center bg-cyan-200 m-3 h-10 p-3" key={temperatureSetting.id}>
              <p>Start: {temperatureSetting.startTime.slice(11,16)}  End: {temperatureSetting.endTime.slice(11,16)}  Temperature: {temperatureSetting.temperature}°C</p>
              <div>
                <button className="bg-red-500 m-3">Delete</button>
                <button className="m-3">Edit</button>
              </div>
            </div>
          )
        })}

      </div>
      <button onClick={handleAdd}>Add</button>
    </>
  );
}

export default Dashboard;