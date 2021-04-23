import { createContext, ReactNode, useState } from "react"

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
                isPlaying,
                togglePlay,
                changeState
            }}
        >
            { props.children }
        </PlayerContext.Provider>
    )
}