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

            /*
            d3.selectAll(".f_circle").data().forEach(function(d, i) { 
                     filt_clustered_pos[i] = {"radius": d.radius, "x": d.x, "y": d.y, "t_value": d.t_value, "name": d.name, "sector": d.sector, "tax_rate": d.tax_rate}
                  });         
            d3.selectAll(".f_circle").remove()
            d3.selectAll(".n_circle")
               .data(filt_clustered_pos, function(d) { return d.name; })
               .attr("id", function(d) { return d.name })
               .transition().duration(1200)
               .delay(function(d, i) { return (d.tax_rate / 100) * 1200; })
               .attr("cx", function(d) { return d.x; })
               .attr("cy", function(d) { return d.y; })
         var filt_clustered_pos = [];
         setTimeout(function(g) {
            console.log("try now")
            d3.selectAll(".n_circle")
               .on("mouseover", function() { d3.select(this).attr("stroke", "black"); })
               .on("mouseout", function() { d3.select(this).attr("stroke", "white"); });
         }, 18000);
            */
