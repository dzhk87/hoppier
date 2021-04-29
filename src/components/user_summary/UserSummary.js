import PropTypes from 'prop-types';
import { applyExchangeRate } from '../../constants/currency';
import './UserSummary.css';

const UserSummary = props => {
  const {userInfo, selectedCurrency} = props;

  return <div className="user-summary">
    <div className="user-summary__name">{userInfo.userName}</div>
    <div className="user-summary__subtotal">Total spent: {applyExchangeRate(userInfo.subtotal, selectedCurrency)}</div>
  </div>;
};

UserSummary.propTypes = {
  userInfo: PropTypes.object,
  selectedCurrency: PropTypes.string
}

export default UserSummary;