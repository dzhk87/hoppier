import PropTypes from 'prop-types';
import { useState } from 'react';
import { applyExchangeRate } from '../../constants/currency';
import UserSummary from '../user_summary/UserSummary';
import './ListView.css'

const ListView = props => {
  const { selectedCurrency, transactions, userSummary } = props;
  const [hoveredTransactionId, setHoveredTransactionId] = useState(null);

  const onUserNameMouseOver = transactionId => e => {
    if (transactionId !== hoveredTransactionId) {
      setHoveredTransactionId(transactionId);
    }
  }

  const onUserNameMouseOut = e => {
    // setHoveredTransactionId(null);
  }

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
        {transactions.map(transaction => {
          const userInfo = userSummary[transaction.cardId];
          const isHovered = hoveredTransactionId === transaction.id;
          return (
            <div className="list-view__row" key={transaction.id}>
              <div className="list-view__col">{transaction.date}</div>
              <div className="list-view__col" onMouseOver={onUserNameMouseOver(transaction.id)} onMouseOut={onUserNameMouseOut}>
                <div className="list-view__label" style={{textDecoration: isHovered ? 'underline' : 'none'}}>
                  {transaction.userName}
                  {isHovered && <UserSummary userInfo={userInfo} selectedCurrency={selectedCurrency} />}
                </div>
              </div>
              <div className="list-view__col">{applyExchangeRate(transaction.amountInUSDCents, selectedCurrency)}</div>
              <div className="list-view__col">{transaction.merchantName}</div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

ListView.propTypes = {
  selectedCurrency: PropTypes.string,
  transactions: PropTypes.array,
  userSummary: PropTypes.object
}

export default ListView;