import {
   SET_ERRORS,
   CLEAR_ERRORS
} from "./types";

export const setErrors = (error) => {
	return {
		type: SET_ERRORS,
		payload: error
	};
};

export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS
	};
};