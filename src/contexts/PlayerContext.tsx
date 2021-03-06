import { createContext, ReactNode, useContext, useState } from "react"

type Episode = {
    title: string,
    members: string,
    thumbnail: string,
    duration: string,
    durationRaw: number,
    url: string,
}

type PlayerContextProps = {
    episodes: Episode[],
    currentEpisodeIndex: number,
    isPlaying: boolean,
    isLooping: boolean,
    isShuffled: boolean,
    play: (episode: Episode) => void,
    playList: (episodes: Episode[], episodeIndex: number) => void,
    playNext: () => void,
    playBefore: () => void,
    togglePlay: () => void,
    toggleLoop: () => void,
    toggleShuffle: () => void,
    changeState: (state: boolean) => void,
}

type PlayerContextProviderProps = {
    children: ReactNode
}


export const PlayerContext = createContext({} as PlayerContextProps)


export function PlayerContextProvider(props: PlayerContextProviderProps) {
    const [episodes, setEpisodes] = useState([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)
    const [isShuffled, setIsShuffled] = useState(false)

    function play(episode: Episode) {
        setEpisodes([episode])
        setCurrentEpisodeIndex(0)
        setIsPlaying(true)
    }

    function playList(episodes: Episode[], episodeIndex: number) {
        setEpisodes(episodes)
        setCurrentEpisodeIndex(episodeIndex)
        setIsPlaying(true)
    }

    function playNext() {
        let newEpisodeIndex = currentEpisodeIndex + 1

        if (isShuffled) {
            newEpisodeIndex = Math.floor(Math.random() * episodes.length)
        }

        if (newEpisodeIndex >= episodes.length) {
            // newEpisodeIndex = 0
            clearEpisodes()
        }
        setCurrentEpisodeIndex(newEpisodeIndex)
    }

    function playBefore() {
        let newEpisodeIndex = currentEpisodeIndex - 1

        if (isShuffled) {
            newEpisodeIndex = Math.floor(Math.random() * episodes.length)
        }

        if (newEpisodeIndex < 0) {
            // newEpisodeIndex = episodes.length - 1
            clearEpisodes()
        }
        setCurrentEpisodeIndex(newEpisodeIndex)
    }

    function togglePlay() {
        setIsPlaying(!isPlaying)
    }

    function toggleLoop() {
        setIsLooping(!isLooping)
        setIsShuffled(false)
    }

    function toggleShuffle() {
        setIsShuffled(!isShuffled)
        setIsLooping(false)
    }

    function changeState(state) {
        setIsPlaying(state)
    }

    function clearEpisodes() {
        setEpisodes([])
    }

    return (
        <PlayerContext.Provider
            value= {{
                episodes,
                currentEpisodeIndex,
                play,
                playList,
                playNext,
                playBefore,
                isPlaying,
                isLooping,
                isShuffled,
                togglePlay,
                changeState,
                toggleLoop,
                toggleShuffle,
            }}
        >
            { props.children }
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext)
}