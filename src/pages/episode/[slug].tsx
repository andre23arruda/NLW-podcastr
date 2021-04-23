import { GetStaticProps, GetStaticPaths } from 'next'
import { convertDateString, convertDurationToStimeString } from '../../utils/convert-data'
import Link from 'next/link'

import styles from './styles.module.scss'
import Image from 'next/image'


type Episode = {
    id: string,
    title: string,
    members: string,
    publishedAt: string,
    thumbnail: string,
    description: string,
    duration: string,
    url: string,
}

type EpisodeProps = {
    episode: Episode,
}

function Episode({ episode }: EpisodeProps) {
  	return (
		<div className={ styles.episode }>
            <div className={ styles.thumbnailContainer }>
                <Link href="/">
                    <button>
                        <img src="/arrow-left.svg" alt="Back"/>
                    </button>
                </Link>
                <Image width={ 700 } height={ 160 } src={ episode.thumbnail } alt={ episode.title } objectFit="cover"/>
                <button>
                    <img src="/play.svg" alt="Play episode"/>
                </button>
            </div>

            <header>
                <h1>{ episode.title }</h1>
                <span>{ episode.members }</span>
                <span>{ episode.publishedAt }</span>
                <span>{ episode.duration }</span>
            </header>

            <div
                className={ styles.description } dangerouslySetInnerHTML={{ __html: episode.description }}
            />
		</div>
	)
}

export default Episode

export const getStaticPaths: GetStaticPaths = async () => {
    const urlApi = 'http://localhost:3333/episodes?_limit=2&_sort=published_at&_order=desc'
	const response = await fetch(urlApi)
	const data = await response.json()
    const paths = data.map(episode => {
        return {
            params: {
                slug: episode.id,
            }
        }
    })

    return {
        paths: paths,
        fallback: 'blocking'
    }
}


// Consulta API
export const getStaticProps: GetStaticProps = async (ctx)  => {
    const urlApi = `http://localhost:3333/episodes/${ ctx.params.slug }`
    const response = await fetch(urlApi)
    const episode = await response.json()

    const currentEpisode = {
        id: episode.id,
        title: episode.title,
        thumbnail: episode.thumbnail,
        members: episode.members,
        description: episode.description,
        url: episode.file.url,
        publishedAt: convertDateString(episode.published_at),
        duration: convertDurationToStimeString(episode.file.duration),
    }

    return {
      props: {
        episode: currentEpisode,
      },
      revalidate: 60 * 60 * 8
    }
  }
