import { useEffect, useState } from 'react';
import CurrencySelector from './currency_selector/CurrencySelector';
import ListView from './list_view/ListView';
import { init } from './actions';
import { Currencies, USD } from '../constants/currency';
import './Container.css';

const Container = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(USD);
  const [transactions, setTransactions] = useState([]);
  const [userSummary, setUserSummary] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    init().then(({data, userSummary}) => {
      setTransactions(data);
      setIsInitialized(true);
      setUserSummary(userSummary);
    })
  }, []);

  return (
    <div id="app-container">
      <div className="header">
        <div className="header__title">Transactions</div>
        <CurrencySelector
          selectedCurrency={selectedCurrency}
          onCurrencySelect={setSelectedCurrency}
          currencyOptions={Currencies}
        />
      </div>
      <div className="body">
        {!isInitialized && <div className="loading">Loading...</div>}
        {isInitialized && (
          <>
            <div className="body__left">
              <ListView selectedCurrency={selectedCurrency} transactions={transactions} userSummary={userSummary} />
            </div>
            <div className="body__right">
              
            </div>
          </>
        )}
      </div>
    </div>
  )
};

export default Container;