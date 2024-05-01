// BlackScholesCalculator.js

const blackScholes = (stockPrice, strikePrice, timeToMaturity, volatility, riskFreeRate) => {
    const d1 = (Math.log(stockPrice / strikePrice) + (riskFreeRate + (volatility ** 2) / 2) * timeToMaturity) / (volatility * Math.sqrt(timeToMaturity));
    const d2 = d1 - volatility * Math.sqrt(timeToMaturity);
    
    const phi = x => (1 + Math.sign(x)) / 2;
    const N = x => (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);

    const optionPrice = phi(d1) * stockPrice - phi(d2) * strikePrice * Math.exp(-riskFreeRate * timeToMaturity);
    return optionPrice.toFixed(2);
};

export default blackScholes;
