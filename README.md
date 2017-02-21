# Stream 2 Final Project

## School Donations dashboard
 
## Overview
 
This is an Python Website Website using the Flask Micro Framework
## The Website is Deployed Using Heroku
-[http://dry-wildwood-54859.herokuapp.com/] (http://dry-wildwood-54859.herokuapp.com/)

##Overview
Data has been taken from DonorsChoose.org, a US based nonprofit organization that allows individuals to donate money directly to public school classroom projects.  The data has been presented using a Number of JavaScript libraries including D3.js and DC.js.
Please note: The total number of records is restricted to 42,134 records and represents only a partial sample of the complete dataset.
 
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
(http://dry-wildwood-54859.herokuapp.com/) Is a straight forward HTML5 Bootstrap page which summarises the projects and provides links.  The home page also features a Map of the USA, when you mouse-over a state, it highlights the number of donations to DonorsChoose.org from that state.

#The School Donations Dashboard
(http://dry-wildwood-54859.herokuapp.com/SDD) Features the dashboard of charts including bar Charts, Line Charts and Pie Charts.  Data is aggregated using crossfilter and rendered using dc.js.  The Start Tour button in the top nav bar launches Intro.js, and highlighs each chart element and gives an introduction for what the chart represents.

#Donations by State Map
(http://dry-wildwood-54859.herokuapp.com/map) Shows the map of the USA, when you mouse-over a state it gives the number of donations for that state.

#View Comments
(http://dry-wildwood-54859.herokuapp.com/view_comments) The Feedback link on the nav bar allows users to make comments on the dashboard.  These comments are inserted into the MongoDB document and are available to view in the view comments page.  The Admin Login allows an administrator to log in and edit or delete comments as appropriate.  The Username is : John and Password: MongoLogin123


 
