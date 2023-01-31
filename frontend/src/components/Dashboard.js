import { useSelector, useDispatch } from "react-redux";
import { fetchTemperatureSettings, getTemperatureSettings, deleteTemperatureSetting, updateTemperatureSetting } from "../store/temperatureSettings";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import TempItem from "./TempItem";
import Navigation from "./Navigation";


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
      <Navigation />
      <div className="flex flex-col justify-center items-center min-w-[80%]">
        {temperatureSettings.map(temperatureSetting => <TempItem temperatureSetting={temperatureSetting} key={temperatureSetting.id} />
        )}

      </div>
      <button onClick={handleAdd}>Add</button>
    </>
  );
}

export default Dashboard;