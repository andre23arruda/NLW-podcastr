import { createContext } from "react"


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
    isPlaying: boolean,
    togglePlay: () => void,
}


const PlayerContext = createContext({} as PlayerContextProps)

export default PlayerContext
