import { getMerchants, getTransactions, getUsers } from "../utils/GraphQLData";

export const init = async () => {
  const merchants = await getMerchants();
  const users = await getUsers();
  const transactions = await getTransactions();

  const merchantMap = merchants.reduce((acc, merchant) => {
    acc[merchant.networkId] = merchant;
    return acc;
  }, {});
  const userMap = users.reduce((acc, user) => {
    acc[user.cardId] = user;
    return acc;
  }, {});
  const transactionRows = transactions
    .sort((a, b) => {
      return a.date > b.date ? -1 : a.date < b.date ? 1 : 0;
    })
    .map(({ id, date, cardId, merchantNetworkId, amountInUSDCents }) => {
      const merchant = merchantMap[merchantNetworkId];
      const user = userMap[cardId];

      return {
        id,
        date: date.toLocaleDateString() + " " + date.toLocaleTimeString(),
        cardId,
        userName: user.firstName,
        networkId: merchantNetworkId,
        merchantName: merchant.name,
        amountInUSDCents,
      };
    });
  const userSummary = transactions.reduce(
    (acc, { cardId, amountInUSDCents }) => {
      if (acc[cardId]) {
        const userInfo = acc[cardId];
        userInfo.subtotal += amountInUSDCents;
        acc[cardId] = userInfo;
        return acc;
      } else {
        const user = userMap[cardId];
        acc[cardId] = {
          id: user.id,
          cardId: cardId,
          userName: user.firstName + " " + user.lastName,
          subtotal: amountInUSDCents,
        };
      }
      return acc;
    },
    {}
  );

  return {
    transactionRows,
    userSummary,
  };
};
