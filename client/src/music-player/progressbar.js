import React, {useEffect} from 'react'
import useMusicPlayer from './usemusicplayer';

const ProgressBar = (props) => {
	const {progressBarWidth, calcClickedTime} = useMusicPlayer()
	// console.log(progressBarWidth)

	useEffect(() => {
		document.getElementById('point').style.left = progressBarWidth
		document.getElementById('progress').style.width = progressBarWidth
	})

	return (
		<div>
			<div className='prog-back' id='prog-back' onClick={calcClickedTime}>
				<div className='point' id='point' onMouseUp={calcClickedTime}>
				</div>
				<div className='progress' id='progress'>
				</div>
			</div>
		</div>
	)
}

export default ProgressBar