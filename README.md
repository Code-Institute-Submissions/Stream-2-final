# Stream 2 Final Project

## School Donations dashboard
 
## Overview
 
This is an Python Website Website using the Flask Micro Framework
## The Website is Deployed Using Heroku
-[http://dry-wildwood-54859.herokuapp.com/] (http://dry-wildwood-54859.herokuapp.com/)

##Overview
Data has been taken from DonorsChoose.org, a US based nonprofit organization that allows individuals to donate money directly to public school classroom projects.  The data has been presented using a Number of JavaScript libraries including D3.js and DC.js.

 
### Some the tech used includes:
- [Bootstrap](http://getbootstrap.com/)
    - We use **Bootstrap** to give our project a simple, responsive layout
- [Python] (https://www.python.org/) A powerful and fast Object Oriented Programming Language
- [Python Flask] (http://flask.pocoo.org/) A Micro Framework for Python.
- [MongoDB](https://www.mongodb.com/) A NoSQL Database Technology used for building modern applications.
- [D3.js](https://d3js.org/) A JavaScript library for manipulating documents based on data. D3 helps you bring data to life using HTML, SVG, and CSS
- [DC.js](https://dc-js.github.io/dc.js/) is a javascript charting library with native crossfilter support, allowing highly efficient exploration on large multi-dimensional datasets. It leverages d3 to render charts in CSS-friendly SVG format.
- [Crossfilter.js](http://square.github.io/crossfilter/) Crossfilter is a JavaScript library for exploring large multivariate datasets in the browser.
- [Queue.js](https://github.com/d3/d3-queue) A JavaScript library for running asynchronous tasks with configurable concurrency.
- [Keen.js](https://github.com/keen/dashboards) Responsive dashboard templates for Bootstrap
- [Intro.js](http://introjs.com/) A JavaScript library that gives new feature introduction and step-by-step users guide for your website and project.

##Pages in Detail

#Home Page
(http://dry-wildwood-54859.herokuapp.com/) Is a straight forward HTML5 Bootstrap page which summarises the projects and provides links.  The home page also features a Map of the USA, when you mouse-over a state, it highlights the number of donations to DonorsChoose.org from that state  .

#About Location Page
(https://arnold-j83.github.io/Stream-1-final/#/about) Provides more information about the Apartment and surrounding area.  This page features a JQuery Carousel displaying revolving pictures of the the Apartment and surrounding area.  This page also features an Angular Directive makeMap, whcih call the Google Map API for maps of key pouints of interest within the area.

#Activities in the Area
(https://arnold-j83.github.io/Stream-1-final/#/activities) Features information about activities for visitorsd to the area.

#Prices
(https://arnold-j83.github.io/Stream-1-final/#/prices) Has Apartment Prices information.  It features a priceTable4 directive that takes price information from a price.json file and renders as a HTML table.

#Availability
(https://arnold-j83.github.io/Stream-1-final/#/availability) Shows a calendar view of the Apartment availability using the FullCalendar JavaScript Library (https://fullcalendar.io/).  This page also features an Angular.js form to make enquiries.   This form appears in a modal window, and includes angular validation.  This form also uses the Google Maps API to create an array of dates when the Apartment is booked.  The form will check that the Apartment is Available for the dates that the user is enquiring about.  If the Apartment is Booked on any of the enquiry dates, then a message is returned top the user.  If the dates are available, and all other form element are valid, then the form will submit to A Python-Django Rest API (http://arnoldj-rest.herokuapp.com/enqs/)

#Weather 
(https://arnold-j83.github.io/Stream-1-final/#/weather) Displays a D3.js chart of average temperatures for the region.  This page was also intended to feature realtime weather forcasts from an API, however, the API was http and not https causing mixed content errors.

## Contributing
 
### Getting the code up and running
1. Firstly you will need to clone this repository by running the ```git clone <project's Github URL>``` command
2. After you've that you'll need to make sure that you have **npm** and **bower** installed
  1. You can get **npm** by installing Node from [here](https://nodejs.org/en/)
  2. Once you've done this you'll need to run the following command:
     `npm install -g bower # this may require sudo on Mac/Linux`
3. Once **npm** and **bower** are installed, you'll need to install all of the dependencies in *package.json* and *bower.json*
  ```
  npm install
 
  bower install
  ```
4. After those dependencies have been installed you'll need to make sure that you have **http-server** installed. You can install this by running the following: ```npm install -g http-server # this also may require sudo on Mac/Linux```
5. Once **http-server** is installed run ```http-server```
6. The project will now run on [localhost](http://127.0.0.1:8080)
7. Make changes to the code and if you think it belongs in here then just submit a pull request