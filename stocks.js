let html = '';

// define an initial default portfolio
const DEFAULT_PORTFOLIO='wmt,tgt,fcau,f,bac,c,aal,luv';

// create a constant for the stock symbols in the query, or the default portfolio if no query is entered
const PORTFOLIO = portfolioFromQueryParams() || DEFAULT_PORTFOLIO;


// pass that variable to the API URL
const url = `https://api.worldtradingdata.com/api/v1/stock?symbol=${PORTFOLIO}&api_token=onH6cZpUDVXChT9cbQ6jHuCkgoWPjCmBNRz0Sy5hs4icLbqds5ta1VF0pDpl`;

// start the AJAX request in pure JS
const Http = new XMLHttpRequest();

Http.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    const body = Http.responseText; // asign the response to the constant body
    const stockInfo = JSON.parse(body); // parse body to convert response to a JS object
  
    // the response object has a member called data, which is an array containing the info of every company whose stock symbol you requested
    // you can map over each member of the array (company) to get the info you want.
    stockInfo.data.map((company,i) => { 
      // first let's format the the info
      let formattedLatestPrice = '$' + parseFloat(company.price).toFixed(2);
      let formattedPE = (parseFloat(company.price)/parseFloat(company.eps)).toFixed(2);
      let formattedEPS = '$' + parseFloat(company.eps).toFixed(2);
      let formattedMarketCap = formatCap(company.market_cap);
     
      // build the containers where each stock info will be displayed
      html += 
       `<div class="col-sm-6">
          <div class="card text-left">
            <div class="card-body">
              <h5>${company.name} (${company.symbol})</h5>
                <ul>
                  <li>Latest Price: ${formattedLatestPrice}</li>
                  <li>EPS: ${formattedEPS}</li>
                  <li>P/E: ${formattedPE}</li>
                  <li>Market Cap: ${formattedMarketCap}</li>
                </ul>
            </div>
          </div>
        </div>`
      });

   // display the info in the designated location:
   document.getElementById('stockinfo').innerHTML = html;
  }
}

// finish the AJAX request
Http.open("GET", url);
Http.send();

// helper function to format numbers
function formatCap(marketCap) {
  if (marketCap === null) return '';
  let value, suffix;
  if (marketCap >= 1e12) {
    value = marketCap / 1e12;
    suffix = 'T';
  } else if (marketCap >= 1e9) {
    value = marketCap / 1e9;
    suffix = 'B';
  } else if (marketCap >= 1e6) {
    value = marketCap / 1e6;
    suffix = 'M';
  }
  else {
    value = marketCap / 1e3;
    suffix = 'K';
  }
  let digits = value < 10 ? 1 : 0;
  return '$' + value.toFixed(digits) + suffix;
}

// get the query parameters from the address bar and return the symbols
function portfolioFromQueryParams() {
  if (!window.location.search) return;
  let stocks = new URLSearchParams(window.location.search);
  return stocks.get('symbols');
}
