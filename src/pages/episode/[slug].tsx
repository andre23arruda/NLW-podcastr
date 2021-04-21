// import '../styles/global.scss'
import { useRouter } from 'next/router'
import { GetStaticProps, GetStaticPaths } from 'next'

function Episode(props) {
    const router = useRouter()
  	return (
		<div>
            { router.query.slug }
		</div>
	)
}

export default Episode


// API
export const getStaticProps: GetStaticProps = async (context)  => {
    const urlApi = `http://localhost:3333/episodes/${ context.params.slug }`
    const response = await fetch(urlApi)
    const data = await response.json()

    return {
        props: {
            episode: data.data,
        },
        revalidate: 60 * 60 * 24
    }
}
