import Image from 'next/image'
import { useContext, useEffect, useRef, useState } from 'react'
import { PlayerContext } from '../../contexts/PlayerContext'
import styles from './styles.module.scss'
import Slider from 'rc-slider'

import 'rc-slider/assets/index.css'
import { convertDurationToStimeString } from '../../utils/convert-data'


function Player() {

    const audioRef = useRef<HTMLAudioElement>(null)
    const [progress, setProgress] = useState(0)

    function progressListener() {
        audioRef.current.currentTime = 0
        audioRef.current.addEventListener('timeupdate', () => {
            setProgress(Math.floor(audioRef.current.currentTime))
        })
    }

    function changeAudioSlider(newProgress: number) {
        audioRef.current.currentTime = newProgress
        setProgress(newProgress)
    }

    const {
        episodes,
        currentEpisodeIndex,
        isPlaying,
        isLooping,
        isShuffled,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        changeState,
        playNext,
        playBefore
    } = useContext(PlayerContext)

    const episode = episodes[currentEpisodeIndex]

    useEffect( () => {
        if (!audioRef.current) return
        else if (isPlaying) audioRef.current.play()
        else audioRef.current.pause()
    }, [isPlaying] )


    return (
        <div className={ styles.playerContainer }>
            <header>
                <img src="/playing.svg" alt="Tocando agora"/>
                <strong>Tocando agora { episode?.title }</strong>
            </header>

            { episode
                ?(
                    <div className={ styles.currentEpisode }>
                        <Image width={ 592 } height={ 592 } src={ episode.thumbnail } alt={ episode.title } objectFit="cover"></Image>
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
                    <span>{ convertDurationToStimeString(progress) }</span>

                    { episode
                        ?(
                            <Slider
                                max={ episode.durationRaw }
                                value={ progress }
                                onChange={ changeAudioSlider }
                            >
                            </Slider>
                        )
                        :(
                            <div className={ styles.slider }>
                                <div className={ styles.emptySlider }></div>
                            </div>
                        )
                    }

                    { episode &&
                        <audio
                            ref={ audioRef }
                            src={ episode.url }
                            autoPlay
                            loop={ isLooping }
                            onPlay={ () => changeState(true) }
                            onPause={ () => changeState(false) }
                            onLoadedMetadata={ progressListener }
                            onEnded={ playNext }
                        />
                    }

                    <span>{ episode?.duration ?? '00:00'}</span>

                </div>

                <div className={ styles.buttons }>
                    <button onClick={ toggleShuffle } disabled={ !episode || episodes.length == 1 } className={ (isShuffled && episodes.length != 1)  &&  styles.isActive }>
                        <img src="/shuffle.svg" alt="Random"/>
                    </button>
                    <button onClick={ playBefore } disabled={ !episode || currentEpisodeIndex == 0 }>
                        <img src="/play-previous.svg" alt="Back"/>
                    </button>
                    <button onClick={ togglePlay } className={ styles.playButton } disabled={ !episode }>
                        { !isPlaying
                            ?(
                                <img src="/play.svg" alt="Play"/>
                            )
                            :(
                                <img src="/pause.svg" alt="Play"/>
                            )
                        }
                    </button>
                    <button onClick={ playNext } disabled={ !episode || currentEpisodeIndex == episodes.length - 1  }>
                        <img src="/play-next.svg" alt="Next"/>
                    </button>
                    <button onClick={ toggleLoop } disabled={ !episode } className={ isLooping && styles.isActive }>
                        <img src="/repeat.svg" alt="Repeat"/>
                    </button>
                </div>

            </footer>
        </div>
    )
}

export default Player
