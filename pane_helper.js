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
