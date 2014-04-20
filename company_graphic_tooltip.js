var sectors_w_comments = 
   [{"sector":"Industrials", "sector_eff_tax": 24, "sector_comments":"As with the corporate sector, large industrial companies — like Boeing, Caterpillar, General Electric and Honeywell — pay lower taxes on average than small companies."}, 
   {"sector":"Health care", "sector_eff_tax": 28, "sector_comments":"Within health care, managed care companies pay relatively higher tax rates, and makers of equipment, supplies and technology pay relatively lower rates."}, 
   {"sector":"Retailers", "sector_eff_tax": 34, "sector_comments":"Brick-and-mortar retailers, like Bed Bath & Beyond and Home Depot, tend to pay high tax rates. Online retailers, like Amazon, face low rates"}, 
   {"sector":"Information technology", "sector_eff_tax": 21, "sector_comments":"Technology companies can often move operations overseas for accounting purposes. And younger firms tend to have recent losses, holding down the sector’s overall rate"}, 
   {"sector":"Insurance", "sector_eff_tax": 51, "sector_comments":"As with the corporate sector, large industrial companies — like Boeing, Caterpillar, General Electric and Honeywell — pay lower taxes on average than small companies"}, 
   {"sector":"Pharma", "sector_eff_tax": 26, "sector_comments":"Tax breaks for research and the ability to locate operations in low-tax countries have helped pharmaceutical and biotech companies to pay low taxes"}, 
   {"sector":"Utilities", "sector_eff_tax": 12, "sector_comments":"Utilities benefited from the 2009 stimulus bill, which included tax breaks for companies that make capital-intensive investments, like power plants"}, 
   {"sector":"Materials", "sector_eff_tax": 31, "sector_comments":"The materials industry (chemicals, minerals, etc.) exemplifies a point often made by tax experts: within industries, tax rates vary greatly, in ways that often evade simple explanation"}, 
   {"sector":"Consumer products", "sector_eff_tax": 28, "sector_comments":"Movie studios and packaged-food company pay more than 30 percent, on average. Soft-drink companies pay only 19 percent, and restaurant companies, 25 percent"}, 
   {"sector":"Financials", "sector_eff_tax": 33, "sector_comments":"As financial firms have recovered from the crisis, some have paid relatively high tax rates"}, 
   {"sector":"Energy", "sector_eff_tax": 37, "sector_comments":"Large oil companies typically pay high rates, but some economists argue that the high rates do not cover the pollution costs imposed on society"}, 
   {"sector":"Telecom", "sector_eff_tax": 26, "sector_comments":"Verizon had a much lower effective tax rate than its rival AT&T, despite having similar profits over the six-year period."}];

bubble_color_wheel = [  { "value": 0, "color": "#542788" }, 
                        { "value": 10, "color": "#998ec3" }, 
                        { "value": 20, "color": "#d8daeb" }, 
                        { "value": 30, "color": "#fee0b6" }, 
                        { "value": 40, "color": "#f1a340" }, 
                        { "value": 50, "color": "#b35806" }, ];

var cols_ttip_display = ["capital", "tax_rate", "sector"];
var cols_ttip_display_name = {"capital":"Market Capitalization", "tax_rate":"Effective Tax Rate", "sector":"Sector"};

function gen_tooltip(sngl_company_data) {
   var sngl_co_array = []
   sngl_co_array.push(sngl_company_data)
   // d3.selectAll("circle.aggregate").filter(function(d, i) { return d.name == sngl_co_array[0].name; }).attr("stroke", "maroon")

   if (ttip_on == 1) { remove_tooltip(); }
   d3.select("body").selectAll("div#bubble_tooltip").data(sngl_co_array).enter().append("div").attr("id", "bubble_tooltip")
      .style("top", function(d) { return d.y - 105 - d.radius; })
      .style("left", function(d) { return d.x - 125 + d.radius + 100; });

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
      .attr("class", "legend_txt").attr("x", function(d, i) { return i * 41 }).attr("y", 20)
      .style("display", function(d, i) { return (i == 0) ? "none": null;})      
      .text(function(d) { return d.value + "%" })
      .style("shape-rendering", "crispEdges");

   d3.select("g#clr_legend")
      .append("text")
      .text("Eff. Tax Rate")
      .attr("class", "legend_txt")
      .attr("x", 275).attr("y", 9)
      .style("shape-rendering", "crispEdges");

   d3.select("g#clr_legend")
      .attr("transform", "translate(225,15)")
}

function gen_size_legend() {
   var size_legend_array = [  {"capital_M":1000, "capital_txt":"$1B", "x": 395}, 
                              {"capital_M":10000, "capital_txt":"$10B", "x": 430}, 
                              {"capital_M":50000, "capital_txt":"$50B", "x": 475}, 
                              {"capital_M":100000, "capital_txt":"$100B", "x": 525}];
   svg_canvas.append("g").attr("id", "size_legend")
      .selectAll("circle#size_legend")
      .data(size_legend_array).enter().append("circle")
      .attr("cx", function (d) { return d.x; }).attr("cy", 7)
      .attr("fill", "none").attr("stroke", "#999")
      .attr("r", function(d) { return ((Math.sqrt(d.capital_M) / Math.sqrt(250000)) * 17) });
   svg_canvas.select("g#size_legend")
      .selectAll("text#size_legend")
      .data(size_legend_array).enter().append("text").attr("id","size_legend")
      .attr("x", function(d,i) { return d.x + (i + 1) * 3; }).attr("y", 10)
      .attr("text-anchor", "start")
      .text(function(d) { return d.capital_txt; });
   d3.select("g#size_legend")
      .attr("transform", "translate(225,15)")
}

function gen_x_ruler() {
   var x_ruler_ticks = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
   var x_ruler = svg_canvas.append("g").attr("id", "x_ruler")
   x_ruler.append("line").attr("class", "x_ruler")
      .attr("stroke", "#666").attr("stroke-dasharray", "1 1")
      .style("shape-rendering", "crispEdges")
      .attr("x1", 0).attr("x2", 1200)
      .attr("y1", 0).attr("y2", 0)
   x_ruler.selectAll("line#x_ruler_ticks").data(x_ruler_ticks)
      .enter().append("line").attr("id", "x_ruler_ticks")
      .attr("stroke", "#666")
      .style("shape-rendering", "crispEdges")
      .attr("x1", function(d) { return 17 * d; })
      .attr("x2", function(d) { return 17 * d; })
      .attr("y1", 0).attr("y2", 5)
   x_ruler.selectAll("text#x_ruler_ticks").data(x_ruler_ticks).enter().append("text")
      .text(function(d) { return d + "%"; }, String).attr("y", 15).attr("id", "x_ruler_ticks")
      .attr("fill", "#666").style("shape-rendering", "crispEdges").style("text-anchor", "middle")
      .attr("x", function(d) { return 17 * d; });
   x_ruler.attr("transform", "translate(100,75)")
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
