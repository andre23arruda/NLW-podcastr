import { useEffect } from "react"


export default function Home(props) {
  console.log(props.episodes)

  //// SPA
  // useEffect(() => {
  //   fetch('http://localhost:3333/episodes')
  //    .then(response => response.json())
  //    .then(data => console.log(data))
  // }, [])

  return (
    <div>
      Index

    </div>
  )
}

//// SSR
// export async function getServerSideProps() {
//   const response = await fetch('http://localhost:3333/episodes')
//   const data = await response.json()

//   return {
//     props: {
//       episodes: data
//     }
//   }
// }

//// SSG
export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data
    },
    revalidate: 60 * 60 * 8
  }
}
