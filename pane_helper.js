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
   draw_time_xy_plot.link_plot = function() {
   }
}

// Maybe first write it, then create linking function
function link_summary_plot(plot_type, variable) {
}

function gen_heat_map() {
   // mapping of the values to color
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

function switch_chart_type () {
   d3.select("#sidebar_options").newattrib({
      hello:true
   });
}

function workspace() {
   // A "droppable", in jquery ui terms
   var accept = [draggable1];
}

function drag_drop_method() {
   var origin_drag_x;
   var origin_drag_y;
   var shadow_object;
   var drag_object_type;
   var drag_drop_object = d3.behavior.drag();
   drag_drop_object
      .origin(Object)
      .on("dragstart", function(g) {
         /*drag_event_listener(); */
         origin_drag_x = event.x;
         origin_drag_y = event.y;
         shadow_object = this.cloneNode(true);
         document.getElementById("shadow_object").appendChild(shadow_object);
      })
      .on("drag", function(g) {
         d3.select("#shadow_object")
            /*.classed("dragged") */
            .style("opacity", 0.5)
            .style("display", "inline")
            .style("position", "absolute")
            .style("left", function() {return Window_MousePosition[0] - 15;})
            .style("top", function() {return Window_MousePosition[1] - 5;});
      })
      .on("dragend", function(g) {
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
      });
   function drag_drop(g) {
      this.call(drag_drop_object);
   }
   return drag_drop;
}

// Can improve this for sure...
/*
d3.select("body").append("div")
   .attr("id", "workspace_1")
   .append("svg")
   .attr("id", "workspace_1_svg");

function linked_workspace_drag(wkspace, drag_object) {
   function linked_space(wkspace, drag_object) {
      wkspace
         .on("mousemove", function() {
               event_listener();
               check_drag();
               );
      
   }
   
   function event_listener() {
   }

   function check_drag() {
      drag_object.classed("dragged")
   }
   
   return linked_space;
}

linked_space.custom_event_listener() {     // global
   var event_workspaces = [{workspace_1:1},{workspace_2:0}];
   var event_dragobjects = [{d_object_1:1}];

   function event_listener() {
   }
   event_listener.add_workspace(wkspace) {
      var temp_id = wkspace.attr("id")
      workspaces_id.push(temp_id);
   }
   event_listener.add_dragobject(d_object) {
      var temp_id = d_object.attr("id")
      dragobjects_id.push(temp_id);
   }

   return event_listener;
}

global event listening object 
function drag_event_listener(drag_object, workspace) {
   function event_listen() {
   }
   return event_listen
}
*/
