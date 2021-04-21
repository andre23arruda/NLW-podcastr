import { GetStaticProps } from 'next'

type Episode = {
  id: string,
  title: string,
  members: string,
  published_at: string,
  thumbnail: string,
  description: string,
  file: {
    url: string,
    type: string,
    duration: string,
  }
}

type HomeProps = {
  episodes: Episode[],
}


export default function Home(props: HomeProps) {
  // console.log(props.episodes)

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

  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 8
  }
}
