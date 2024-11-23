// Replace with your actual API key from Finnhub
const API_KEY = "ct0reqpr01qkfpo5se2gct0reqpr01qkfpo5se30"; // Your API key goes here

const nifty50Stocks = ['TCS.NS', 'RELIANCE.NS', 'INFY.NS', 'HDFCBANK.NS', 'ICICIBANK.NS', 'SBIN.NS', 'HDFC.NS', 'KOTAKBANK.NS', 'LT.NS', 'ITC.NS', 'HCLTECH.NS', 'BHARTIARTL.NS', 'MARUTI.NS', 'ASIANPAINT.NS', 'ULTRACEMCO.NS', 'AXISBANK.NS', 'M&M.NS', 'NESTLEIND.NS', 'BAJFINANCE.NS', 'POWERGRID.NS'];
const bankniftyStocks = ['HDFCBANK.NS', 'ICICIBANK.NS', 'SBIN.NS', 'KOTAKBANK.NS', 'AXISBANK.NS', 'INDUSINDBK.NS', 'BANDHANBNK.NS', 'YESBANK.NS', 'FEDERALBNK.NS', 'RBLBANK.NS'];
const indexes = ['^NSEI', '^BSESN']; // Nifty and Sensex indexes

// Function to fetch stock data from Finnhub API
async function getStockData(symbol) {
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Failed to fetch data for ${symbol}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

// Function to display stock data
async function displayStockData() {
    const nifty50Div = document.getElementById("nifty50");
    const bankniftyDiv = document.getElementById("banknifty");
    const indexesDiv = document.getElementById("indexes");

    // Display Nifty 50 Stocks
    let nifty50HTML = '<h3>Stock Data</h3>';
    for (let stock of nifty50Stocks) {
        const data = await getStockData(stock);
        if (data) {
            nifty50HTML += `
                <div>
                    <strong>${stock}</strong>: ₹${data.c} <br>
                    Open: ₹${data.o} | High: ₹${data.h} | Low: ₹${data.l} | Previous Close: ₹${data.pc}
                </div><br>
            `;
        }
    }
    nifty50Div.innerHTML = nifty50HTML;

    // Display Bank Nifty Stocks
    let bankniftyHTML = '<h3>Stock Data</h3>';
    for (let stock of bankniftyStocks) {
        const data = await getStockData(stock);
        if (data) {
            bankniftyHTML += `
                <div>
                    <strong>${stock}</strong>: ₹${data.c} <br>
                    Open: ₹${data.o} | High: ₹${data.h} | Low: ₹${data.l} | Previous Close: ₹${data.pc}
                </div><br>
            `;
        }
    }
    bankniftyDiv.innerHTML = bankniftyHTML;

    // Display Major Indexes (Sensex & Nifty)
    let indexesHTML = '';
    for (let index of indexes) {
        const data = await getStockData(index);
        if (data) {
            indexesHTML += `
                <div>
                    <strong>${index}</strong>: ₹${data.c} <br>
                    Open: ₹${data.o} | High: ₹${data.h} | Low: ₹${data.l} | Previous Close: ₹${data.pc}
                </div><br>
            `;
        }
    }
    indexesDiv.innerHTML = indexesHTML;
}

// Call the function to display data
displayStockData();
