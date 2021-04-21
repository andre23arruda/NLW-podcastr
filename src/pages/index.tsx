import { GetStaticProps } from 'next'
import { convertDateString, convertDurationToStimeString } from '../utils/convert-data'

type Episode = {id: string,
  title: string,
  members: string,
  publishedAt: string,
  thumbnail: string,
  description: string,
  duration: string,
  url: string,
}

type HomeProps = {
  episodes: Episode[],
}


export default function Home(props: HomeProps) {
  console.log(props.episodes)

  return (
    <div>
      Index

    </div>
  )
}

//// SSG
export const getStaticProps: GetStaticProps = async ()  => {
  const urlApi = 'http://localhost:3333/episodes?_limit=12&_sort=published_at&order=desc'
  const response = await fetch(urlApi)
  const data = await response.json()

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: convertDateString(episode.published_at),
      duration: convertDurationToStimeString(episode.file.duration),
      description: episode.description,
      url: episode.file.url,
    }
  })

  return {
    props: {
      episodes: episodes,
    },
    revalidate: 60 * 60 * 8
  }
}
