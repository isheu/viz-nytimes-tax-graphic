function tooltip(ttip_data, height, width) {
   var content_height = height;
   var content_width = width;
   // Generalizable tooltip
   function draw_tooltip() {
      d3.select("#tooltip")
         .data(ttip_data)
         .enter().append("li");
      }
   return draw_tooltip
}
