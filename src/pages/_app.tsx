import '../styles/global.scss'
import styles from '../styles/app.module.scss'

import Header from '../components/Header/Header'
import Player from '../components/Player/Player'
import PlayerContext from '../contexts/PlayerContext'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {

	const [episodes, setEpisodes] = useState([])
	const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)

	function play(episode) {
		setEpisodes([episode])
		setCurrentEpisodeIndex(0)
	}

  	return (
		<PlayerContext.Provider value={{ episodes, currentEpisodeIndex, play }}>
			<div className={ styles.appWrapper }>
				<main>
					<Header></Header>
					<Component {...pageProps} />
				</main>
				<Player></Player>
			</div>
		</PlayerContext.Provider>
	)
}

export default MyApp
