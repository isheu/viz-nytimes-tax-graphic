function sgm_on_line(twidth, theight, tvalue, dataset, translate_y) {
   var tmap = d3.layout.treemap()
      .size([twidth,theight])
      .children(function(d) { return d.values; })
      .value(function(d) { return d.size; });

   var tick_num = d3.select("body")
      .append("div").attr("id", "tick_" + tvalue)
      .attr("class", "tick")
      .style("position", "absolute")
      .style("left", function() { return tvalue * svg_margin + tvalue * twidth; })
      .style("top", function() { return translate_y + (svg_height - theight) / 2 });

   var svg = d3.selectAll("#tick_" + tvalue).append("svg:svg")
      .attr("width",twidth + 2 * svg_margin).attr("height",theight)
   
   var new_data = [];
   function generate_sgm_layout() {
      svg.selectAll("circle")
         .data(tmap.nodes(dataset))
         .enter().append("circle")
         .attr("cx", function(d, i) { 
               new_data[i] = {"radius":((Math.sqrt(d.size) / Math.sqrt(75)) * max_radius), "x": (d.x + (d.dx / 2) + svg_margin), "y": (d.y + (d.dy / 2) + svg_margin), "t_value": tvalue, "theight": theight, "name": d.name, "lvl_label": d.another_label, "x_metric": d.x_metric}
               return d.x + (d.dx / 2) + "px" 
            })
         .attr("cy", function(d) { return d.y + (d.dy / 2) + "px" })
         .attr("r", function(d) { return d.name == "master" ? 1 : (Math.sqrt(d.dx * d.dy) / 2) - 2; });
      svg.selectAll("circle").remove()
      new_data = new_data.filter(function(d) { return d.radius > 0; })

      svg.selectAll("circle.o_circle")
         .data(new_data)
         .enter().append("circle")
         .attr("id", function(d) { return d.name; })
         .attr("class", "o_circle")
         .attr("fill", "#333")
         .attr("stroke", "white")
         .attr("stroke-width", 1)
         .attr("cx", function(d, i) { return d.x + "px";})
         .attr("cy", function(d) { return d.y + "px" })
         .attr("r", function(d) { return d.radius; });

      var force = d3.layout.force()
          .nodes(new_data)
          .size([twidth, theight])
          .gravity(0.05)
          .friction(0.1)
          .charge(1)
          .on("tick", tick)
          .start();
      
      var circle = svg.selectAll("circle.o_circle")

      function tick(e) {
        circle
            .each(cluster(10 * e.alpha * e.alpha, new_data))
            .each(collide(0.1, new_data))
            //.attr("cx", function(d) { return d.x = Math.max(d.radius, Math.min((tvalue * svg_margin + tvalue * twidth) - d.radius, d.x)); })
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
      }
   }
   return generate_sgm_layout
}

function cluster_tick(e) {
    main_svg.selectAll(".n_circle")
       .each(cl_cluster(1 * e.alpha * e.alpha, across_ticks))
       .each(collide(0.1, across_ticks))
       .attr("cx", function(d) { return d.x; })
       .attr("cy", function(d) { return d.y; })
       //.call(cluster_force.drag);
}

function cluster_sub_tick(e) {
    main_svg.selectAll(".f_circle")
       .each(cl_cluster(1 * e.alpha * e.alpha, filt_across_ticks))
       .each(collide(0.1, filt_across_ticks))
       .attr("cx", function(d) { return d.x; })
       .attr("cy", function(d) { return d.y; })
       //.call(cluster_force.drag);
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
