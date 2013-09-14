function reel_label(hcpcs_div, code) {
   function gen_reel_label() {
      d3.select("div#" + hcpcs_div).selectAll("div#bubble_" + code)
         .data(hcp_select.filter(function(d) { return d.hcpcs == code; }))
         .enter().append("div")
         .attr("id", function(d, i) { return "bubble_" + code; })
         .attr("class", "hcpcs_bubble")
         .style("margin-top", 4).style("margin-bottom", 4).style("margin-left", 4);
      d3.select("div#bubble_" + code).append("table")
         .attr("id", function() { return "bubble_table_" + code; })
         .attr("width", "100%")
         .append("thead").append("td").attr("width", "100%").attr("height", 100).style("text-align", "center").style("vertical-align", "bottom")
         .html(function(d) { return "<h1>" + d.hcpcs + "</h1>"; });
      d3.select("#bubble_table_"  + code).append("tr").append("td").style("text-align", "center")
         .html(function(d) { return d.description; });
   }
   return gen_reel_label;
}

function year_linechart(hcpcs, line_div_id, plot_id, codename) {
   var x_padding = 35, y_padding = 10;
   var x_plot_displace = 10, y_plot_displace = 5;
   var width = 175;
   var height = 140;
   var x_domain = [2010,2013];
   var y_domain = [150000000, 0];
   var x_scale = d3.scale.linear().domain(x_domain).range([0, width - x_padding]);
   var y_scale = d3.scale.linear().domain(y_domain).range([0, height - y_padding]);
   var yr_formatter = d3.format("g");

   function gen_linechart() {
      var code_yr_filt_data = hcpcs_yearly_data.filter(function(d) { return d.hcpcs == hcpcs; });
      var x_axis = d3.svg.axis().scale(x_scale)
         .orient("bottom")
         .ticks(4).tickSubdivide(0).tickSize(6,3,0)
         .tickFormat(function(d) { return yr_formatter(d); } );

      var y_axis = d3.svg.axis().scale(y_scale)
         .orient("left")
         .ticks(6).tickSubdivide(4).tickSize(6,3,0)
         .tickFormat(function(d) { return "$" + price_formatter(d); } );

      var svg = d3.select("svg#" + line_div_id + "_svg")
         .attr("shape-rendering", "crispEdges")
         .attr("width", 250)
         .attr("height", 170);
      
      svg
         .append("g")
         .attr("id", function() { return plot_id + "_line_pane"; })
         .attr("transform", function() { return "translate(175,0)"});

      d3.selectAll("#" + plot_id + "_line_pane")
         .append("rect")
         .attr("fill", "rgba(255,255,255,0.55)")
         .attr("x", 0).attr("y", 0)
         .attr("height", 160)
         .attr("width", 200)
         .on("mouseover", function() { d3.select(this).attr("stroke", "#999") })         
         .on("mouseout", function() { d3.select(this).attr("stroke", "transparent") })
         .on("click", function() { 
            d3.select("#" + codename + "_bar_stacked_pane")
               .transition().duration(500)
               .attr("transform", function() { return "translate(500,0)"})
            d3.select("#" + codename + "_npi_scatter_pane")
               .transition().duration(500)
               .attr("transform", function() { return "translate(685,0)"})
         });

      d3.select("#" + plot_id + "_line_pane")
         .append("g").attr("class", "x axis")
         .append("line").attr("id", "axis")
         .attr("x1", function() { return 0; })
         .attr("y1", 0)
         .attr("x2", function() { return width - x_padding; })
         .attr("y2", 0)
      svg.select("#" + plot_id + "_line_pane").select(".x.axis")
         .attr("transform", function() { return "translate(" + (x_plot_displace + x_padding) + "," + (height) + ")"})
         .call(x_axis);
      d3.select("#" + plot_id + "_line_pane")
         .append("g").attr("class", "y axis")
         .append("line").attr("id", "axis")
         .attr("x1", 0)
         .attr("y1", 0)
         .attr("x2", 0)
         .attr("y2", function() { return height - y_padding; })
      svg.select("#" + plot_id + "_line_pane").select(".y.axis")
         .attr("transform", function() { return "translate(" + (x_plot_displace + x_padding) + "," + (y_padding) + ")"})
         .call(y_axis);
      
      var linechart_line = d3.svg.line()
         .x(function(d) { return x_scale(d.year) + x_plot_displace + x_padding; })
         .y(function(d) { return y_scale(d.yr_pmt) + y_padding; })
         .interpolate("linear");

      d3.select("#" + plot_id + "_line_pane")
         .append("path")
         .attr("d", function() { return linechart_line(code_yr_filt_data); })
         .attr("id", function() { return hcpcs + "_trend"; })
         .style("shape-rendering", "auto")
         .attr("fill", "transparent")
         .attr("stroke-width", 2)
         .attr("stroke", "#406584");

      d3.select("#" + plot_id + "_line_pane").selectAll("circle")
         .data(code_yr_filt_data).enter().append("circle")
         .style("shape-rendering", "auto")
         .attr("cx", function(d) { return x_scale(d.year) + x_plot_displace + x_padding; })
         .attr("cy", function(d) { return y_scale(d.yr_pmt) + y_padding; })
         .attr("r", 2)
         .attr("fill", "#406584")
         .attr("stroke-width", 5)
         .attr("stroke", "transparent");
      
      d3.select("g#" + plot_id + "_line_pane").selectAll("circle")
         .on("mouseover", function() { 
            d3.select(this).attr("fill", "#cc181e"); 
            gen_chart_tip(d3.select(this).data()[0].year, d3.select(this).attr("cx"), d3.select(this).attr("cy"))
            })
         .on("mouseout", function() {
            d3.select(this).attr("fill", "#406584");
            remove_chart_tip();
            });
      
      d3.select("#" + plot_id + "_line_pane").append("g").attr("id","chart_ttip");
      function gen_chart_tip(year, year_x, year_y) {
         var charttip_data = code_yr_filt_data.filter(function(d) { return (d.year == year); });
         d3.select("#" + plot_id + "_line_pane").select("g#chart_ttip").selectAll("text")
            .data(charttip_data).enter().append("text")
            .style("shape-rendering", "crispEdges")
            .text(function(d) { return "$" + price_formatter_full(+d.yr_pmt.toPrecision(3)); })
            .attr("text-anchor", "middle")
            .attr("x", function() { return 0 + (+year_x); })
            .attr("y", function() { return (+year_y) - 6; })
            .attr("fill", "#333");
      }
      function remove_chart_tip() { d3.select("#" + plot_id + "_line_pane").select("g#chart_ttip").selectAll("text").remove() };
   }
   return gen_linechart;
}

function npi_scatterplot(hcpcs, scatter_div_id, plot_id, codename) {
   var x_padding = 30, y_padding = 10;
   var x_plot_displace = 10, y_plot_displace = 5;
   var width = 175;
   var height = 140;
   var x_domain = [1,10];
   var y_domain = [100, 0];
   var x_scale = d3.scale.linear().domain(x_domain).range([0, width - x_padding]);
   var y_scale = d3.scale.linear().domain(y_domain).range([0, height - y_padding]);

   function gen_scatterplot() {
      var npi_code_filt_data = hcpcs_top_npi_data.filter(function(d) { return d.hcpcs == hcpcs; });
      var x_axis = d3.svg.axis().scale(x_scale)
         .orient("bottom")
         .ticks(10).tickSubdivide(4).tickSize(6,3,0);

      var y_axis = d3.svg.axis().scale(y_scale)
         .orient("left")
         .ticks(6).tickSubdivide(4).tickSize(6,3,0)
         .tickFormat(function(d) { return d + "%"; } );

      var svg = d3.select("#" + scatter_div_id + "_svg")
         .attr("shape-rendering", "crispEdges")
         .attr("width", 200)
         .attr("height", 170);
      
      svg
         .append("g")
         .attr("id", function() { return plot_id + "_scatter_pane"; })
         .attr("transform", function() { return "translate(600,0)"});

      d3.selectAll("#" + plot_id + "_scatter_pane")
         .append("rect")
         .attr("fill", "rgba(255,255,255,0.55)")
         .attr("x", 0)
         .attr("y", 0)
         .attr("height", 400)
         .attr("width", 200);

      d3.select("#" + plot_id + "_scatter_pane")
         .append("g").attr("class", "x axis")
         .append("line").attr("id", "axis")
         .attr("x1", function() { return 0; })
         .attr("y1", 0)
         .attr("x2", function() { return width - x_padding; })
         .attr("y2", 0)
      svg.select("#" + plot_id + "_scatter_pane").select(".x.axis")
         .attr("transform", function() { return "translate(" + (x_plot_displace + x_padding) + "," + (height) + ")"})
         .call(x_axis);
      d3.select("#" + plot_id + "_scatter_pane")
         .append("g").attr("class", "y axis")
         .append("line").attr("id", "axis")
         .attr("x1", 0)
         .attr("y1", 0)
         .attr("x2", 0)
         .attr("y2", function() { return height - y_padding; })
      svg.select("#" + plot_id + "_scatter_pane").select(".y.axis")
         .attr("transform", function() { return "translate(" + (x_plot_displace + x_padding) + "," + (y_padding) + ")"})
         .call(y_axis);

      d3.select("g#" + plot_id + "_scatter_pane").selectAll("circle")
         .data(npi_code_filt_data)
         .enter().append("circle")
         .style("shape-rendering", "auto")
         .attr("fill", function(d) {
            if (d.year == 2010) { return "#406584"; }
            else if (d.year == 2011) { return "#407524"; }
            else if (d.year == 2012) { return "#808514"; }
            else if (d.year == 2013) { return "#401504"; }
         })
         .attr("stroke-width", 7)
         .attr("stroke", "transparent")
         .attr("cx", function(d) { return x_scale(d.top_x) + x_plot_displace + x_padding; })
         .attr("cy", function(d) { return y_scale(d.cumul_p_excess_pmt) + y_padding ; })
         .attr("r", 2);
      
      /*
      auc_shader(5);
      function auc_shader(top_x_value) {
         var top_x_data = npi_code_filt_data.filter(function(d) { return (d.top_x <= top_x_value); });
         var scatter_line = d3.svg.area()
            .x(function(d) { return x_scale(d.top_x) + x_plot_displace + x_padding; })
            .y0(function(d) { return y_scale(0) + y_padding; })
            .y1(function(d) { return y_scale(d.npi_p_excess_pmt) + y_padding; })
            .interpolate("basis");

         d3.select("g#opiate_scatter_pane")
            .append("path")
            .attr("d", function() { return scatter_line(top_x_data); })
            .attr("id", "interpolate")
            .attr("fill", "#cc181e")
            .attr("opacity", 0.75)
            .attr("stroke", "#333");
      }
      */

      d3.select("g#" + plot_id + "_scatter_pane").selectAll("circle")
         .on("mouseover", function() { 
            d3.select(this).classed("scatter_hover", 1)
            d3.select(this).attr("stroke", "#7c152a");
            gen_chart_tip("chart_ttip", d3.select(this).data()[0].npi, d3.select(this).attr("cx"), d3.select(this).attr("cy"))
            })
         .on("mouseout", function() {
            d3.select(this).classed("scatter_hover", 0)            
            d3.select(this).attr("stroke", "transparent");            
            remove_chart_tip("chart_ttip");
            })
         .on("click", function() {
            if (!d3.select(this).classed("scatter_click")) {
               d3.select("g#" + plot_id + "_scatter_pane").selectAll("circle.scatter_click")
                  .attr("r", 2)
                  .attr("stroke-width", 7)
                  .classed("scatter_click", 0)
               remove_chart_tip("chart_ttip_clicked");

               var store_npi = d3.select(this).data()[0].npi;
               d3.select("g#" + plot_id + "_scatter_pane").selectAll("circle").filter(function(d, i) { return (d.npi == store_npi); })
                  .attr("r", 6)
                  .attr("stroke-width", 1)
                  .classed("scatter_click", 1)
               gen_chart_tip("chart_ttip_clicked", d3.select(this).data()[0].npi, d3.select(this).attr("cx"), d3.select(this).attr("cy"))
               gen_npi_stat_table(d3.select(this).data()[0].npi)
            }
            else {
               d3.select("g#" + plot_id + "_scatter_pane").selectAll("circle.scatter_click")
                  .attr("r", 2)
                  .attr("stroke-width", 7)
                  .classed("scatter_click", 0)
               remove_chart_tip("chart_ttip_clicked");
            }
         });
      
      d3.select("#" + plot_id + "_scatter_pane").append("g").attr("id","chart_ttip_clicked");
      d3.select("#" + plot_id + "_scatter_pane").append("g").attr("id","chart_ttip");
      function gen_chart_tip(ttip_id, npi_value, npi_x, npi_y) {
         var charttip_data = npi_code_filt_data.filter(function(d) { return (d.npi == npi_value); });
         d3.select("#" + plot_id + "_scatter_pane").select("g#" + ttip_id).selectAll("text")
            .data(charttip_data).enter().append("text")
            .style("shape-rendering", "crispEdges")
            .text(function(d) { return d.name; })
            .attr("text-anchor", "start")
            .attr("x", function() { return 0 + (+npi_x); })
            .attr("y", function() { return (+npi_y) - 6; })
            .attr("fill", "#333");
      }
      function remove_chart_tip(ttip_id) { d3.select("#" + plot_id + "_scatter_pane").select("g#" + ttip_id).selectAll("text").remove(); };

      d3.select("#" + scatter_div_id).append("div").attr("id", function() { return codename + "_npi_table"; }).attr("class", "npi_stat_table");
      function gen_npi_stat_table(npi_value) {
         var table_data = npi_code_filt_data.filter(function(d) { return (d.npi == npi_value) & (+d.year == 2013); });
         d3.select("#" + scatter_div_id).select("#" + codename + "_npi_table")
            .style("height", 160).style("width", 400).style("left", 815)
            .style("top", function() {
               if (codename == "opiate") { return 15; }
               else if (codename == "chromatography") { return 192; }
               else if (codename == "mass_spectrometry") { return 365; }
               });

         d3.select("#" + codename + "_npi_table").selectAll("table#" + codename + "_npi_stats")
            .data(table_data).enter()
            .append("table").attr("id", function() { return codename + "_npi_stats"; })
            .attr("width", "100%")
            .append("thead").append("td").attr("colspan", 2)
            .html(function(d) { return d.name; })
         
         d3.select("#" + codename + "_npi_table").select("table#" + codename + "_npi_stats")
            .append("tr").attr("id", "row_1").append("td").classed("metric_name", 1)
            .html("Specialty: ");
         d3.select("#" + codename + "_npi_table").select("table#" + codename + "_npi_stats").select("tr#row_1")
            .append("td").classed("metric_value", 1)
            .html(function(d) { return d.classification; });

         d3.select("#" + codename + "_npi_table").select("table#" + codename + "_npi_stats")
            .append("tr").attr("id", "row_2").append("td").classed("metric_name", 1)
            .html("% of Excess Benes: ");
         d3.select("#" + codename + "_npi_table").select("table#" + codename + "_npi_stats").select("tr#row_2")
            .append("td").classed("metric_value", 1)
            .html(function(d) { return d.npi_p_excess_benes; });
      }

      /*
      d3.select("#" + plot_id + "_scatter_pane").append("g").attr("id","chart_ttip");
      function gen_chart_tip(npi_value) {
         var charttip_data = npi_code_filt_data.filter(function(d) { return (d.npi == npi_value); });
         d3.select("g#chart_ttip").selectAll("line")
            .data(charttip_data).enter().append("line")
            .attr("x1", function(d) { return x_scale(d.top_x) + x_plot_displace + x_padding; })
            .attr("x2", function(d) { return x_scale(20) + x_plot_displace + x_padding; })
            .attr("y1", function(d) { return y_scale((d.cumul_p_excess_pmt)/2) + y_padding; })
            .attr("y2", function(d) { return y_scale((d.cumul_p_excess_pmt)/2) + y_padding; })
            .attr("stroke", "#cc181e");
      }
         */      
   }
   return gen_scatterplot;
}


function stackedbar(hcpcs, stacked_div_id, plot_id, codename) {
   var x_buffer = 15;
   var x_padding = 30, y_padding = 10;            
   var x_plot_displace = 10, y_plot_displace = 5;
   var width = 100;
   var height = 140;
   var x_domain = [2010,2013];
   var y_domain = [100, 0];
   var x_scale = d3.scale.linear().domain(x_domain).range([0, width - x_padding]);
   var y_scale = d3.scale.linear().domain(y_domain).range([0, height - y_padding]);
   
   function gen_stackedbar() {
      var select_code_data = hcpcs_yearly_data.filter( function(d) { return d.hcpcs == hcpcs; })
      var x_axis = d3.svg.axis().scale(x_scale)
         .orient("bottom")
         .ticks(4).tickSubdivide(0).tickSize(6,3,0)
         .tickFormat(function(d) { 
            if (d == 2010) { return "'10"; }
            else if (d == 2011) { return "'11"; }
            else if (d == 2012) { return "'12"; }
            else if (d == 2013) { return "'13"; }
         });                   

      var y_axis = d3.svg.axis().scale(y_scale)
         .orient("left")
         .ticks(6).tickSubdivide(4).tickSize(6,3,0)
         .tickFormat(function(d) { return d + "%"; } );

      var svg = d3.select("#" + stacked_div_id + "_svg")
         .attr("shape-rendering", "crispEdges")
         .attr("width", 225)
         .attr("height", 170);

      svg
         .append("g")
         .attr("id", function() { return plot_id + "_stacked_pane"; })
         .attr("transform", function() { return "translate(415,0)"});

      d3.selectAll("#" + plot_id + "_stacked_pane")
         .append("rect")
         .attr("fill", "rgba(255,255,255,0.55)")
         .attr("x", 0)
         .attr("y", 0)
         .attr("width", 150)
         .attr("height", 170);         

      d3.select("#" + plot_id + "_stacked_pane")
         .append("g").attr("class", "x axis")
         .append("line").attr("id", "axis")
         .attr("x1", function() { return - x_buffer; })
         .attr("y1", 0)
         .attr("x2", function() { return width - x_padding + 8; })
         .attr("y2", 0)
      svg.select("#" + plot_id + "_stacked_pane").select(".x.axis")
         .attr("transform", function() { return "translate(" + (x_plot_displace + x_padding + x_buffer) + "," + (height) + ")"})
         .call(x_axis);
      d3.select("#" + plot_id + "_stacked_pane")
         .append("g").attr("class", "y axis")
         .append("line").attr("id", "axis")
         .attr("x1", 0)
         .attr("y1", 0)
         .attr("x2", 0)
         .attr("y2", function() { return height - y_padding; })
      svg.select("#" + plot_id + "_stacked_pane").select(".y.axis")
         .attr("transform", function() { return "translate(" + (x_plot_displace + x_padding) + "," + (y_padding) + ")"})
         .call(y_axis);

      d3.select("g#" + plot_id + "_stacked_pane").selectAll("rect#yearly_mue")
         .data(select_code_data)
         .enter().append("rect")
         .attr("id", "yearly_mue")
         .attr("x", function(d) { return x_scale(d.year) + x_plot_displace + x_padding - 8 + x_buffer; })
         .attr("y", function(d) { return y_scale(d.yr_p_excess_pmt) + y_padding ; })
         .attr("height", function(d) { return height - (y_scale(d.yr_p_excess_pmt) + y_padding); })
         .attr("fill", "#7c152a")
         .attr("width", 16);

      d3.select("g#" + plot_id + "_stacked_pane").selectAll("rect#yearly_non")
         .data(select_code_data)
         .enter().append("rect")
         .attr("id", "yearly_non")
         .attr("x", function(d) { return x_scale(d.year) + x_plot_displace + x_padding - 8 + x_buffer; })
         .attr("y", function(d) { return y_scale(100) + y_padding ; })
         .attr("height", function(d) { return (y_scale(d.yr_p_excess_pmt)); })
         .attr("fill", "#e6ce9d")
         .attr("width", 16);
   }
   return gen_stackedbar;
}

/*
   d3.select("body").append("div").attr("id", "opiate_metric_table").style("height", 160).style("margin-left", 300);
   var opiate_table_data =[];
   var opiate_table = metric_table("83925", "0111111111", "opiate_metric_table", "opiate_table")
   opiate_table()
   function metric_table(hcpcs, npi, mtable_div_id, plot_id) {
      var npi_data = hcpcs_top_npi_data.filter(function(d) { return (d.hcpcs == hcpcs) & (d.npi == npi); });
      function gen_metric_table() {
         d3.select("#" + mtable_div_id).selectAll("table#table_" + hcpcs + "_" + npi)
            .data(npi_data).enter()
            .append("table")
            .attr("class", "metric_table")
            .attr("id", function() { return "table_" + hcpcs + "_" + npi; })
            .append("thead").append("td")
         d3.select("#table_" + hcpcs + "_" + npi + " thead td")
            .style("border-bottom", "#cc181e")
            .style("border-bottom-style", "solid")
            .style("border-bottom-width", 1)
            .html(function(d) { return d.npi; });
      }
      return gen_metric_table;
   }
*/
