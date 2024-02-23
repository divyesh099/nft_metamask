export const formatBalance = (rawBalance) => {
    const etherBalanceInWei = parseFloat(rawBalance) / 1e18;
    const etherPriceInUsd = 2934.45; // Replace with actual exchange rate
    const usdBalance = etherBalanceInWei * etherPriceInUsd;
    return usdBalance.toFixed(2);
};

export const formatChainAsNum = (chainIdHex) => {
    const chainIdNum = parseInt(chainIdHex);
    return chainIdNum;
};
