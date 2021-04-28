import PropTypes from 'prop-types';
import { applyExchangeRate } from '../../constants/currency';
import './ListView.css'

const ListView = props => {
  const { selectedCurrency, transactions } = props;

  return (
    <div className="list-view">
      <div className="list-view__header">
        <div className="list-view__row">
          <div className="list-view__col">Date</div>
          <div className="list-view__col">User</div>
          <div className="list-view__col">Amount ({selectedCurrency})</div>
          <div className="list-view__col">Merchant</div>
        </div>
      </div>
      <div className="list-view__body">
        {transactions.map(transaction => (
          <div className="list-view__row" key={transaction.id}>
            <div className="list-view__col">{transaction.date}</div>
            <div className="list-view__col">{transaction.userName}</div>
            <div className="list-view__col">{applyExchangeRate(transaction.amountInUSDCents, selectedCurrency)}</div>
            <div className="list-view__col">{transaction.merchantName}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

ListView.propTypes = {
  selectedCurrency: PropTypes.string,
  transactions: PropTypes.array
}

export default ListView;