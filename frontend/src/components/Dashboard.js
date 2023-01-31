import { useSelector, useDispatch } from "react-redux";
import { fetchTemperatureSettings, getTemperatureSettings, deleteTemperatureSetting, updateTemperatureSetting } from "../store/temperatureSettings";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../store/session";
import TempItem from "./TempItem";
import Navigation from "./Navigation";


const Dashboard = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const temperatureSettings = useSelector(getTemperatureSettings);
  const userType = useSelector(getCurrentUser).userType;

  useEffect(() => {
    dispatch(fetchTemperatureSettings());
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    history.push('/add-setting')
  };

  return (
    <>
      <Navigation />
      <div className="flex flex-col justify-center items-center min-w-[80%]">
        
        {userType === 'A' && temperatureSettings.map(temperatureSetting => <TempItem temperatureSetting={temperatureSetting} key={temperatureSetting.id} />
        )}

        {/* {userType === 'B' && temperatureSettings.map(temperatureSetting => <TempItem temperatureSetting={temperatureSetting} key={temperatureSetting.id} />
        )} */}

      </div>
      <button onClick={handleAdd}>Add</button>
    </>
  );
}

export default Dashboard;