export default class Currency {
    getCurrentExchangeRate(amount: number): number {
        const rate = {
            'USD': 1,
            'NRA': 500
        }
        const value = (rate.USD * amount) / rate.NRA
        return value;
    }

    buyUSD(amountInNaira: number) {
        const exchangeRate = this.getCurrentExchangeRate(amountInNaira);

        return exchangeRate;
    }
}


