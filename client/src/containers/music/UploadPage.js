import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { uploadSong } from "../../actions/songActions";
import { clearErrors } from "../../actions/errorActions";
import Validate from "../../components/form/validate";
import UploadSong from "../../components/song/uploadSong";

const UploadPage = ({ uploadSong, errors, clearErrors, history, loading }) => {
	const [song, setSong] = useState({
		title: "",
		artist: "",
		file: "",
		errors: {}
	})

	useEffect(() => {
      setSong(song => {
         return { ...song, errors };
      });
   }, [errors]);

	const handleChange = e => {
		setSong({
			...song,
			[e.target.name]: e.target.value
		})
	}

	const handleBlur = e => {
    	const { name, value } = e.target;
      	const err = { ...song.errors, ...Validate(name, value).errors };
      	setSong({ ...song, errors: { ...err } });
   	};

   	const handleSubmit = e => {
      	e.preventDefault();
      	const { title, artist, file } = song;
      	uploadSong({ title, artist, file }, history);
   	};

   	return (
   		<UploadSong
   			loading={loading}
   			song={song}
   			onChange={handleChange}
   			onBlur={handleBlur}
   			onSubmit={handleSubmit}
   		/>
   	);
};

const mapStateToProps = state => ({
   loading: state.song.songLoading,
   errors: state.errors
});

UploadPage.propTypes = {
   uploadSong: PropTypes.func.isRequired,
   errors: PropTypes.object.isRequired,
   loading: PropTypes.bool.isRequired
};

export default connect(
   mapStateToProps,
   { uploadSong }
)(UploadPage);