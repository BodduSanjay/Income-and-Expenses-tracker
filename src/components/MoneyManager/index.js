import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    balance: 0,
    income: 0,
    expenses: 0,
    title: '',
    amount: 0,
    type: '',
    transactionItemsList: [],
  }

  addItem = event => {
    event.preventDefault()
    const {title, type, amount} = this.state
    const parsedAmount = parseFloat(amount)

    if (title.trim() !== '' && parsedAmount !== 0 && type.trim() !== '') {
      const newItem = {
        id: uuidv4(),
        title,
        amount: parsedAmount,
        type,
      }

      this.setState(prevState => ({
        transactionItemsList: [...prevState.transactionItemsList, newItem],
        balance:
          type === 'INCOME'
            ? prevState.balance + parsedAmount
            : prevState.balance - parsedAmount,
        income:
          type === 'INCOME'
            ? prevState.income + parsedAmount
            : prevState.income,
        expenses:
          type === 'EXPENSES'
            ? prevState.expenses + parsedAmount
            : prevState.expenses,
        title: '',
        amount: 0,
        type: '',
      }))
    }
  }

  updateTitle = event => {
    this.setState({title: event.target.value})
  }

  updateAmount = event => {
    this.setState({amount: event.target.value})
  }

  updateType = event => {
    this.setState({type: event.target.value})
  }

  onDelete = id => {
    const {transactionItemsList} = this.state
    const newList = transactionItemsList.filter(each => each.id !== id)
    this.setState({transactionItemsList: newList})
  }

  render() {
    const {balance, income, expenses, transactionItemsList, type} = this.state

    const balanceVal = {
      testidval: 'balanceAmount',
      text: 'Your Balance',
      amount: balance,
      clsNme: 'balCls',
      srcVal:
        'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
      altval: 'balance',
    }

    const incomeVal = {
      testidval: 'incomeAmount',
      text: 'Your Income',
      amount: income,
      clsNme: 'incmCls',
      srcVal:
        'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
      altval: 'income',
    }

    const expensesVal = {
      testidval: 'expensesAmount',
      text: 'Your Expenses',
      amount: expenses,
      clsNme: 'expnsCls',
      srcVal:
        'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
      altval: 'expenses',
    }

    return (
      <div className="bg">
        <div className="bg-img">
          <h1>Hi, Sanjay</h1>
          <p>Welcome back to your Money Manager</p>
        </div>
        <ul className="ulList">
          <MoneyDetails values={balanceVal} />
          <MoneyDetails values={incomeVal} />
          <MoneyDetails values={expensesVal} />
        </ul>
        <div className="down-cont">
          <form>
            <h1>Add Transaction</h1>
            <label htmlFor="title">TITLE</label>
            <input
              type="text"
              placeholder="TITLE"
              id="title"
              onChange={this.updateTitle}
            />

            <label htmlFor="amount">AMOUNT</label>
            <input
              type="text"
              placeholder="AMOUNT"
              id="amount"
              onChange={this.updateAmount}
            />

            <label htmlFor="mySelect">TYPE</label>
            <select
              className="selector"
              id="mySelect"
              onChange={this.updateType}
              value={type}
            >
              {transactionTypeOptions.map(option => (
                <option
                  className="options"
                  key={option.optionId}
                  value={option.optionId}
                >
                  {option.displayText}
                </option>
              ))}
            </select>

            <button type="submit" onClick={this.addItem}>
              Add
            </button>
          </form>
          <div className="History-cont">
            <h1>History</h1>
            <div className="titleCont">
              <p className="title">Title</p>
              <p className="title">Amount</p>
              <p className="title">Type</p>
            </div>
            <div className="itemscont">
              {transactionItemsList.map(each => (
                <TransactionItem
                  each={each}
                  key={each.id}
                  onDelete={this.onDelete}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
