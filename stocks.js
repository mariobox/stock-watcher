'use strict'

// create function to load stock info cards
function refreshData() {

let html = '';
const DEFAULT_PORTFOLIO='wmt,tgt,fcau,f,bac,c,aal,luv';
const PORTFOLIO = portfolioFromQueryParams() || DEFAULT_PORTFOLIO;

$.getJSON(`https://api.iextrading.com/1.0/stock/market/batch?types=quote,stats&symbols=${PORTFOLIO}`, 
    function(data) {
    // convert object of objects into array of objects with jQuery map function so we can iterate over it
    var stockList = $.map(data, function(value, index) {
    return [value];
    });
    
    // go through each symbol in the array capturing the info that we want
    stockList.map((company,i) => { 
     
     // format as necessary
     let formattedLatestPrice = '$' + company.quote.latestPrice.toFixed(2);
     let formattedChangePercent = (company.quote.changePercent * 100).toFixed(2) + '%';
     let formattedYield = company.stats.dividendYield.toFixed(2) + '%';
     let formattedYtdChange = (company.quote.ytdChange * 100).toFixed(1) + '%';
     let formattedMarketCap = formatCap(company.stats.marketcap);
     
     // add colors to positive and negative changes
     let rgbColorChangePercent = company.quote.changePercent > 0 ? '0,255,0' : '255,0,0';
     let rgbColorYtdChange = company.quote.ytdChange > 0 ? '0,255,0' : '255,0,0';
     
     // build stock info container - using Bootstrap cards
     html += 
      `<div class="col-sm-6">
        <div class="card text-left">
          <div class="card-body">
            <h5>${company.quote.companyName} (
              <a href='https://iextrading.com/apps/stocks/${company.quote.symbol}' target='_blank'>${company.quote.symbol}</a>
              )
            </h5>
            <ul>
              <li>Latest Price: ${formattedLatestPrice} (
                <span style="color: rgb(${rgbColorChangePercent});">${formattedChangePercent}</span>
                )
              </li>
              <li>P/E Ratio: ${company.quote.peRatio}</li>
              <li>Dividend Yield: ${formattedYield}</li>
              <li>YTD Change: <span style="color: rgb(${rgbColorYtdChange});">${formattedYtdChange}</span></li>
              <li>Market Cap: ${formattedMarketCap}</li>
            </ul>
          </div>
        </div>
      </div>    
      `
      
      // display stock table in web page
      $('#stockinfo').html(html);
    });
    });
    // refresh the information every 10 seconds
    setTimeout(refreshData, 10000);
}

// call function that loads stock info cards
refreshData();
  

// format numbers into Trillions, Billions, Millions and Thousands - credits to https://github.com/toddwschneider/stocks for this function
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

// get symbols from url - credits to https://github.com/toddwschneider/stocks for this function
function portfolioFromQueryParams() {
  if (!window.location.search) return;
  let params = new URLSearchParams(window.location.search);
  for (let p of params) {
     return p[1].split(',').toString();
  }
}

