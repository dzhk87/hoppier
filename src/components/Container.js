import { useEffect, useState } from "react";
import CurrencySelector from "./currency_selector/CurrencySelector";
import ListView from "./list_view/ListView";
import { init } from "./actions";
import { Currencies, USD } from "../constants/currency";
import "./Container.css";

const Container = () => {
  const [selectedCurrency, setSelectedCurrency] = useState(USD);
  const [transactions, setTransactions] = useState([]);
  const [userSummary, setUserSummary] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    (async () => {
      const { transactionRows, userSummary: summary } = await init();
      setTransactions(transactionRows);
      setIsInitialized(true);
      setUserSummary(summary);
    })();
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
          <ListView
            selectedCurrency={selectedCurrency}
            transactions={transactions}
            userSummary={userSummary}
          />
        )}
      </div>
    </div>
  );
};

export default Container;
