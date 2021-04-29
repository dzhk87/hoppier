import { getMerchants, getTransactions, getUsers } from "../utils/GraphQLData"

export const init = async () => {
  let merchantMap, userMap, transactions;
  try {
    merchantMap = await getMerchants()
      .then(merchants => 
        merchants.reduce((acc, merchant) => {
          acc[merchant.networkId] = merchant;
          return acc;
        }, {}));
    userMap = await getUsers()
      .then(users => 
        users.reduce((acc, user) => {
          acc[user.cardId] = user;
          return acc;
        }, {}));
    transactions = await getTransactions();
  } catch(err) {
    return Promise.reject(err);
  }

  const data = transactions
    .sort((a, b) => {
      return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
    })
    .map((transaction, i) => {
      const merchant = merchantMap[transaction.merchantNetworkId];
      const user = userMap[transaction.cardId];

      return {
        id: transaction.id,
        date: transaction.date.toLocaleDateString() + ' ' + transaction.date.toLocaleTimeString(),
        cardId: transaction.cardId,
        userName: user.firstName,
        networkId: transaction.networkId,
        merchantName: merchant.name,
        amountInUSDCents: transaction.amountInUSDCents
      };
    });
  const userSummary = transactions.reduce((acc, transaction) => {
    if (acc[transaction.cardId]) {
      const userInfo = acc[transaction.cardId];
      userInfo.subtotal += transaction.amountInUSDCents;
      acc[transaction.cardId] = userInfo;
      return acc;
    } else {
      const user = userMap[transaction.cardId];
      acc[transaction.cardId] = {
        id: user.id,
        cardId: transaction.cardId,
        userName: user.firstName + ' ' + user.lastName,
        subtotal: transaction.amountInUSDCents
      };
    }
    return acc;
  }, {})

  return {
    data,
    userSummary
  };
}