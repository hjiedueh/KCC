import React from 'react';
import { MusicPlayerProvider } from './musicplayercontext';
import Audio from './audio'
import Controls from './controls'

const SongPlayer = () => {
	return(
		<MusicPlayerProvider>
			<Audio/>
			<Controls/>
		</MusicPlayerProvider>
	)
}

export default(SongPlayer)