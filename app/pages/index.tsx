import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home({ articles }) {
  console.log('articles', articles)
  return (
    <div className={styles.container}>
      <Head>
        <title>WebDev News</title>
        <meta name="keywords" content="web development, programming" />
      </Head>
      <h1>Weolcome to Next</h1>
      {articles.map(article => <h3>{article.title}</h3>)}
    </div>
  )
}

export const getStaticProps = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6`)
  const articles = await res.json()

  return {
    props: {
      articles
    }
  }
}
