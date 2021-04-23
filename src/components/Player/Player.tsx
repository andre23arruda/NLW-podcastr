import { useContext } from 'react'
import PlayerContext from '../../contexts/PlayerContext'
import styles from './styles.module.scss'

function Player() {

    const playerContext = useContext(PlayerContext)

    return (
        <div className={ styles.playerContainer }>
            <header>
                <img src="/playing.svg" alt="Tocando agora"/>
                <strong>Tocando agora { playerContext }</strong>
            </header>

            <div className={ styles.emptyPlayer }>
                <strong>Selecione um podcast para ouvir</strong>
            </div>

            <footer className={ styles.empty }>
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
