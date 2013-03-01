function getDate(d) {
   return new Date(d);
}
function update_cursor_line() {
   d3.select("g#cursor_line_to_axis")
      .style("display", "inline");         
   d3.selectAll("#x_label")
      .attr("rx", 2)
      .attr("ry", 2)
      .attr("width", 48)
      .attr("height", 15)
      .attr("fill", "#A7C1D8")
      .attr("x", -24)
      .attr("y", function() { return y_plotsize - 15; });
   d3.selectAll("#vert_marker")
      .attr("class", "cursor_line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", 0)
      .attr("y2", function() { return y_plotsize - 15; });
   d3.selectAll("#x_detail")  
      .attr("text-anchor", "middle")
      .attr("x", 0)
      .attr("y", function() { return y_plotsize - 5; })
      .text(function() { return short_dt_formatter(x_date_scale.invert(MousePosition[0] - x_plot_displace - x_padding)); } );
   d3.select("g#cursor_line_to_axis")
      .attr("transform", function() { return "translate(" + MousePosition[0] + "," + (y_plot_displace) + ")";});
   }
function nodisplay_cursor_line() {
   d3.select("g#cursor_line_to_axis")
      .style("display", "none");
   }

function colored_transition() {
   var b_color = "rgba(128,0,0,0.1)";
   var t_color = "rgba(128,0,0,0)";
   function transition(g) {
      d3.select(this)
         .style("background-color", b_color)
         .transition()
         .duration(250)
         .style("background-color", t_color);
      }
   transition.base_color = function(value) {
      b_color = value;
      return transition;
   }
   transition.transition_color = function(value) {
      t_color = value;
      return transition;
   }
   return transition;
}


// Getter-setter methods, for method-chaining. Modular organization of code.
function gen_time_xy_plot(metric_X, metric_Y) {
   var width = 550;
   var height = 450;
   var date_st = new Date(2006,12,31);
   var date_end = new Date(2013,1,1);
   var y_st = 0;
   var y_end = 15000;
   
   var x_domain = [date_st, date_end];
   var y_domain = [y_st, y_end];   
   var x_time_scale = d3.time.scale()
      .domain(x_domain)
      .range([0, width]);
   var y_scale = d3.scale.linear()
      .domain(y_domain)
      .range([0, height]);

   function draw_time_xy_plot() {
      var x_Axis = d3.svg.axis().scale(x_time_scale)
         .orient("bottom")
         .ticks(d3.time.months, 6).tickSubdivide(5).tickSize(6,3,0)
         .tickFormat(d3.time.format("%b %y"));
      var y_Axis = d3.svg.axis().scale(y_scale)
         .orient("left")
         .ticks(6).tickSubdivide(4).tickSize(6,3,0)
         .tickFormat(function(d) { return "$" + price_formatter(d); } );
      }
}
