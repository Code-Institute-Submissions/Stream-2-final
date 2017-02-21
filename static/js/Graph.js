/**
 * Created by arnol on 21/09/2016.
 */


var state = "";
var states2 = [];
var states = [];
queue()
   .defer(d3.json, "/donorsUS/projects")
   .await(makeGraphs)

function makeStates(state, states2){
    state = state.toUpperCase();
    if (states2.indexOf(state) > -1) {
            //In the array!
        } else {
            //Not in the array
            states2.push(state)
        }

        return(states2);
};
function makeGraphs(error, projectsJson) {
   var donorsUSProjects = projectsJson;
   var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
   donorsUSProjects.forEach(function (d) {
       d["date_posted"] = dateFormat.parse(d["date_posted"]);
       d["date_posted"].setDate(1);
       d["total_donations"] = +d["total_donations"];
       state = d["school_state"];
       makeStates(state, states2);
   });


//Create a Crossfilter instance
   var ndx = crossfilter(donorsUSProjects);
   //Define Dimensions
   var dateDim = ndx.dimension(function (d) {
       return d["date_posted"];
   });
   var resourceTypeDim = ndx.dimension(function (d) {
       return d["resource_type"];
   });
   var resourceTypeDim2 = ndx.dimension(function (d) {
       return d["resource_type"];
   });
   var povertyLevelDim = ndx.dimension(function (d) {
       return d["poverty_level"];
   });
   var stateDim = ndx.dimension(function (d) {
       return d["school_state"];
   });
   var stateDim2 = ndx.dimension(function (d) {
       return d["school_state"];
   });
   var schoolmetroDim = ndx.dimension(function (d) { return d["school_metro"];});
   var totalDonationsDim = ndx.dimension(function (d) {
       return d["total_donations"];
   });

   var primaryFocusSubjectDim = ndx.dimension(function (d) {return d["primary_focus_subject"];});
   var primaryFocusSubjectDim2 = ndx.dimension(function (d) {return d["primary_focus_subject"];});
   var fundingStatus = ndx.dimension(function (d) {
       return d["funding_status"];
   });

//Calculate metrics
   var numProjectsByDate = dateDim.group();
   var numPrimaryFocusSubject = primaryFocusSubjectDim.group();
   var totalDonationsBySubject = primaryFocusSubjectDim2.group().reduceSum(function (d) {return d["total_donations"];});
   var numProjectsByResourceType = resourceTypeDim.group();
   var numProjectsByResourceType2 = resourceTypeDim2.group();
   var numProjectsByPovertyLevel = povertyLevelDim.group();
   var numProjectsByFundingStatus = fundingStatus.group();
   var totalDonationsByState = stateDim.group().reduceSum(function (d) {return d["total_donations"];});
   var numprojectsschoolmetro = schoolmetroDim.group();
   var stateGroup = stateDim.group();
   var stateGroup2 = stateDim2.group();
   var all = ndx.groupAll();
   var totalDonations = ndx.groupAll().reduceSum(function (d) {return d["total_donations"]; });
   var stateHits = stateDim.group().reduceSum(function(d) {return d.total_donations;});
   var stateHits2 = stateDim2.group().reduceSum(function(d) {return d.total_donations;});
   var max_state = totalDonationsByState.top(1)[0].value;
//Define values (to be used in charts)
   var minDate = dateDim.bottom(1)[0]["date_posted"];
   var maxDate = dateDim.top(1)[0]["date_posted"];

//Charts
   var timeChart = dc.barChart("#time-chart");
   var resourceTypeChart = dc.rowChart("#resource-type-row-chart");
   var povertyLevelChart = dc.rowChart("#poverty-level-row-chart");
   var numberProjectsND = dc.numberDisplay("#number-projects-nd");
   var totalDonationsND = dc.numberDisplay("#total-donations-nd");
   var fundingStatusChart = dc.pieChart("#funding-chart");
   var stateChart2 = dc.barChart("#state-donation-chart");
   var metroChart = dc.pieChart("#school-metro-pie-chart");
   var primarySubjectChart = dc.rowChart("#primary-focus-subject");
   var primarySubjectValChart = dc.rowChart("#primary-focus-subject-value");
   selectField = dc.selectMenu('#menu-select')
       .dimension(stateDim)
       .group(stateGroup);
   primarySubjectChart
       .width(800)
       .height(500)
       .dimension(primaryFocusSubjectDim)
       .group(numPrimaryFocusSubject)
       .xAxis().ticks(4);

   primarySubjectValChart
       .width(800)
       .height(500)
       .dimension(primaryFocusSubjectDim2)
       .group(totalDonationsBySubject)
       .xAxis().ticks(4);

   metroChart
       .height(250)
       .radius(90)
       .innerRadius(0)
       .transitionDuration(1500)
       .dimension(schoolmetroDim)
       .group(numprojectsschoolmetro);

   numberProjectsND
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(all);

   totalDonationsND
       .formatNumber(d3.format("d"))
       .valueAccessor(function (d) {
           return d;
       })
       .group(totalDonations)
       .formatNumber(d3.format(".3s"));

   timeChart
       .width(1000)
       .height(250)
       .margins({top: 10, right: 50, bottom: 30, left: 50})
       .dimension(dateDim)
       .group(numProjectsByDate)
       .transitionDuration(500)
       .x(d3.time.scale().domain([minDate, maxDate]))
       .elasticY(true)
       .xAxisLabel("Year")
       .yAxis().ticks(4);

   resourceTypeChart
       .width(300)
       .height(250)
       .dimension(resourceTypeDim)
       .group(numProjectsByResourceType)
       .xAxis().ticks(4);

   povertyLevelChart
       .width(300)
       .height(250)
       .dimension(povertyLevelDim)
       .group(numProjectsByPovertyLevel)
       .xAxis().ticks(4);

   fundingStatusChart
       .height(250)
       .radius(90)
       .innerRadius(0)
       .transitionDuration(1500)
       .dimension(fundingStatus)
       .group(numProjectsByFundingStatus);

   stateChart2
       .width(800)
       .height(400)
       .margins({top: 10, right: 50, bottom: 30, left: 50})
       .dimension(stateDim2)
       .group(stateGroup2)
       .transitionDuration(500)
       .x(d3.scale.ordinal().domain(states2))
       .xUnits(dc.units.ordinal)
       .elasticY(true)
       .xAxisLabel("State")
       .yAxisLabel("Number of Donations")
       .yAxis().ticks(4);
   dc.renderAll();
   d3.select(".loader").attr("class", "hidden");
}