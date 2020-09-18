import React, { useState } from 'react';
import desire from './songs/desire.mp3'
import Go from './songs/Go DJ.mp3'
import Mal from './songs/Mal days.mp3' 

const MusicPlayerContext = React.createContext([{}, () => {}]);

const MusicPlayerProvider = (props) => {
	const [state, setState] = useState({
		tracks: [
			{
				name: 'SC - desire',
				file: desire,
				duration: '04:13'
			},
			{
				name: 'Lil Wayne - Go DJ',
				file: Go,
				duration: '04:41'
			},
			{
				name: 'SC - Mal days',
				file: Mal,
				duration: '02:03'
			},
		],
		currentTrackIndex: 0,
  		isPlaying: false,
	});
	return(
		<MusicPlayerContext.Provider value={[state, setState]}>
			{props.children}
		</MusicPlayerContext.Provider>
	);
}

export { MusicPlayerContext, MusicPlayerProvider };