# stock-watcher

A real time app to watch a portfolio of stocks.

Input a stock symbol or a series of symbols separated by a comma and the app will display information in neatly laid out cards:

### How Does It Work

The app uses a plain JavaScript AJAX request to get stock information from the [World Trading Data](https://www.worldtradingdata.com/) API. It then parses the response as a JSON object and accesses the third element of the object, which is an array called "data" containing one object per stock symbol you requested.

The program loops over the data array using the map function, and assigns the information to variables.

We then apply some formatting to the variables so that they display properly (i.e. with the '$' or '%' symbols and with the proper number of decimals).

The page styling is done using Bootstrap's card class to display the info for each stock.

If the user doesn't input a selection of stock symbols the program will load the default portfolio which is hard coded in the stocks.js file. If you want to modify the default portfolio just edit the stocks.js file


