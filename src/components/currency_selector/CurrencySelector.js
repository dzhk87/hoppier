import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import "./CurrencySelector.css";

const CurrencySelector = (props) => {
  const { selectedCurrency, onCurrencySelect, currencyOptions } = props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = React.createRef();

  useEffect(() => {
    document.addEventListener("mousedown", onClickOutside);

    return () => document.removeEventListener("mousedown", onClickOutside);
  });

  const onButtonClick = (e) => {
    e.stopPropagation();

    setIsDropdownOpen(!isDropdownOpen);
  };

  const onOptionClick = (currency) => (e) => {
    e.stopPropagation();

    onCurrencySelect(currency);
    setIsDropdownOpen(false);
  };

  const onClickOutside = (e) => {
    e.stopPropagation();

    if (
      dropdownRef &&
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="currency-selector" ref={dropdownRef}>
      <button className="dropdown-button" onClick={onButtonClick}>
        {selectedCurrency}
      </button>
      {isDropdownOpen && (
        <div className="dropdown-wrapper">
          {currencyOptions.map((currency) => {
            return (
              <div
                className="dropdown-item"
                onClick={onOptionClick(currency)}
                key={currency}
              >
                {currency}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

CurrencySelector.propTypes = {
  selectedCurrency: PropTypes.string.isRequired,
  onCurrencySelect: PropTypes.func.isRequired,
  currencyOptions: PropTypes.array.isRequired,
};

export default CurrencySelector;
