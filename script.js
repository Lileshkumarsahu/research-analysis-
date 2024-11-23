// Function to fetch stock data from Finnhub API
async function getStockData(symbol) {
    const url = `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=ct0reqpr01qkfpo5se2gct0reqpr01qkfpo5se30`; // Replace with your actual API key
    
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

// Function to display stock data
async function displayStockData() {
    const stocks = ['TCS.NS', 'RELIANCE.NS', 'INFY.NS']; // Example stock symbols
    const tickerDiv = document.getElementById("stock-ticker");

    let stockHTML = '<h3>Live Market Data:</h3>';
    for (let stock of stocks) {
        try {
            const data = await getStockData(stock);
            const livePrice = data.c; // Current price
            const openPrice = data.o; // Opening price
            const highPrice = data.h; // High price
            const lowPrice = data.l; // Low price

            stockHTML += `
                <div>
                    <strong>${stock}</strong>: 
                    Current Price: ₹${livePrice.toFixed(2)} <br>
                    Open: ₹${openPrice.toFixed(2)} | High: ₹${highPrice.toFixed(2)} | Low: ₹${lowPrice.toFixed(2)}
                </div><br>
            `;
        } catch (error) {
            stockHTML += `<p>Error fetching data for ${stock}</p>`;
        }
    }

    tickerDiv.innerHTML = stockHTML;
}

// Call the function to display stock data
displayStockData();
