import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteSpeedSetting } from "../store/speedSettings";
import { findUnitCookie, speedLabels, findSpeedLabel } from "./Settings";

const SpeedItem = ({speedSetting}) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const unit = findUnitCookie('Speed');
  const speed = unit === 'Labels' ? findSpeedLabel(speedSetting.speed) : speedSetting.speed;

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteSpeedSetting(speedSetting.id))
    alert('Deleted')
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    history.push(`/speeds/${speedSetting.id}`)
  };

  return (
    <div className="flex flex-row justify-between items-center bg-cyan-200 m-3 h-10 p-3 min-w-[80%]" key={speedSetting.id}>
      <p>Start: {speedSetting.startTime.slice(11,16)}  End: {speedSetting.endTime.slice(11,16)}  Intensity: {speed}</p>
      <div>
        <button onClick={handleDelete} className="bg-red-500 m-3">Delete</button>
        <button onClick={handleUpdate} className="m-3">Edit</button>
      </div>
    </div>
  )

}

export default SpeedItem;