## blpapi-react
A web application that demonstrates [Bloomberg's API](http://www.bloomberglabs.com/api/) by sending HTTP requests and visualizing the returned data. <br>
It was built with React, Flux, and Node.js.

### Demonstration
Running this requires a subscription to the Bloomberg Terminal. If you don't have one, you're not out of luck! <br>
Click the image below to check out the demo, cheesy tunes included.

[![Click here for a demo and some rad tunes!](http://i.imgur.com/ZyRjuwA.png)](https://youtu.be/1Znd8vi5oVc)

### Nifty Features
* **Request History:** Click that history button, and get a list of all of the requests you've sent. The application caches *every* request you make, so you can check out how the data changes over time!
* **Raw Request Toggling:** Hit up that checkbox to toggle between an "assisted" request and a raw request. POST body and all!
* **Cool Tabs:** Tap those rad red tabs to toggle between seeing the POST body, the raw response, a prettyfied response, and the response data itself!
* **Charts Galore:** The charts used to vizualize historical data requests can take a lot of data, so add as many securities, fields, and dates as you'd like!

# DEPRECATION

`2019-10-23` For those not in the know and have stumbled onto this repository, Bloomberg has restricted access to blpapi from within browsers. Only way to get this to work is within a machine with Bloomberg installed. See [here](https://stackoverflow.com/questions/44405827/accessing-bloomberg-api-from-clients-browser-in-javascript) and [here](https://stackoverflow.com/questions/9097382/bloomberg-open-api) for more information.
