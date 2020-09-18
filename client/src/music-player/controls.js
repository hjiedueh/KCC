import React, {useEffect} from "react"
import ProgressBar from './progressbar'
import Volume from './volume'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import { faForward } from '@fortawesome/free-solid-svg-icons'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import useMusicPlayer from './usemusicplayer'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

const Controls = () => {
	const{ isPlaying, currentTrackName, togglePlay, playPreviousTrack, playNextTrack, playTrack, toggleVol } = useMusicPlayer();

	return (
		<div className="song-player">
			<Container>
				<Row>
					<ProgressBar/>
				</Row>
				<Row className="controls">
					<div lg={6} className="song-info">
						{currentTrackName}
					</div>
					<div lg={6} className="player-controls">
						<FontAwesomeIcon icon={faBackward} className="player-icon" onClick={playPreviousTrack}/>
						<FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className="player-icon" onClick={togglePlay}/>
						<FontAwesomeIcon icon={faForward} className="player-icon" onClick={playNextTrack}/>
						<FontAwesomeIcon icon={faVolumeUp} className="player-icon volume" onClick={toggleVol}/>
						<Volume/>
					</div>
				</Row>
			</Container>
		</div>
	)
}

export default(Controls)