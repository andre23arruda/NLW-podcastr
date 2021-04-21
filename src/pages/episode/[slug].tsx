// import '../styles/global.scss'
import { useRouter } from 'next/router'

function Episode() {
    const router = useRouter()
    console.log(useRouter)
  	return (
		<div>
            { router.query.slug }

		</div>
	)
}

export default Episode
