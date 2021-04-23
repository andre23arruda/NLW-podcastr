import { createContext, ReactNode, useContext, useState } from "react"

type Episode = {
    title: string,
    members: string,
    thumbnail: string,
    duration: string,
    url: string,
}

type PlayerContextProps = {
    episodes: Episode[],
    currentEpisodeIndex: number,
    play: (episode: Episode) => void,
    playList: (episodes: Episode[], episodeIndex: number) => void,
    playNext: () => void,
    playBefore: () => void,
    isPlaying: boolean,
    togglePlay: () => void,
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
        if (newEpisodeIndex >= episodes.length) {
            newEpisodeIndex = 0
        }
        setCurrentEpisodeIndex(newEpisodeIndex)
    }

    function playBefore() {
        let newEpisodeIndex = currentEpisodeIndex - 1
        if (newEpisodeIndex < 0) {
            newEpisodeIndex = episodes.length - 1
        }
        setCurrentEpisodeIndex(newEpisodeIndex)
    }

    function togglePlay() {
        setIsPlaying(!isPlaying)
    }

    function changeState(state) {
        setIsPlaying(state)
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
                togglePlay,
                changeState
            }}
        >
            { props.children }
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext)
}