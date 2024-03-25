import './index.css'

const MoneyDetails = ({values}) => {
  const {testidval, clsNme, text, amount, srcVal, altval} = values

  return (
    <li className={clsNme}>
      <img src={srcVal} alt={altval} />
      <div>
        <p>{text}</p>
        <p data-testid={testidval}>Rs {amount}</p>
      </div>
    </li>
  )
}
export default MoneyDetails
