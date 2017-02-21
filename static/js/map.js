    var donationsNumberPerState = [];
    queue()
   .defer(d3.json, "/usstatesdonations")
   .await(makeStatesMapDonations);
   var donorsUSProjects1 = "";
     function makeStatesMapDonations(error, projectsJson1) {
       donorsUSProjects1 = projectsJson1;
       queue()
           .defer(d3.json, "/usstates")
           .await(makeStatesMap);
       function makeStatesMap(error, projectsJson) {
         var donorsUSProjects = projectsJson;
         var width = 960;
         var height = 500;
         var projection = d3.geo.albersUsa()
             .translate([width / 2, height / 2])    // translate to center of screen
             .scale([1000]);
         var path = d3.geo.path()               // path generator that will convert GeoJSON to SVG paths
             .projection(projection);  // tell path generator to use albersUsa projection
         var color = d3.scale.linear()
             .range(["rgb(213,222,217)", "rgb(69,173,168)", "rgb(84,36,55)", "rgb(217,91,67)"]);
         var svg = d3.select("#states-map")
             .append("svg")
             .attr("width", width)
             .attr("height", height);

// Append Div for tooltip to SVG
         var div = d3.select("#states-map")
             .append("div")
             .attr("class", "tooltip")
             .style("opacity", 0);
           d3.select(".loading").attr("class", "hidden");
         var tooltip = d3.select("body")
             .append("div")
             .classed("hidden", true)
             .attr("id", "tooltip");
         for (var i in donorsUSProjects1) {
           var dataState = i;
           var dataStateActual = '';
           var dataValue = donorsUSProjects1[i];
           switch (dataState) {
             case 'AL':
               dataStateActual = "Alabama";
               break;
             case 'AZ':
               dataStateActual = "Arizona";
               break;
             case 'AK':
               dataStateActual = "Alaska";
               break;
             case 'CO':
               dataStateActual = "Colorado";
               break;
             case 'DC':
               dataStateActual = "District of Columbia";
               break;
             case 'AR':
               dataStateActual = "Arkansas";
               break;
             case 'CA':
               dataStateActual = "California";
               break;
             case 'CO':
               dataStateActual = "Colorado";
               break;
             case 'CT':
               dataStateActual = "Connecticut";
               break;
             case 'DE':
               dataStateActual = "Delaware";
               break;
             case 'FL':
               dataStateActual = "Florida";
               break;
             case 'GA':
               dataStateActual = "Georgia";
               break;
             case 'HI':
               dataStateActual = "Hawaii";
               break;
             case 'ID':
               dataStateActual = "Idaho";
               break;
             case 'IL':
               dataStateActual = "Illinois";
               break;
             case 'IN':
               dataStateActual = "Indiana";
               break;
             case 'IA':
               dataStateActual = "Iowa";
               break;
             case 'KS':
               dataStateActual = "Kansas";
               break;
             case 'KY':
               dataStateActual = "Kentucky";
               break;
             case 'LA':
               dataStateActual = "Louisiana";
               break;
             case 'ME':
               dataStateActual = "Maine";
               break;
             case 'MD':
               dataStateActual = "Maryland";
               break;
             case 'MA':
               dataStateActual = "Massachusetts";
               break;
             case 'MI':
               dataStateActual = "Michigan";
               break;
             case 'MN':
               dataStateActual = "Minnesota";
               break;
             case 'MS':
               dataStateActual = "Mississippi";
               break;
             case 'MO':
               dataStateActual = "Missouri";
               break;
             case 'MT':
               dataStateActual = "Montana";
               break;
             case 'NE':
               dataStateActual = "Nebraska";
               break;
             case 'NV':
               dataStateActual = "Nevada";
               break;
             case 'NH':
               dataStateActual = "New Hampshire";
               break;
             case 'NJ':
               dataStateActual = "New Jersey";
               break;
             case 'NM':
               dataStateActual = "New Mexico";
               break;
             case 'NY':
               dataStateActual = "New York";
               break;
             case 'NC':
               dataStateActual = "North Carolina";
               break;
             case 'ND':
               dataStateActual = "North Dakota";
               break;
             case 'OH':
               dataStateActual = "Ohio";
               break;
             case 'OK':
               dataStateActual = "Oklahoma";
               break;
             case 'OR':
               dataStateActual = "Oregon";
               break;
             case 'PA':
               dataStateActual = "Pennsylvania";
               break;
             case 'RI':
               dataStateActual = "Rhode Island";
               break;
             case 'SC':
               dataStateActual = "South Carolina";
               break;
             case 'SD':
               dataStateActual = "South Dakota";
               break;
             case 'TN':
               dataStateActual = "Tennessee";
               break;
             case 'TX':
               dataStateActual = "Texas";
               break;
             case 'UT':
               dataStateActual = "Utah";
               break;
             case 'VT':
               dataStateActual = "Vermont";
               break;
             case 'VA':
               dataStateActual = "Virginia";
               break;
             case 'WA':
               dataStateActual = "Washington";
               break;
             case 'WV':
               dataStateActual = "West Virginia";
               break;
             case 'WI':
               dataStateActual = "Wisconsin";
               break;
             case 'WY':
               dataStateActual = "Wyoming";
               break;
           }
           for (var j in donorsUSProjects) {
             var jsonState = donorsUSProjects[j].properties.name;
             if (dataStateActual == jsonState) {
               donorsUSProjects[j].properties.donations = dataValue;
               break;
             }
           }
         }


         svg.selectAll("path")
           .data(donorsUSProjects)
           .enter()
           .append("path")
           .attr("d", path)
           .style("stroke", "#fff")
           .style("stroke-width", "1")
           .style("fill", function (d) {
             // Get data value
             var value = d.properties.donations;

             if (value) {
               //If value exists…
               return color(value);
             } else {
               //If value is undefined…
               return "rgb(213,222,217)";
             }
           })
           .on("mouseover", function (d) {
             if (d.properties.donations == null)
             {
               d.properties.donations = "No Data Available";
             }
             var bodyNode = d3.select('#states-map').node();
             var absoluteMousePos = d3.mouse(bodyNode);
             div.transition()
                 .duration(200)
                 .style("opacity", .9);
             div.text(d.properties.name + ' - ' + d.properties.donations)
                 .style("left", (absoluteMousePos[0] + 30) + 'px')
                 .style("top", (absoluteMousePos[1] - 50) + 'px');

           })
           .on("mousemove", function (d) {
             if (d.properties.donations == null)
             {
               d.properties.donations = "No Data Available";
             }
             var bodyNode = d3.select('#states-map').node();
             var absoluteMousePos = d3.mouse(bodyNode);
             div.transition()
                 .duration(200)
                 .style("opacity", .9);
                 .style
             div.text(d.properties.name + ' - ' + d.properties.donations)
                 .style("left", (absoluteMousePos[0] + 30) + 'px')
                 .style("top", (absoluteMousePos[1] - 50) + 'px');

           })
           .on("mouseout", function (d) {
             div.transition()
                 .duration(500)
                 .style("opacity", 0);
           });
       }
     };
