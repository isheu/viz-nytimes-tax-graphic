function draw_tax_bubble_graphic(canvas_div_id) {
   var chart_height = 400;
   var sectors = ["Industrials", "Health care", "Retailers", "Information technology", "Insurance", "Pharma", "Utilities", "Materials", "Consumer products", "Financials", "Energy", "Telecom"];

   svg_canvas = d3.select("div#" + canvas_div_id).append("svg")
      .attr("id", "main_svg").attr("width", 1600).attr("height", 1600);

   svg_canvas.append("text").attr("class", "agg_heading")
      .text("S&P 500 Companies").style("font-size", 14).style("font-weight", "bold")
      .attr("x", 100)
      .attr("y", 275)
      .attr("fill", "#666")

   var svg_bubble_grp = svg_canvas.append("g").attr("id","bubble_line_grp")
      .attr("transform", "translate(100,0)");

   autocompleting_array = [];
   selection_made = 0;
   ttip_on = 0;
   company_data_agg = [];
   selected_company;

   d3.csv("data/placed_companies_all_2.csv", function(dataset) {   
      dataset.forEach(function(d) {
         company_data_agg.push({ "name": d.name, "capital": +d.capital, "tax_rate": +d.tax_rate, "sector": d.sector, 
              "radius": +d.radius, "x":Math.floor(d.x), "y":Math.floor(d.y) })
      })
      svg_bubble_grp.selectAll("circle.aggregate")
         .data(company_data_agg, function(d) { return d.name; })
         .enter().append("circle")
         .attr("class", "aggregate")
         .attr("fill", function(d) {
         if (d.tax_rate <= 10) { return bubble_color_wheel[0].color }
               else if ((d.tax_rate > 10) & (d.tax_rate <= 20)) { return bubble_color_wheel[1].color }
               else if ((d.tax_rate > 20) & (d.tax_rate <= 30)) { return bubble_color_wheel[2].color }
               else if ((d.tax_rate > 30) & (d.tax_rate <= 40)) { return bubble_color_wheel[3].color }
               else if ((d.tax_rate > 40) & (d.tax_rate <= 50)) { return bubble_color_wheel[4].color }
               else if (d.tax_rate > 50) { return bubble_color_wheel[5].color }
            })
         .attr("id", function(d) { 
            var nopunc_id = d.name.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").replace(" ","").replace(" ","").replace(" ","")
            return nopunc_id; })
         .attr("cx", function(d) { return d.x; })
         .attr("cy", function(d) { return d.y; })
         .attr("r", function(d) { return d.radius; });
      svg_canvas.append("svg:line")
         .attr("class", "x_line").attr("id", "x_line_agg")
         .attr("x1", 100)
         .attr("y1", function() { return chart_height / 2; })
         .attr("x2", 1300)
         .attr("y2", function() { return chart_height / 2; });
               
      var company_name_array = [];
      company_data_agg.forEach(function(d) { company_name_array.push(d.name) });

      
      $(function() { 
         function split(val) { return val.split( /,\s*/ ); }
         function extractLast(term) { return split( term ).pop(); }
         $( "#tags" ).autocomplete({   source: function(request, response) { 
                                          d3.selectAll("circle.aggregate").attr("stroke", null).classed("searching", true) 
                                          autocompleting_array = $.ui.autocomplete.filter(company_name_array, extractLast( request.term ))
                                          d3.selectAll("circle.aggregate").filter(function(d, i) { return (autocompleting_array.indexOf(d.name) != -1); }).attr("stroke", "black").attr("opacity", 1).classed("searching", false)

                                          if ((autocompleting_array.length == 1) & (ttip_on == 0)) {
                                             remove_tooltip();
                                             gen_tooltip(d3.select("#" + autocompleting_array[0].replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").replace(" ","").replace(" ","").replace(" ","") + "").data()[0])
                                             ttip_on = 1;
                                          }
                                          else if (autocompleting_array.length != 1) { 
                                             if (selection_made != 1) {
                                                remove_tooltip();
                                                ttip_on = 0;                                                       
                                             }
                                          }
                                          response( $.ui.autocomplete.filter(company_name_array, extractLast( request.term )).slice(0, 10));
                                          },
                                       close: function() { 
                                          d3.selectAll("circle.aggregate").attr("stroke", null).attr("stroke-width",1).classed("searching", false); 
                                          ttip_on = 0;
                                          d3.selectAll("circle.aggregate").filter(function(d, i) { return d.name == selected_company; })
                                             .attr("stroke-width", 3).attr("stroke", "#cc181e");                                             
                                          },
                                       focus: function() { return false; },
                                       select: function(event, ui) {
                                          remove_tooltip();
                                          /* if (ttip_on == 0) { */
                                             gen_tooltip(d3.select("#" + ui.item.value.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").replace(" ","").replace(" ","").replace(" ","") + "").data()[0])
                                             ttip_on = 1;
                                          // }  
                                          selected_company = d3.select("#" + ui.item.value.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").replace(" ","").replace(" ","").replace(" ","") + "").data()[0].name
                                          console.log(d3.selectAll("circle.aggregate").filter(function(d, i) { return d.name == selected_company; }))
                                          selection_made = 1
                                          var terms = split(this.value)
                                          terms.pop()
                                          terms.push( ui.item.value )
                                          terms.push( "" )
                                          this.value = terms.join( ", " )
                                          return false;
                                       },
                                       change: function() { console.log($("#tags").val()) } });
      });
      d3.selectAll("circle.aggregate").on("mouseover", function(d) {
         remove_tooltip()
         gen_tooltip(d);
         d3.select(this).attr("stroke", "black");
      })
      d3.selectAll("circle.aggregate").on("click", function(d) {
         if (d3.select(this).classed("circle_clicked")) {
            d3.select(this).attr("stroke-width", 1).classed("circle_clicked", 0);
         }
         else {
            d3.selectAll("circle.aggregate").classed("circle_clicked", 0);
            d3.selectAll("circle.aggregate").attr("stroke-width", 1).attr("stroke", null);
            d3.select(this).attr("stroke-width", 3).attr("stroke", "#cc181e").classed("circle_clicked", 1);
         }
      })
      d3.selectAll("circle.aggregate").on("mouseout", function() {
         if (!d3.select(this).classed("circle_clicked")) {
            d3.select(this).attr("stroke", "null");
            remove_tooltip()
         }
      });
   })

   var company_data_split = [];
   d3.csv("data/placed_companies_by_sector_2.csv", function(dataset) {
      dataset.forEach(function(d) {
         company_data_split.push({ "name": d.name, "capital": d.capital, "tax_rate": +d.tax_rate, "sector": d.sector, 
              "radius": +d.radius, "x":Math.floor(d.x), "y":Math.floor(d.y) })
      })
   })

   d3.select("div#" + canvas_div_id).append("div")
      .attr("id", "options")
      .style("top", 10)
      .style("left", 145)
      .style("position", "absolute");


   d3.select("div#options").append("button")
      .attr("id", "tutorial_button")
      .attr("class", "ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only")
      .style("width", 75).style("position", "absolute").style("top", 5).style("left", 750).style("opacity", 0.5)
      .html("Tutorial")
      .on("click", function() {
         if (d3.select("div#options").select("button").classed("walkthru")) {
            end_walkthrough(); 
            d3.select("div#options").select("button").classed("walkthru", 0);
            }
         else { 
            start_walkthrough();
            d3.select("div#options").select("button").classed("walkthru", 1); 
         }
      });


   var toggle_to_data = company_data_split;
   var viz_state = 0; 
   var viz_state_to = 1;
   d3.select("div#options").append("button")
      .attr("class", "ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only")
      .attr("id", "by_sector_button")
      .style("width", 75)
      .html("By Sector")
      .on("click", function() {
         end_walkthrough()
         svg_canvas.select("#x_line_agg")
            .attr("opacity", viz_state_to).transition().duration(900)
            .attr("opacity", viz_state);
         d3.select("div.annotation") .style("z-index", 2)
            .style("opacity", viz_state_to).transition().duration(1200)
            .style("opacity", viz_state).transition()
            .style("z-index", function() { return viz_state == 0 ? -2 : 2; });

         svg_canvas.select("g#clr_legend")               
            .transition().duration(1200)
            .attr("transform", function() { return "translate(225," + 15 + ")"; });

         svg_bubble_grp.selectAll("circle.aggregate")
            .data(toggle_to_data, function(d) { return d.name; })
            .transition().duration(900)
            .delay(function(d) { return (d.tax_rate / 100) * 900; })
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; })
         if (toggle_to_data == company_data_agg) { 
               svg_canvas.select("g#x_ruler").transition().duration(1250).attr("transform", "translate(100,75)")
               svg_canvas.selectAll("line#by_sector")
                  .transition().duration(600).style("opacity",0).remove()
               svg_canvas.selectAll("text.sector_heading")
                  .transition().duration(600).style("opacity",0).remove()
               svg_canvas.selectAll("text.agg_heading")
                  .transition().duration(600).style("opacity",1).attr("z-index", 2);
               toggle_to_data = company_data_split
               viz_state = 0
               viz_state_to = 1; 
            }
         else { 
               svg_canvas.select("g#x_ruler").transition().duration(1250).attr("transform", "translate(100,225)")
               svg_canvas.selectAll("line#by_sector")
                  .data(sectors)
                  .enter().append("line")
                  .style("shape-rendering", "crispEdges")
                  .attr("id", "by_sector")
                  .attr("stroke", "#666").attr("stroke-width",1)
                  .attr("x1", 100).attr("x2", 1300)
                  .attr("y1", function(d, i) { return (i + 1) * 100 + (400 / 2); })
                  .attr("y2", function(d, i) { return (i + 1) * 100 + (400 / 2); })
                  .style("opacity", 0)
                  .transition().duration(750)
                  .style("opacity", 1);
               svg_canvas.selectAll("text.sector_heading")
                  .data(sectors_w_comments).enter().append("text")
                  .attr("class", "sector_heading")
                  .attr("id", function(d) { return d.sector + "_heading"; })
                  .attr("x", 100)
                  .attr("y", function(d, i) { return (i * 100) + 275; })
                  .text(function(d) { return d.sector; })
                  .style("opacity", 0)
                  .transition().duration(750)
                  .style("opacity", 1);
               svg_canvas.selectAll("text.agg_heading")
                  .transition().duration(600).style("opacity",0).attr("z-index", -2);
               toggle_to_data = company_data_agg 
               viz_state = 1
               viz_state_to = 0; 
            }
      });
   gen_color_legend()
   gen_size_legend()
   gen_x_ruler()

   var low_tax_note = "About one of every seven companies had an effective tax rate lower than 10 percent, including <b id = 'AmazoncomInc' class='annote_span'>Amazon</b> at 6 percent and <b id = 'VerizonCommunicationsInc' class='annote_span'>Verizon</b> at 9 percent. Nine companies paid no taxes at all."
   gen_annotation(1, low_tax_note)
}
