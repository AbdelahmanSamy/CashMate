export const formatStockData = (stockData) => {
    const formattedData = [];

    if (stockData['Weekly Adjusted Time Series']) {
        Object.keys(stockData['Weekly Adjusted Time Series']).forEach((key) => {
            const value = stockData['Weekly Adjusted Time Series'][key];
            formattedData.push({
                x: key,
                y: [
                    value['1. open'] ?? 0, 
                    value['2. high'] ?? 0,
                    value['3. low'] ?? 0,
                    value['4. close'] ?? 0,
                ]
            });
        });
    }

    return formattedData;
};
