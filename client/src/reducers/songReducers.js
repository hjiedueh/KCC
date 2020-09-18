import {
   UPLOAD_SONG,
   GET_SONG,
   GET_SONGS,
   DELETE_SONG,
   TOGGLE_SONGS_LOADING,
   TOGGLE_SONG_LOADING
} from "../actions/types";

const initialState = {
   song: {},
   songs: [],
   songLoading: false,
   songsLoading: false
};

export default function(state = initialState, action) {
   switch (action.type) {
      case UPLOAD_SONG:
         return {
            ...state,
            song: [...state.song, action.payload]
         };
      case GET_SONGS:
         return {
            ...state,
            song: {},
            songs: [...action.payload]
         };
      case GET_SONG:
         return {
            ...state,
            song: { ...action.payload[0] }
         };
      case DELETE_SONG:
         return {
            ...state,
            songs: state.songs.filter(song => song._id !== action.payload)
         };
      case TOGGLE_SONG_LOADING:
         return {
            ...state,
            songLoading: !state.songLoading
         };
      case TOGGLE_SONGS_LOADING:
         return {
            ...state,
            songsLoading: !state.songsLoading
         };
      default:
         return state;
   }
}