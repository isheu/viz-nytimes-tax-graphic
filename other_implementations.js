   <!-- How to make use of the force diagrams -->
   <!-- Accomplish tonight
      grid mouse lines that expose the actual x-y values          check
      unfurl list (from ul li)                                    ... what is advantage
      refined sliding transition                                  
      drag-drops                                                  
      re-usable chart functions (closure)                         
         time-series csv reader example                           
      formatting                                                  check
      selection brush                                             *
      use built-in re-usable axes, ticks                          check
      efficient inheritance                                       

      make effective use of transform-translate for groups        check
      function-izing                                              
      knowledge of transitions                                    *
      LESS

      color-brewer type utility?                                  
      Using WebFonts, FontAwesome                                 

      basic, small sort                                           
      re-usable chart to create the provider one.                 check-ish
      a href = "#" onclick="$j().toggle();                        
      <header><footer><aside>
      <span><li><ul>
      <pseudo-classes pseudo-elements>
      Get comfortable with paths.                                 *

      <thead><tbody>
      PERISCOPIC HTML5
      Look at d3 source code structure.
      drag-drop panes

      Different Tweens!
      cursor changes                                              check
      using positioning to avoid redraw, coordinate calucation    relative? or just straightforward block
      magnifier, brush

      block vs. inline-block vs. inline vs. relative
      Avoid SVG when possible. Use cell-padding, cell-spacing, margins, borders
      Create sidebar as group. each element takes an intuitive ID.

      Pleasing tooltip aesthetic
      heat map - long-wise vertical

      Be prepared to create legends
      Scrolling, Hiding, Zooming, Switching Windows
      Ability to re-size

      Search + browse window

      HCPCS-specialty pairing

      re-sizeable
   -->


// Implement and initiate scatterplot view area //
         /*
         d3.select("#svg_viewspace")
            .append("g")
            .attr("id", "scatter_pane");

         d3.selectAll("#scatter_pane")
            .append("rect")
            .attr("id","in_view")
            .attr("fill", "#E7E3DB")
            .attr("x", x_plot_displace)
            .attr("y", y_plot_displace)
            .attr("height", y_plotsize)
            .attr("width", x_plotsize);

         d3.select("#svg_viewspace")
            .append("g").attr("class", "x axis")
            .append("line").attr("id", "axis")
            .attr("x1", function() { return 0; })
            .attr("y1", 0)
            .attr("x2", function() { return x_plotsize - x_padding; })
            .attr("y2", 0)
         d3.select(".x.axis")
            .attr("transform", function() { return "translate(" + (x_plot_displace + x_padding) + "," + (y_plot_displace + y_plotsize - y_padding) + ")"})
            .call(xAxis);
         d3.select("#svg_viewspace")
            .append("g").attr("class", "y axis")
            .append("line").attr("id", "axis")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", function() { return y_plotsize - y_padding; })
         d3.select(".y.axis")
            .attr("transform", function() { return "translate(" + (x_plot_displace + x_padding) + "," + (y_plot_displace) + ")"})
            .call(yAxis);

         d3.select("g#scatter_pane").selectAll("circle")
            .data(dates_data)
            .enter().append("circle")
            .attr("class", "d_price_pt")
            .attr("cx", function(d) { return x_date_scale(getDate(d.date)) + x_plot_displace + x_padding; })
            .attr("cy", function(d) { return y_plotsize + y_plot_displace - y_padding - y_price_scale(d.price); })
            .attr("r", 2);
            
         d3.select("g#scatter_pane")
            .append("g")
            .attr("id", "cursor_line_to_axis");
         d3.select("#cursor_line_to_axis")
            .append("line")
            .attr("id", "vert_marker");
         d3.select("#cursor_line_to_axis")
            .append("rect")
            .attr("id", "x_label");
         d3.select("#cursor_line_to_axis")
            .append("text")
            .attr("id", "x_detail");
         
         d3.select("g#scatter_pane")
            .on("mousemove", function() {
                  if ((MousePosition[0] > x_plot_displace + x_padding - 1) & (MousePosition[0] < (x_plotsize + x_plot_displace))) {
                     update_cursor_line();
                  }
                  else { nodisplay_cursor_line();}})
            .on("mouseout", nodisplay_cursor_line);
         */


function workspace() {
   var draggables_accepted = [];
   var draggables_on_hover;
   var drag_obj_method_array = [];
   // in this manner: [{"object_id_1": function() {;}},{"object_id_2": function() {;}}];
   function create_workspace() {
   }
   create_workspace.add_draggable = function(draggable) {
      draggables_accepted.push(draggable.attr("id"));
      var objectform_of_drag;
      objectform_of_drag = "{" + draggable.attr("id") + ":" + draggable.attr(method_name) + "}";
      drag_obj_method_array.push(objectform_of_drag);
   }

   create_workspace.rm_draggable = function(draggable) {
      draggables_accepted.pop(draggable.attr("id"));
      drag_obj_method_array.pop(objectform_of_drag);
   }

   create_workspace.set_over_fn = function() {
      this.on("mouseover", function() {
         draggables_on_hover.push(this.attr("id"));
      });
   }
   create_workspace.set_out_fn = function() {
      this.on("mouseout", function() {
         draggables_on_hover.pop(this.attr("id"));
      });
   }

   create_workspace.get_hovered_draggable = function() {
      return draggables_on_hover;
   }

   create_workspace.accept_drop = function() {      // Currently hovered object ID
      var temp = this.get_hovered_draggable()
      drag_obj_method_array[this.attr("id")]();    // call the proper function when this draggable is accepted!
   }
   return create_workspace;
}
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

