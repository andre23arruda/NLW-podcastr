import { GetStaticProps } from 'next'
import Image  from 'next/image'
import { convertDateString, convertDurationToStimeString } from '../utils/convert-data'
import styles from '../styles/home.module.scss'

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
  latestEpisodes: Episode[],
  allEpisodes: Episode[],
}


export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {

  return (
    <div className={ styles.homePage }>
      <section className={ styles.latestEpisodes }>
        <h2>Últimos lançamentos</h2>
        <ul>
          {
            latestEpisodes.map(episode => {
              return (
                <li key={ episode.id }>
                  <Image width={ 192 } height={ 192 } src={ episode.thumbnail } alt={ episode.title } objectFit="cover"/>
                  <div className={ styles.episodeDetails }>
                    <a href={`/episode/${ episode.id }`}>{ episode.title }</a>
                    <p>{ episode.members }</p>
                    <span>{ episode.publishedAt }</span>
                    <span>{ episode.duration }</span>
                  </div>

                  <button>
                    <img src="/play-green.svg" alt="Play episode"/>
                  </button>

                </li>
              )
            })
          }


        </ul>
      </section>

      <section className={ styles.allEpisodes }>
        <h2>Todos os Episódios</h2>
        <table cellSpacing={ 0 }>
          <thead>
            <tr>
              <th> </th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {
              allEpisodes.map(episode => {
                return (
                  <tr key={ episode.id }>
                    <td className={ styles.episodeImage }>
                      <Image width={ 120 } height={ 120 } src={ episode.thumbnail } alt={ episode.title } objectFit="cover"/>
                    </td>
                    <td>
                      <a href={`/episode/${ episode.id }`}>{ episode.title }</a>
                    </td>
                    <td>{ episode.members }</td>
                    <td className={ styles.episodePublishedAt }>{ episode.publishedAt }</td>
                    <td>{ episode.duration }</td>
                    <td>
                      <button>
                        <img src="/play-green.svg" alt="Play episode"/>
                      </button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

      </section>

    </div>
  )
}

//// SSG
export const getStaticProps: GetStaticProps = async ()  => {
  const urlApi = 'http://localhost:3333/episodes?_limit=12&_sort=published_at&_order=desc'
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
      latestEpisodes: episodes.slice(0, 2),
      allEpisodes: episodes.slice(2,),
    },
    revalidate: 60 * 60 * 8
  }
}
