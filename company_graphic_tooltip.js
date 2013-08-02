bubble_color_wheel = [  { "value": 0, "color": "#542788" }, 
                        { "value": 10, "color": "#998ec3" }, 
                        { "value": 20, "color": "#d8daeb" }, 
                        { "value": 30, "color": "#fee0b6" }, 
                        { "value": 40, "color": "#f1a340" }, 
                        { "value": 50, "color": "#b35806" }, ];

function gen_tooltip(sngl_company_data) {
   var sngl_co_array = []
   sngl_co_array.push(sngl_company_data)

   if (ttip_on == 1) { remove_tooltip(); }
   d3.select("body").selectAll("div#bubble_tooltip").data(sngl_co_array).enter().append("div").attr("id", "bubble_tooltip")
      .style("top", function(d) { return d.y - 105 - d.radius; })
      .style("left", function(d) { return d.x - 125 + d.radius; });

   d3.select("#bubble_tooltip").append("span").html(function(d) { return d.name; });
   d3.select("#bubble_tooltip").append("table").attr("id", "ttip_table").attr("width", "100%");
   d3.select("#ttip_table").selectAll("tr")
      .data( function() {
            var data_values = cols_ttip_display.map(function (arg) { return sngl_co_array[0]["" + arg + ""]; }); 
            var display_names = cols_ttip_display.map(function (arg) { return cols_ttip_display_name["" + arg + ""] }); 
            var sngl_co_ttip_row = [];
            for (var i = 0; i < data_values.length; i++) { sngl_co_ttip_row.push( {"disp_var": display_names[i], "var": data_values[i]} ) }
            return sngl_co_ttip_row;
         })
      .enter().append("tr");
   d3.select("#ttip_table").selectAll("tr").selectAll("td")
      .data(function(d) { return [d.disp_var, d.var]; })
      .enter().append("td").attr("class", "ttip_text")
      .attr("width", function(d, i) { return (i == 0 ? "60%": "40%"); })
      .html(function(d) { return (d > 1000 ? "$" + price_formatter(d) + "M": d); });
}

function remove_tooltip() { d3.select("body").selectAll("#bubble_tooltip").remove(); }

function gen_color_legend() {
   svg_canvas.append("g").attr("id", "clr_legend").selectAll("rect#clr_legend_boxes")
      .data(bubble_color_wheel).enter().append("rect").attr("id", "clr_legend_boxes")
      .attr("x", function(d, i) { return i * 40 })
      .attr("y", 0).attr("width", 40).attr("height", 8)
      .attr("fill", function(d) { return d.color });

   d3.select("g#clr_legend")
      .selectAll("line#clr_ticks")
      .data(bubble_color_wheel).enter().append("line").attr("id", "ticks")
      .attr("stroke", "#666").style("shape-rendering", "crispEdges")
      .style("display", function(d, i) { return (i == 0) ? "none": null;})
      .attr("x1", function(d, i) { return i * 40; }).attr("y1", 0)
      .attr("x2", function(d, i) { return i * 40; }).attr("y2", 10);
   
   d3.select("g#clr_legend")
      .selectAll("text").data(bubble_color_wheel).enter().append("text")
      .attr("class", "legend_txt").attr("x", function(d, i) { return i * 40 }).attr("y", 20)
      .style("display", function(d, i) { return (i == 0) ? "none": null;})      
      .text(function(d) { return d.value + "%" })
      .style("shape-rendering", "crispEdges");

   d3.select("g#clr_legend")
      .attr("transform", "translate(100,500)")
}

function gen_annotation(annote_id, annote_content) {
   var annotation = d3.select("body").append("div").attr("class", "annotation").attr("id", function() { "annotation_" + annote_id; });
   annotation.append("div").attr("id", "arrow_horizontal")
      .style("height", 2).style("left", "10%").style("width", "80%").style("bottom", 95);
   annotation.append("div").attr("id", "arrow_vertical")
      .style("height", 90).style("left", "50%").style("width", "50%");
   annotation.append("div").attr("id", "annotation_content").html(annote_content)
   d3.selectAll("b.annote_span").on("mouseover", function() { 
      var selected = d3.select(this).attr("id");
      d3.selectAll("circle#" + selected).attr("stroke", "black");
      gen_tooltip(d3.selectAll("circle#" + selected).data()[0]);
   })
   d3.selectAll("b.annote_span").on("mouseout", function() { 
      var selected = d3.select(this).attr("id");
      d3.selectAll("circle#" + selected).attr("stroke", "white");
      remove_tooltip();
   })
}
