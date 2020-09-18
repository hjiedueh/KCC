import React, {useLayoutEffect} from 'react'
import useMusicPlayer from './usemusicplayer';

const Volume = () => {
	let volPoint
	const {currentVol, calcClickedVol} = useMusicPlayer()

	useLayoutEffect(() => {
		volPoint = document.getElementById('vol-point')
		volPoint.style.left = currentVol*100+"%"
	})

	

	return (
			<div className="vol-container" id="vol-container" onClick={calcClickedVol}>
				<div className="vol-point" id="vol-point"></div>
				<div className="cur-vol" id="cur-vol"></div>
			</div>
	)
}

export default(Volume)
