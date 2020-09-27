import axios from "axios";
import {
   UPLOAD_SONG,
   GET_SONG,
   GET_SONGS,
   DELETE_SONG,
   TOGGLE_SONGS_LOADING,
   TOGGLE_SONG_LOADING
} from "./types";

import { setErrors, clearErrors } from "./errorActions";

export const uploadSong = (formData, history) => dispatch => {
	dispatch(toggleSongLoading());
	axios
		.post("/music/upload", formData)
		.then(res => {
			dispatch({
				type: UPLOAD_SONG,
				payload: res.data
			});
			dispatch(toggleSongLoading());
			history.push("/blog");
		})
		.catch(err => {
         	dispatch(setErrors(err.response.data));
         	dispatch(toggleSongLoading());
      	});
}

export const getSongByID = id => dispatch => {
	dispatch(toggleSongLoading());
	axios
		.get(`/music/${id}`)
		.then(res => {
         	dispatch({
            	type: GET_SONG,
            	payload: res.data
         	});
         	dispatch(clearErrors());
        	 dispatch(toggleSongLoading());
      	})

      	.catch(err => {
         	dispatch(setErrors(err.response.data));
         	dispatch(toggleSongLoading());
      	});
}

export const getSongs = () => dispatch => {
   dispatch(toggleSongsLoading());
   axios
      .get(`/music/`)
      .then(res => {
         dispatch({
            type: GET_SONGS,
            payload: res.data
         });
         dispatch(clearErrors());
         dispatch(toggleSongsLoading());
      })
      .catch(err => {
         dispatch(setErrors(err.response.data));
         dispatch(toggleSongsLoading());
      });
};

export const deleteSong = (id, history) => dispatch => {
   dispatch(toggleSongLoading());
   axios
      .delete(`/music/${id}`)
      .then(res => {
         dispatch({
            type: DELETE_SONG,
            payload: id
         });
         dispatch(toggleSongLoading());
         history.push("/blog");
      })
      .catch(err => {
         dispatch(setErrors(err.response.data));
         dispatch(toggleSongLoading());
      });
};

export const toggleSongLoading = () => {
   return {
      type: TOGGLE_SONG_LOADING
   };
};

export const toggleSongsLoading = () => {
   return {
      type: TOGGLE_SONGS_LOADING
   };
};