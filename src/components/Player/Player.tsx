import Image from 'next/image'
import { useContext } from 'react'
import PlayerContext from '../../contexts/PlayerContext'
import styles from './styles.module.scss'

function Player() {

    const { episodes, currentEpisodeIndex }  = useContext(PlayerContext)
    const episode = episodes[currentEpisodeIndex]

    return (
        <div className={ styles.playerContainer }>
            <header>
                <img src="/playing.svg" alt="Tocando agora"/>
                <strong>Tocando agora { episode?.title }</strong>
            </header>

            { episode
                ?(
                    <div className={ styles.currentEpisode }>
                        <Image width={ 592 } height={ 592 } src={ episode.thumbnail } alt={ episode.title } objectFit="initial"></Image>
                        <strong>{ episode.title }</strong>
                        <span>{ episode.members }</span>
                    </div>
                )
                :(
                    <div className={ styles.emptyPlayer }>
                        <strong>Selecione um podcast para ouvir</strong>
                    </div>
                )
            }


            <footer className={ !episode && styles.empty }>
                <div className={ styles.progress }>
                    <span>00:00</span>
                    <div className={ styles.slider }>
                        <div className={ styles.emptySlider }></div>
                    </div>
                    <span>00:00</span>

                </div>

                <div className={ styles.buttons }>
                    <button>
                        <img src="/shuffle.svg" alt="Random"/>
                    </button>
                    <button>
                        <img src="/play-previous.svg" alt="Back"/>
                    </button>
                    <button className={ styles.playButton }>
                        <img src="/play.svg" alt="Play"/>
                    </button>
                    <button>
                        <img src="/play-next.svg" alt="Next"/>
                    </button>
                    <button>
                        <img src="/repeat.svg" alt="Repeat"/>
                    </button>
                </div>

            </footer>
        </div>
    )
}

export default Player
