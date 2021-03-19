import style from '../styles/Price.module.scss'

export default function Price(props) {
  return (
    <div className={style.price}>
      <span className={style.price_code}>{props.code}:</span>
      <span className={style.price_rate}>{props.rate}</span>
      <span className={style.price_description}>{props.description}</span>
    </div>
  )
}