import { combineReducers } from "redux";
import taskReport from "./taskReport/taskReport";
const appReducer = combineReducers({
    taskReport: taskReport,
});
export default appReducer;