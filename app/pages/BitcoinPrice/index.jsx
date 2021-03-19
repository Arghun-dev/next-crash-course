import Head from 'next/head'
import Price from '../../components/Price'

export default function BitcoinPrice({ data }) {
  return (
    <div>
      <Head>
        <title>BitPrice</title>
      </Head>
      <h1>BitcoinPrice</h1>
      <Price 
        code={data.bpi.EUR.code} 
        rate={data.bpi.EUR.rate} 
        description={data.bpi.EUR.description}     
      />
      <Price 
        code={data.bpi.GBP.code} 
        rate={data.bpi.GBP.rate} 
        description={data.bpi.GBP.description}   
      />
      <Price 
        code={data.bpi.USD.code} 
        rate={data.bpi.USD.rate} 
        description={data.bpi.USD.description} 
      />
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