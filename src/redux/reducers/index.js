import { combineReducers } from "redux";
import Auth from "./Auth";
import Test from "./Test";
const reducers = combineReducers({
  auth: Auth,
  test: Test,
});

export default reducers;
