// Create programmatic "resistance" but not barrier if a circle crosses its bin
// Can I modify the treemap layout to randomize/alternative large squares?
// what are those DOM exceptions?
function pack_filtered_data() {
   var sel_sector;
   var index;
   var subchart_trans_y;
   function filter_and_pack() {
      var filt_data;
      filt_data = d3.nest()
         .key(function(d) { return d.tax_rate_bin; })
         .entries(company_data.filter(function(d) { return d.sector == sel_sector; }));
      max_binheight = 100;
      ndata_tot_size = [], max_tot_size = 0, ndata_binheight = [];

      for (var i = 0; i < filt_data.length; i++) {
         ndata_tot_size[i] = 0;
         nested_data[i].values.forEach(function(d) { ndata_tot_size[i] += d.capital })
         if (ndata_tot_size[i] > max_tot_size) { max_tot_size = ndata_tot_size[i]; }
      }
      for (var i = 0; i < filt_data.length; i++) {
         ndata_binheight[i] = max_binheight * (Math.sqrt(ndata_tot_size[i]) / Math.sqrt(max_tot_size))
      }
      var line_ticks = []
      for (var i = 0; i < filt_data.length; i++) {         
         line_ticks[i] = sgm_on_line(binwidth, ndata_binheight[i], filt_data[i].values[0].tax_rate_bin, filt_data[i], subchart_trans_y);
         line_ticks[i]()
      }

      var filt_flattened_data_w_pos = [];
      var filt_data_flatten = flatten_placed_bubbles("f_circle_" + index, filt_flattened_data_w_pos, subchart_trans_y)
      
      var filt_tick_fn = cluster_tick_fn()
      filt_tick_fn.set_obj_id("f_circle_" + index).set_data_id(filt_flattened_data_w_pos)

      var filt_data_cluster_fn;
      var filt_cluster_force = d3.layout.force()
      
      setTimeout(filt_data_flatten, 500);
      setTimeout(function() {            
         filt_data_cluster_fn = apply_cluster_force_algo("f_circle_" + index, filt_flattened_data_w_pos, filt_tick_fn, filt_cluster_force)
      }, 1250);         
      setTimeout(filt_data_cluster_fn, 1500);
   }
   filter_and_pack.set_sector = function(sec) {
      sel_sector = sec;
      return filter_and_pack;
   }
   filter_and_pack.set_index = function(ix) {
      index = ix;
      subchart_trans_y = subchart_1_trans_y * (ix + 1);
      return filter_and_pack;
   }
   return filter_and_pack;
}

function flatten_placed_bubbles(out_circle_id, dataset_id, y_displace) {
   function flatten_placed_bubbles() {
      d3.selectAll(".by_tick_circle").data().forEach(function(d, i) {
            dataset_id[i] =  {
               "radius": d.radius, 
               "x": d.x + (d.t_value / 2) * (binwidth + svg_margin), 
               "y": d.y + main_chart_trans_y + y_displace + (svg_height - d.theight) / 2, 
               "t_value": d.t_value, 
               "capital": d.capital,
               "tax_rate_bin": d.tax_rate_bin,
               "name": d.name, 
               "sector": d.sector, 
               "tax_rate": d.tax_rate}
            });
      d3.selectAll("div.tick").remove()
      main_svg.selectAll("." + out_circle_id)
         .data(dataset_id, function(d) { return d.name; })
         .enter().append("circle")
         .attr("class", out_circle_id).attr("id", function(d) { return d.name; })
         .attr("fill", function(d) { return "rgba(96,96,96," + 0.35 * ((d.t_value / 2) % 2 + 1) + ")" ; })
         .attr("cx", function(d, i) { return d.x; })
         .attr("cy", function(d) { return d.y; })
         .attr("r", function(d) { return d.radius; });
   }
   return flatten_placed_bubbles;
}

function apply_cluster_force_algo(obj_id, dataset, tick_fn, force_layout) {
   force_layout
      .nodes(dataset).size([800, 600])
      .gravity(0).friction(0.1).charge(1)
      .on("tick", tick_fn)
      .start();
}

function sgm_on_line(twidth, theight, tvalue, dataset, translate_y) {
   var tmap = d3.layout.treemap()
      .size([twidth,theight])
      .children(function(d) { return d.values; })
      .value(function(d) { return d.capital; });

   var tick_num = d3.select("body")
      .append("div").attr("id", "tick_" + tvalue)
      .attr("class", "tick")
      .style("position", "absolute")
      .style("left", function() { return (tvalue / 2) * svg_margin + (tvalue / 2) * twidth; })
      .style("top", function() { return translate_y + (svg_height - theight) / 2 });

   var svg = d3.selectAll("#tick_" + tvalue).append("svg:svg")
      .attr("width",twidth + 2 * svg_margin).attr("height",theight)

   var new_data = [];
   function generate_sgm_layout() {
      tmap.nodes(dataset).forEach(function(d, i) {
            new_data[i] = {"radius":((Math.sqrt(+d.capital) / Math.sqrt(250000)) * max_radius), "x": (d.x + (d.dx / 2) + svg_margin), "y": (d.y + (d.dy / 2) + svg_margin), "t_value": tvalue, "theight": theight, "name": d.name, "sector": d.sector, "tax_rate": d.tax_rate, "capital":+d.capital}
         });
      new_data = new_data.filter(function(d) { return d.radius > 0; })
      
      svg.selectAll("circle.by_tick_circle")
         .data(new_data)
         .enter().append("circle")
         .attr("id", function(d) { return d.name; })
         .attr("class", "by_tick_circle")
         .attr("fill", "#333")
         .attr("stroke", "white")
         .attr("stroke-width", 1)
         .attr("cx", function(d, i) { return d.x;})
         .attr("cy", function(d) { return d.y})
         .attr("r", function(d) { return d.radius; });

      var force = d3.layout.force()
          .nodes(new_data)
          .size([twidth, theight])
          .gravity(0.08)
          .friction(0.1)
          .charge(1)
          //.alpha(20)
          .on("tick", tick)
          .start();
      
      var circle = svg.selectAll("circle.by_tick_circle")
      
      function tick(e) {
        circle
            .each(cluster(10 * e.alpha * e.alpha, new_data))
            .each(collide(0.1, new_data))
            //.attr("cx", function(d) { return d.x = Math.max(d.radius, Math.min((tvalue * svg_margin + tvalue * twidth) - d.radius, d.x)); }) // Bounding BOX?
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
      }
   }   
   return generate_sgm_layout
}


function cluster_tick_fn(e) {
   var obj_id;
   var data_id;
   function update_pos(e) {
      main_svg.selectAll("." + obj_id)
          .each(cl_cluster(1 * e.alpha * e.alpha, data_id))
          .each(collide(0.2, data_id))
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; })
   }
   update_pos.set_obj_id = function(in_obj_id) {
      obj_id = in_obj_id
      return update_pos;
   }
   update_pos.set_data_id = function(in_data_id) {
      data_id = in_data_id
      return update_pos;
   }
   return update_pos;
}

function cl_cluster(alpha, data) {
  var max = {};
  data.forEach(function(d) {
    if (!(d.t_value in max) || (d.radius > max[d.t_value].radius)) {
      max[d.t_value] = d;
    }
  });
  return function(d) {
    var node = max[d.t_value], 
        l, r, x, y,
        k = 1, 
        i = -1;
    if (node == d) {
      node = {x: (d.t_value * (binwidth + svg_margin)) + binwidth / 2, y: chart_height / 2, radius: d.radius};
      k = 0.01 * Math.sqrt(d.radius);
    }
    x = d.x - node.x;
    y = d.y - node.y;
    l = Math.sqrt(x * x + y * y);
    r = d.radius + node.radius;
    if (l != r) {
      l = ((l - r) / l) * alpha * k;
      d.x -= x *= l;
      d.y -= y *= l;
      node.x += x;      
      node.y += y;
    }
  };
}

function cluster(alpha, other_data) {
  var max = [{"radius":0}];
  other_data.forEach(function(d) {
    if (d.radius > max[0].radius) {
      max[0] = d;
    }
  });           
  return function(d) {
    var node = max[0],
        l, r, x, y,
        k = 1,
        i = -1;
    if (node == d) {
      node = {x: binwidth / 2, y: svg_height / 2, radius: d.radius};
      k = 0.01 * Math.sqrt(d.radius);
    }

    x = d.x - node.x;
    y = d.y - node.y;
    l = Math.sqrt(x * x + y * y);
    r = d.radius + node.radius;
    if (l < r) {
      l = ((l - r) / l) * alpha * k;
      d.x -= x *= l;
      d.y -= y *= l;
      node.x += x;
      node.y += y;
    }
  };
}

// Resolves collisions between d and all other circles.
function collide(alpha, other_data) {
  var quadtree = d3.geom.quadtree(other_data);
  return function(d) {
        var r = d.radius + padding,
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;

    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.x - quad.point.x, y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + quad.point.radius + (d.x !== quad.point.x) * padding;
        if (l <= r) {
          l = Math.random() * ((l - r) / l) * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2
          || x2 < nx1
          || y1 > ny2
          || y2 < ny1;
    });
  };
}
