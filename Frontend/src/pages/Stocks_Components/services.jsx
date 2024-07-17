const API_KEY = 'QGZJVDAB2KNSR1L4';

export const fetchStockData = async (symbol) => {
    const response = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=${API_KEY}`);
    const data = await response.json();
    return data;
};
