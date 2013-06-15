/* Basic Functions: 
***** Holds the SVG canvas. 
***** Resize-able. 
*  Advanced Functions: 
***** Can be initiated as a "droppable", in jqueryUI terms. 
***** On receipt of "draggable", calls appropriate [drawing / graph-adjust] function. 

No: All workspaces are droppable
Object is just equal to key:value pair;
Defaults; Selection of Metrics; 
Categorical; Color Brewer; FID, circle size
Scatterplot Matrix Brushing (faceting)
Changing Axes with Dropdown
Axes range categories
Top-attached labels

Viewing things in an orderly layout
*/

function getDate(d) { return new Date(d); }
function x_axis_detail_ticks(scatter_pane_id, width, x_plot_displace, height, y_plot_displace, x_padding, y_padding, x_time_scale) {
   var mouse_xy = [];
   /* Helper Functions */
   function update_cursor_line() {
      d3.select("#" + scatter_pane_id + " #cursor_line_to_axis")
         .style("display", "inline");
      d3.selectAll("#" + scatter_pane_id + " #cursor_line_to_axis" + " #x_label")
         .attr("rx", 2)
         .attr("ry", 2)
         .attr("width", 48)
         .attr("height", 15)
         .attr("fill", "#A7C1D8")
         .attr("x", -24)
         .attr("y", function() { return height - 15 - y_plot_displace; });
      d3.selectAll("#" + scatter_pane_id + " #cursor_line_to_axis" + " #vert_marker")
         .attr("class", "cursor_line")
         .attr("x1", 0)
         .attr("y1", 0)
         .attr("x2", 0)
         .attr("y2", function() { return height - 15 - y_plot_displace; });
      d3.selectAll("#" + scatter_pane_id + " #cursor_line_to_axis" + " #x_detail")
         .attr("text-anchor", "middle")
         .attr("x", 0)
         .attr("y", function() { return height - 5 - y_plot_displace; })
         .text(function() { return short_dt_formatter(x_time_scale.invert(mouse_xy[0] - x_plot_displace - x_padding)); } );
      d3.select("#" + scatter_pane_id + " #cursor_line_to_axis")
         .attr("transform", function() { return "translate(" + mouse_xy[0] + "," + y_plot_displace + ")";});
      }

   function nodisplay_cursor_line() {
      d3.select("#" + scatter_pane_id + " #cursor_line_to_axis")
         .style("display", "none");
      }
   /*****************************************************************/
   function draw_line_marker() {
      d3.select("#" + scatter_pane_id)
         .append("g")
         .attr("id", "cursor_line_to_axis");
      d3.select("#" + scatter_pane_id + " #cursor_line_to_axis")
         .append("line")
         .attr("id", "vert_marker");
      d3.select("#" + scatter_pane_id + " #cursor_line_to_axis")
         .append("rect")
         .attr("id", "x_label");
      d3.select("#" + scatter_pane_id + " #cursor_line_to_axis")
         .append("text")
         .attr("id", "x_detail");

      d3.select("g#" + scatter_pane_id)
         .on("mousemove", function() {
               mouse_xy = d3.svg.mouse(this)
               if ((mouse_xy[0] > x_plot_displace + x_padding - 1) & (mouse_xy[0] < (width + x_plot_displace))) {
                  update_cursor_line();
               }
               else { 
                  nodisplay_cursor_line()
                  ;}
               })
         .on("mouseout", nodisplay_cursor_line);
   }
   return draw_line_marker
}


// Relative to which origin : browser, DOM element, svg?
/****************************************************/
function colored_transition() {
   var b_color = "rgba(128,0,0,0.1)"; var t_color = "rgba(128,0,0,0)";
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

function colored_underline() {
   var b_color = "#d02027";
   function underline(g) {   
      d3.select(this)
         .transition()
         .duration(150)
         .style("border-color", b_color);
   }
   underline.color = function(value) {
      b_color = value;
      return underline;
   }
   return underline;
}

function toggle_side_section(div_id) {
   if (d3.select("div#" + div_id).classed("collapsed") == false) {
      d3.select("div#" + div_id)
         .classed("collapsed", true);
   }
   else {
         d3.select("div#" + div_id)
         .classed("collapsed", false);                  
   }
}

// Getter-setter methods, for method-chaining. Modular organization of code.
function gen_time_xy_plot(dataset, wkspace_div_id, plot_id) {
   var width = 550;
   var height = 450;
   var date_st = new Date(2006,12,31);
   var date_end = new Date(2013,1,1);
   var y_st = 0;
   var y_end = 15000;
   
   var x_domain = [date_st, date_end];
   var y_domain = [y_end, y_st];
   var x_time_scale = d3.time.scale()
      .domain(x_domain)
      .range([0, width - x_padding]);
   var y_scale = d3.scale.linear()
      .domain(y_domain)
      .range([0, height - y_padding]);

   var y_plot_displace = 10;
   var x_plot_displace = 10;
   var x_padding = 40;
   var y_padding = 50;
   var viewspace_width = width + 25;
   var viewspace_height = height;

   var x_detail_tooltip;

   /* Helper Functions - Not accessible by User */
   function update_scale() {
      x_time_scale = d3.time.scale()
         .domain(x_domain)
         .range([0, width - x_padding]);
      y_scale = d3.scale.linear()
         .domain(y_domain)
         .range([0, height - y_padding]);
      viewspace_width = width + 25;
      viewspace_height = height;
      x_detail_tooltip = x_axis_detail_ticks(plot_id + "_scatter_pane", width, x_plot_displace, height, y_plot_displace, x_padding, y_padding, x_time_scale)
   }
   
   function clear_previous() {
      wkspace = document.getElementById(wkspace_div_id)
      while (wkspace.firstChild) { wkspace.removeChild(wkspace.firstChild); }
   }
   /**************************************************/

   function draw_time_xy_plot() {
      clear_previous()
      var x_axis = d3.svg.axis().scale(x_time_scale)
         .orient("bottom")
         .ticks(d3.time.months, 6).tickSubdivide(5).tickSize(6,3,0)
         .tickFormat(d3.time.format("%b %y"));
      var y_axis = d3.svg.axis().scale(y_scale)
         .orient("left")
         .ticks(6).tickSubdivide(4).tickSize(6,3,0)
         .tickFormat(function(d) { return "$" + price_formatter(d); } );
      
      d3.select("#" + wkspace_div_id).append("svg")
         .attr("id", function() { return "svg_" + plot_id; })
         .attr("width", viewspace_width)
         .attr("height", viewspace_height);
      
      d3.select("#svg_" + plot_id)
         .append("g")
         .attr("id", function() { return plot_id + "_scatter_pane"; }); 

      d3.selectAll("#" + plot_id + "_scatter_pane")
         .append("rect")
         .attr("fill", "#E7E3DB")
         .attr("x", 0)
         .attr("y", 0)
         .attr("height", 500)
         .attr("width", 600);

      d3.select("#svg_" + plot_id)
         .append("g").attr("class", "x axis")
         .append("line").attr("id", "axis")
         .attr("x1", function() { return 0; })
         .attr("y1", 0)
         .attr("x2", function() { return width - x_padding; })
         .attr("y2", 0)
      d3.select("#svg_" + plot_id + " .x.axis")
         .attr("transform", function() { return "translate(" + (x_plot_displace + x_padding) + "," + (y_plot_displace + height - y_padding) + ")"})
         .call(x_axis);
      d3.select("#svg_" + plot_id)
         .append("g").attr("class", "y axis")
         .append("line").attr("id", "axis")
         .attr("x1", 0)
         .attr("y1", 0)
         .attr("x2", 0)
         .attr("y2", function() { return height - y_padding; })
      d3.select("#svg_" + plot_id + " .y.axis")
         .attr("transform", function() { return "translate(" + (x_plot_displace + x_padding) + "," + (y_plot_displace) + ")"})
         .call(y_axis);

      d3.select("g#" + plot_id + "_scatter_pane").selectAll("circle")
         .data(dates_data)
         .enter().append("circle")
         .attr("class", "d_price_pt")
         .attr("cx", function(d) { return x_time_scale(getDate(d.date)) + x_plot_displace + x_padding; })
         .attr("cy", function(d) { return height + y_plot_displace - y_padding - y_scale(d.price); })
         .attr("r", 2);

      d3.selectAll("#" + plot_id + "_scatter_pane")
         .call(x_detail_tooltip);
      } 
   
   draw_time_xy_plot.set_domain = function(x_domain_array, y_domain_array) {
      x_domain = x_domain_array;
      y_domain = y_domain_array;
      update_scale();
      return draw_time_xy_plot;
   }
   draw_time_xy_plot.set_width = function(w) {
      width = w;
      update_scale();     
      return draw_time_xy_plot;
   }
   draw_time_xy_plot.set_height = function(h) {
      height = h;
      update_scale();
      return draw_time_xy_plot;
   }
   return draw_time_xy_plot
}

function drag_drop_method() {
   var origin_drag_x, origin_drag_y, dest_x, dest_y;
   var shadow_object;
   var drag_id = "draggable";
   triggered_fn = function() { alert("Accepted Drop"); }
   var drop_accepted = 0;
   var drop_accepted_ids = [];
   var drag_drop_object = d3.behavior.drag();
   
   function activate_windows(element, index, array) { d3.select("#" + element).style("z-index", 1); }
   function deactivate_windows(element, index, array) { d3.select("#" + element).style("z-index", -1); }

   drag_drop_object
      .origin(Object)
      .on("dragstart", function(g) {
         origin_drag_x = event.x; origin_drag_y = event.y;
         shadow_object = this.cloneNode(true);
         document.getElementById("shadow_object").appendChild(shadow_object);
         if (drop_accepted_ids != []) { drop_accepted_ids.forEach(activate_windows); }
      })
      .on("drag", function(g) {
         d3.select("#shadow_object")
            .style("opacity", 0.5)
            .style("display", "inline")
            .style("position", "absolute")
            .style("left", function() {return Window_MousePosition[0] - 15;})
            .style("top", function() {return Window_MousePosition[1] - 5;});
      })
      .on("dragend", function(g) {
         if (drop_accepted == 1) {
            d3.select("#shadow_object")
               .transition()
               .duration(500)
               .style("left", dest_x)
               .style("top", dest_y)
               .style("opacity", 0);            
            d3.select("#shadow_object")
               .transition()      
               .delay(500)
               .style("display", "none");
            setTimeout(function(g) {document.getElementById("shadow_object").removeChild(shadow_object);}, 500);
            triggered_fn()
            drop_accepted_ids.forEach(deactivate_windows); 
         }
         else {
            d3.select("#shadow_object")
               .transition()
               .duration(500)
               .style("left", origin_drag_x)
               .style("top", origin_drag_y)
               .style("opacity", 0);
            d3.select("#shadow_object")
               .transition()      
               .delay(500)
               .style("display", "none");
            setTimeout(function(g) {document.getElementById("shadow_object").removeChild(shadow_object);}, 500);
            if (drop_accepted_ids != []) { drop_accepted_ids.forEach(deactivate_windows); }
         }
      });     

   function drag_drop(g) { 
      this.call(drag_drop_object); 
   }   
   drag_drop.status = function() { return drop_accepted; }
   drag_drop.accept = function() { drop_accepted = 1; }
   drag_drop.reject = function() { drop_accepted = 0; }
   drag_drop.accepted_dest = function(x,y,accepted_id) {
      dest_x = x; dest_y = y; 
      if (drop_accepted_ids.indexOf(accepted_id) == -1) { drop_accepted_ids.push(accepted_id); }
   }
   drag_drop.set_id = function(id) {
      drag_id = id;
      return drag_id;
   }
   drag_drop.set_triggered_fn = function(fn_triggered) {
      triggered_fn = fn_triggered;
   }
   return drag_drop;
}

function add_drag_listener() {
   document.getElementById("shadow_object")
   d3.select("#workspace")  
}


function switch_chart_type () {
   d3.select("#sidebar_options").newattrib({
   });
}

function bar_chart() {
}

// Maybe first write it, then create linking function
function link_summary_plot(plot_type, variable) {
}

function gen_heat_map() {
   // mapping of the values to color
}
