import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../store/session";
import { fetchTemperatureSettings, getTemperatureSettings } from "../store/temperatureSettings";
import { fetchSpeedSettings, getSpeedSettings } from "../store/speedSettings";
import TempItem from "./TempItem";
import SpeedItem from "./SpeedItem";
import Navigation from "./Navigation";


const Dashboard = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const temperatureSettings = useSelector(getTemperatureSettings);
  const speedSettings = useSelector(getSpeedSettings);
  const userType = useSelector(getCurrentUser).userType;

  useEffect(() => {
    if (userType === 'A') {
      dispatch(fetchTemperatureSettings());
    } else {
      dispatch(fetchSpeedSettings());
    }
  }, [dispatch, userType]);

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

        {userType === 'B' && speedSettings.map(speedSetting => <SpeedItem speedSetting={speedSetting} key={speedSetting.id} />
        )}

      </div>
      <button onClick={handleAdd}>Add</button>
    </>
  );
}

export default Dashboard;