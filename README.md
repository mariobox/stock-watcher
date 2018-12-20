# stock-watcher

A real time app to watch a portfolio of stocks.

Input a selection of stock symbols and the app will display them in neatly laid out cards:

<img src="https://66.media.tumblr.com/788cf73146ecde2f7988ed877ae89f96/tumblr_pk1soicW8C1qz7ur9o1_500.png" />

Information refreshes every 10 seconds.

Since each stock occupies half the screen (in medium to large viewports) you can use the app to compare two companies in the same industry at a time, like WMT and TGT, or AAL and LUV.

### How Does It Work

The app uses jQuery's getJSON method to get information from https://iextrading.com/ free API. The getJSON function is wrapped in a function that executes at once and then runs again every 10 seconds using the setTimout() function.

If the user doesn't input a selection of stock symbols the program will load the default portfolio which is hard coded in the stocks.js file. If you want to modify the default portfolio just edit the stocks.js file

### Customizing

If you want to track different KPI's you need to go to the iextrading API and find the endpoints that contains the information you want to track. In my case, the KPI's I have enabled by default: latest price, price change, p/e ratio, ytd change and market cap are all in either the Quote or the Key Stats endpoints. Just fork the repository and make the changes you want to make. 
