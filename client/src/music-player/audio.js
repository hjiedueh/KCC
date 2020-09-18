import React from 'react'
import useMusicPlayer from './usemusicplayer';

const Audio = () => {

	const {currentTrackIndex, trackList} = useMusicPlayer()

	return (
		<div>
			<audio id="audioPlayer" preload="metadata">
				<source src={trackList[currentTrackIndex].file} type="audio/ogg" />
			</audio>
		</div>
	)
}

export default Audio