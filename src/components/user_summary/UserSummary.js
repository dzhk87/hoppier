import PropTypes from "prop-types";
import { applyExchangeRate } from "../../utils/currency";
import "./UserSummary.css";

const UserSummary = (props) => {
  const { userInfo, selectedCurrency } = props;
  const subtotal = applyExchangeRate(userInfo.subtotal, selectedCurrency);

  return (
    <div className="user-summary">
      <div className="user-summary__name">{userInfo.userName}</div>
      <div className="user-summary__subtotal">Total spent({selectedCurrency}): {subtotal}</div>
    </div>
  );
};

UserSummary.propTypes = {
  userInfo: PropTypes.object,
  selectedCurrency: PropTypes.string,
};

export default UserSummary;
