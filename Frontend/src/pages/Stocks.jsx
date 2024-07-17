import React, { useEffect, useMemo, useState } from 'react';
import { fetchStockData } from './Stocks_Components/services';
import { formatStockData } from './Stocks_Components/utils';
import ReactApexChart from 'react-apexcharts';
import { candleStickOptions } from './Stocks_Components/constants';
import './Stocks_Components/Stocks.css';

const LiveChart = ({ symbols, defaultSymbol }) => {
  const [selectedSymbol, setSelectedSymbol] = useState(defaultSymbol);
  const [stockData, setStockData] = useState({});

  useEffect(() => {
    fetchStockData(selectedSymbol).then((data) => setStockData(data));
  }, [selectedSymbol]);

  const seriesData = useMemo(() => formatStockData(stockData), [stockData]);

  const handleSymbolChange = (newSymbol) => {
    setSelectedSymbol(newSymbol);
  };

  return (
    <div className="LiveChartContainer">
      <div className="SymbolSelect">
        <select
          className="LiveChartSelect"
          value={selectedSymbol}
          onChange={(e) => handleSymbolChange(e.target.value)}
        >
          {symbols.map((symbol) => (
            <option key={symbol} value={symbol}>
              {symbol}
            </option>
          ))}
        </select>
      </div>
      <ReactApexChart className="ReactApexChart" series={[{ data: seriesData }]} options={candleStickOptions} type="candlestick" />
    </div>
  );
};

export default LiveChart;
