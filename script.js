// Function to fetch stock data
async function getStockData(symbol) {
    const url = `https://yahoo-finance166.p.rapidapi.com/api/autocomplete?query=AA`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'cc3ad16d89msh981d9f09c7edc4cp146a5djsnb2494403', // Replace with your actual key
            'X-RapidAPI-Host': 'yahoo-finance166.p.rapidapi.com'
        }
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return data.quoteResponse.result[0];
}

// Function to display stock data
async function displayStockData() {
    const stocks = ['TCS.BO', 'RELIANCE.NS', 'INFY.NS'];
    const tickerDiv = document.getElementById("stock-ticker");

    let stockHTML = '<h3>Live Market Data:</h3>';
    for (let stock of stocks) {
        try {
            const data = await getStockData(stock);
            const livePrice = data.regularMarketPrice;
            const closePrice = data.regularMarketPreviousClose;
            stockHTML += `<p><strong>${data.longName}</strong>: ₹${livePrice.toFixed(2)} (Close: ₹${closePrice.toFixed(2)})</p>`;
        } catch (error) {
            stockHTML += `<p>Error fetching data for ${stock}</p>`;
        }
    }

    tickerDiv.innerHTML = stockHTML;
}

// Call the display function
displayStockData();
