import { useState } from 'react'
import style from '../styles/Price.module.scss'

export default function Price(props) {
  const [currency, setCurrency] = useState('USD')

  return (
    <div>
      <select 
        value={currency}
        onChange={e => setCurrency(e.target.value)}
      >
        <option value='USD'>USD</option>
        <option value='EUR'>EUR</option>
        <option value='GBP'>GBP</option>
      </select>
      <div className={style.price}>
        <span className={style.price_code}>
          {currency === 'USD' ? props.data.bpi.USD.code : 
            currency === 'EUR' ? props.data.bpi.EUR.code : 
              currency === 'GBP' ? props.data.bpi.GBP.code : null
          }
        </span>
        <span className={style.price_rate}>
          {currency === 'USD' ? props.data.bpi.USD.rate : 
            currency === 'EUR' ? props.data.bpi.EUR.rate : 
              currency === 'GBP' ? props.data.bpi.GBP.rate : null
          }
        </span>
        <span className={style.price_description}>
        {currency === 'USD' ? props.data.bpi.USD.description : 
          currency === 'EUR' ? props.data.bpi.EUR.description : 
            currency === 'GBP' ? props.data.bpi.GBP.description : null
        }
        </span>
      </div>
    </div>
  )
}