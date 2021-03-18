import Head from 'next/head'

export default function BitcoinPrice({ data }) {
  console.log('data', data)
  return (
    <div>
      <Head>
        <title>BitPrice</title>
      </Head>
      <h1>BitcoinPrice</h1>
      
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