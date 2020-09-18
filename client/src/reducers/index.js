import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import postReducer from "./postReducers";
import songReducer from "./songReducers";
export default combineReducers({
   auth: authReducer,
   post: postReducer,
   song: songReducer,
   errors: errorReducer
});