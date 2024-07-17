export const candleStickOptions = {
    chart: {
        type: "candlestick",
    },
    title: {
        text: "Stocks Chart",
        align: "left",
        style: {
            color: "white"
        }
    },
    
    xaxis: {
        type: "datetime",
        labels: {
            style: {
                colors: "white"
            }
        }
    },
    yaxis: {
        tooltip: {
            enabled: true,
        },
        labels: {
            style: {
                colors: "white"
            }
        }
    },
};
