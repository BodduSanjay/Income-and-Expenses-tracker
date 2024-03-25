import './index.css'

const TransactionItem = ({each, onDelete}) => {
  const {id, title, amount, type} = each

  const handleDelete = () => {
    onDelete(id)
  }

  return (
    <li>
      <p className="fonts">{title}</p>
      <p className="fonts">Rs {amount}</p>
      <p className="fonts">{type}</p>
      <button data-testid="delete" type="button" onClick={handleDelete}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/money-manager-bg.png"
          alt="delete"
          onClick={handleDelete}
        />
      </button>
    </li>
  )
}

export default TransactionItem
