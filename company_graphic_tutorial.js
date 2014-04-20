// Tacit Tutorial //
function end_walkthrough() { 
   d3.select("#tutorial_button").style("opacity", 0.5)
   svg_canvas.select("g#grp_walkthrough").remove(); 
   }
function start_walkthrough() {
   // gradient / highlight / elastic transition to catch user attention / bouncing / emerge from origin point
   d3.select("#tutorial_button").style("opacity", 1)
   var grp_walkthrough = svg_canvas.append("g").attr("id", "grp_walkthrough")
   
   var step_1 = grp_walkthrough.append("g").attr("id", "walkthrough_step_1")
   step_1.append("svg:image")
      .attr("xlink:href", "data/arrow_up.svg")
      .style("opacity", 0.5)
      .attr("width", 30).attr("height", 30)
      .attr("x", 85).attr("y", 0)
   step_1.append("text").attr("class", "tutorial_tips")
      .text("Click to toggle view")
      .attr("x", 0).attr("y", 25);
   step_1.attr("transform", "translate(20, 80)")
      .style("opacity", 0)
      .transition().duration(1200).ease("elastic", 1, 0.5).delay(0)
      .style("opacity", 1)
      .attr("transform", "translate(40, 30)");

   var step_2 = grp_walkthrough.append("g").attr("id", "walkthrough_step_2")
   step_2.append("svg:image")
      .attr("xlink:href", "data/arrow_right.svg")
      .style("opacity", 0.5)
      .attr("width", 30).attr("height", 30)
      .attr("x", 110).attr("y", 0)
   step_2.append("text").attr("class", "tutorial_tips")
      .text("Hover cursor for tooltip")
      .attr("x", 0).attr("y", 0);
   step_2.append("text").attr("class", "tutorial_tips")
      .text("Click to lock")
      .attr("x", 30).attr("y", 13);
   step_2.attr("transform", "translate(20, 60)")
      .style("opacity", 0)
      .transition().duration(1200).ease("elastic", 1, 0.5).delay(250)
      .style("opacity", 1)
      .attr("transform", "translate(140, 125)");

   var step_3 = grp_walkthrough.append("g").attr("id", "walkthrough_step_3")
   step_3.append("svg:image")
      .attr("xlink:href", "data/arrow_up.svg")
      .style("opacity", 0.5)
      .attr("width", 30).attr("height", 30)
      .attr("x", 140).attr("y", 0)
   step_3.append("text").attr("class", "tutorial_tips")
      .text("Type company name to search")
      .attr("x", 0).attr("y", 25);
   step_3.attr("transform", "translate(600, 75)")
      .style("opacity", 0)
      .transition().duration(1200).ease("elastic", 1, 0.75).delay(500)
      .style("opacity", 1)
      .attr("transform", "translate(860, 30)");

   var step_4 = grp_walkthrough.append("g").attr("id", "walkthrough_step_4")
   step_4.append("svg:image")
      .attr("xlink:href", "data/arrow_left.svg")
      .style("opacity", 0.5)
      .attr("width", 30).attr("height", 30)
      .attr("x", 0).attr("y", 0)
   step_4.append("text").attr("class", "tutorial_tips")
      .text("Hover bold-face names for tooltip")
      .attr("x", 35).attr("y", 10);
   step_4.attr("transform", "translate(520, 260)")
      .style("opacity", 0)
      .transition().duration(1200).ease("elastic", 1, 0.75).delay(750)
      .style("opacity", 1)
      .attr("transform", "translate(310, 400)");
}

function annotation_reel() {
}
