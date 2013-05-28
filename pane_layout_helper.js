function wkspace_mover(workspace_id) {
   var x_min = 0, x_max = 9999;
   var y_min = 0, y_max = 9999;
   var move_drag_object = d3.behavior.drag();
   move_drag_object
      .origin(Object)
      .on("dragstart", function(g) {
         origin_drag_x = d3.select("." + workspace_id).style("left");
         origin_drag_y = d3.select("." + workspace_id).style("top");
         origin_x = event.x; origin_y = event.y;
         if (rearrange_status == 1) { d3.select("#main").style("display", "block"); }
      })
      .on("drag", function(g) {
         window_mouse_x = event.x; window_mouse_y = event.y;
         if (rearrange_status == 1) { 
            d3.selectAll("." + workspace_id)
               .style("left", function() { 
                   if (((parseInt(origin_drag_x) + (window_mouse_x - origin_x)) >= x_min) & ((parseInt(origin_drag_x) + (window_mouse_x - origin_x)) <= x_max)) {
                     return parseInt(origin_drag_x) + (window_mouse_x - origin_x);
                  }
                  else if ((parseInt(origin_drag_x) + (window_mouse_x - origin_x)) < x_min) {
                     return x_min;
                  }
                  else if ((parseInt(origin_drag_x) + (window_mouse_x - origin_x)) > x_max) {
                     return x_max;
                  }
               })
               .style("top", function() { 
                  if (((parseInt(origin_drag_y) + (window_mouse_y - origin_y)) >= y_min) & ((parseInt(origin_drag_y) + (window_mouse_y - origin_y)) <= y_max)) {
                     return parseInt(origin_drag_y) + (window_mouse_y - origin_y);
                  }
                  else if ((parseInt(origin_drag_y) + (window_mouse_y - origin_y)) < y_min) {
                     return y_min;
                  }
                  else if ((parseInt(origin_drag_y) + (window_mouse_y - origin_y)) > y_max) {
                     return y_max;
                  }
               })
         }
      })
      .on("dragend", function(g) { d3.select("#main").style("display", "none"); })
   function div_move() { 
      this.call(move_drag_object);
   }
   div_move.set_bounds = function(x_array, y_array) {
      x_min = x_array[0]; x_max = x_array[1]
      y_min = y_array[0]; y_max = y_array[1]
      return div_move
   }
   return div_move
}

function wkspace_resizer(workspace_id) {
   var x_min = 100, x_max = 600;
   var y_min = 100, y_max = 600;
   var in_resize_region = 0
   var resize_drag_object = d3.behavior.drag();
   resize_drag_object
      .origin(Object)
      .on("dragstart", function(g) {
         orig_left = parseInt(d3.select("." + workspace_id).style("left"));
         orig_top = parseInt(d3.select("." + workspace_id).style("top"));
         orig_size_x = parseInt(d3.select("." + workspace_id).style("width"));
         orig_size_y = parseInt(d3.select("." + workspace_id).style("height"));
         origin_x = event.x; origin_y = event.y;
         if (((origin_x > (orig_left + orig_size_x - 10)) & (origin_x < (orig_left + orig_size_x))) | ((origin_y > (orig_top + orig_size_y - 10)) & (origin_y < (orig_top + orig_size_y)))) { in_resize_region = 1; }
         else { in_resize_region = 0; }
      })
      .on("drag", function(g) {
         window_mouse_x = event.x; window_mouse_y = event.y;
         if (in_resize_region == 1) {
            d3.selectAll("." + workspace_id)
               .style("width", function() { 
                   if (((orig_size_x + (window_mouse_x - origin_x)) >= x_min) & ((orig_size_x + (window_mouse_x - origin_x)) <= x_max)) {
                     return orig_size_x + (window_mouse_x - origin_x);
                  }
                  else if ((orig_size_x + (window_mouse_x - origin_x)) < x_min) {
                     return x_min;
                  }
                  else if ((orig_size_x + (window_mouse_x - origin_x)) > x_max) {
                     return x_max;
                  }
               })
               .style("height", function() { 
                  if (((orig_size_y + (window_mouse_y - origin_y)) >= y_min) & ((orig_size_y + (window_mouse_y - origin_y)) <= y_max)) {
                     return orig_size_y + (window_mouse_y - origin_y);
                  }
                  else if ((orig_size_y + (window_mouse_y - origin_y)) < y_min) {
                     return y_min;
                  }
                  else if ((orig_size_y + (window_mouse_y - origin_y)) > y_max) {
                     return y_max;
                  }
               })
         }
      })
      .on("dragend", function(g) { })
   function div_resize() { this.call(resize_drag_object); }
   div_resize.set_bounds = function(x_array, y_array) {
      x_min = x_array[0]; x_max = x_array[1]
      y_min = y_array[0]; y_max = y_array[1]
      return div_resize
   }
   return div_resize
}

function button_hover(button_id) {
   var h_bg_color = "rgba(25,87,0,0.25)";
   var click_bg_color = "rgba(25,87,0,0.40)";
   triggered_fn = function() { alert("Button clicked"); }
   function btn_effect() {
      d3.select("#" + button_id)
         .on("mouseover", function() { d3.select(this).style("background", h_bg_color).style("border-style", "inset") })
         .on("mouseout", function() { if (rearrange_status == 0) { d3.select(this).style("background", "transparent").style("border-style", "outset")} })
         .on("mousedown", function() { d3.select(this).style("background", click_bg_color) })
         .on("mouseup", function() { d3.select(this).style("background", h_bg_color).style("border-style", "outset") })
         .on("click", triggered_fn);
   }
   btn_effect.set_triggered_fn = function(trigger_fn) { 
      triggered_fn = trigger_fn;
      return btn_effect;
      }
   return btn_effect
}
function layout_arrange_mode() { rearrange_status = (rearrange_status == 0); }

