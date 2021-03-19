import Head from 'next/head'
import Price from '../../components/Price'

export default function BitcoinPrice({ data }) {
  return (
    <div>
      <Head>
        <title>BitPrice</title>
      </Head>
      <h1>BitcoinPrice</h1>
      <Price data={data} />
    </div>
  ) 
}

export async function getServerSideProps() {
  const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
  const data = await res.json()

  return {
    props: {
      data
    }
  }
}