var drag_bar = d3.behavior.drag()
	.origin(Object)
	.on("dragstart", function() {
		origin_drag_x = MousePosition[0];
		origin_drag_y = MousePosition[1];
		if ((d3.select(this).classed("bar1") == 1) | (d3.select(this).classed("bar2") == 1)) {
			current_drag_object = "Procedure Detail"
		}
		else if (d3.select(this).classed("specialty_box1") == 1) {
			current_drag_object = "Specialty Detail"
		}
		else if (d3.select(this).classed("specialty_box2") == 1) {
			current_drag_object = "Specialty Detail"
		} 

		else if ((d3.select(this).classed("content_cover") == 1)) {
			current_drag_object = "Provider Detail"
		}
		
		if (current_drag_object == "Procedure Detail") {
			to_pane_data = data_hcpbin_detail.filter(isSelectCode);
		}
		if (current_drag_object == "Provider Detail") {
			sel_provider = provider_detail.filter(isHoveredProvider);
			sel_provider_listed_spcl = sel_provider[0].listed_value;
			sel_provider_predicted_spcl = sel_provider[0].predict;
			to_pane_data = provider_detail.filter(isHoveredProvider);
		}
		if (current_drag_object == "Specialty Detail") {
			if (d3.select(this).classed("specialty_box1") == 1) {
				to_pane_data = data_spcl_detail.filter(isSelectSPCL1)
			}
			else if (d3.select(this).classed("specialty_box2") == 1) {
				to_pane_data = data_spcl_detail.filter(isSelectSPCL2)
			}
		}
	})
	.on("drag", function() {
		console.log("dragging")
		dragging_bar = 1;
		svg_shadow_box
			.attr("fill", "rgba(128,128,128,0.4)")
			.attr("height", 20)
			.attr("x", function() {
				return (event.x - 15);
			})
			.attr("y", function() {
				return (event.y - 15);
			});
		}
	)
	.on("dragend", function() {
		dragging_bar = 0;
		if ((place_in_pane[0] != 1) & (place_in_pane[1] != 1) & (place_in_pane[2] != 1)) {
			svg_shadow_box
				.transition()
				.duration(500)
				.attr("x", origin_drag_x)
				.attr("y", origin_drag_y)
				.attr("height", 0)
				.attr("fill", "rgba(128,128,128,0)");
		}
		else {
			svg_shadow_box
			.transition()
				.duration(500)
				.attr("x", function() {
					return return_x_point_pane[hovered_pane];
				})
				.attr("y", function() {
					return 800;
				})
				.attr("height", 0)
				.attr("fill", "rgba(128,128,128,0)");
			
			hovered_pane_plus_1 = hovered_pane + 1	
			
			if (current_drag_object == "Provider Detail") {
				spcl1_select = sel_provider_listed_spcl;
				spcl2_select = sel_provider_predicted_spcl;
				change_drop_down_select("master");
				change_drop_down_select("overlay");			
				redraw_bars_1();
				redraw_bars_2();
			}

			d3.select("#compare_space #compare_pane_div_" + hovered_pane_plus_1).select("rect#cpane_" + hovered_pane_plus_1)
				.transition()
				.duration(300)
				.attr("fill", "rgba(10,10,10,0.1)");
			d3.select("#compare_space #compare_pane_div_" + hovered_pane_plus_1).select("rect#cpane_" + hovered_pane_plus_1 + "_title_area")
				.attr("fill", "rgba(10,50,10,0)")
				.transition()
				.duration(300)
				.attr("fill", "rgba(10,50,10,0.2)");
			d3.select("#compare_space #compare_pane_div_"  + hovered_pane_plus_1 + " #pane_" + hovered_pane_plus_1 + "_title")
				.html(current_drag_object);

			d3.select("#compare_space #compare_pane_div_"  + hovered_pane_plus_1 + " #pane_" + hovered_pane_plus_1 + "_body")
				.html("")
				.append("table")
				.attr("id", "pane_" + hovered_pane_plus_1 + "_body_table");
			
			var contents = d3.select("#compare_space #compare_pane_div_"  + hovered_pane_plus_1 + " #pane_" + hovered_pane_plus_1 + "_body #pane_" + hovered_pane_plus_1 + "_body_table")
			var row_contents = contents.selectAll("tr.body")
				.data(to_pane_data)
				.enter()
				.append("tr")
				.attr("class", "body");
			row_contents.each(function(d) {
   					var td = d3.select(this).selectAll("td").data(d.display_data);
   					td.enter().append("td")
   						.text(function(d) {return d});
				})		
		}
	});

function flip_selections() {
	var temp = spcl1_select;
	spcl1_select = spcl2_select;
	spcl2_select = temp;
	change_drop_down_select("master");
	change_drop_down_select("overlay");
	redraw_bars_1();
	redraw_bars_2();
}

function pane_hover_change(pane_var, type) {
	if (dragging_bar == 1) {
		pane_var
			.attr("fill", "rgba(10,10,10,0.3)");
		place_in_pane[type] = 1;
		hovered_pane = type;
	}
	else if (dragging_bar != 1) {
		pane_var
			.attr("fill", "rgba(10,10,10,0.1)");
	}					
}

function pane_out_change(pane_var, type) {
	place_in_pane[type] = 0;
	pane_var
		.attr("fill", "rgba(10,10,10,0.1)");
	deselect = 0;
	hovered_pane = -1;
	}

function isSelectSPCL1(value, index, ar) {
	return value.specialty == spcl1_select;
}
function isSelectSPCL2(value, index, ar) {
	return value.specialty == spcl2_select;
}

function isSelectCode(value, index, ar) {
	return value.HCPCSBin == code;
}

function isSelectProvider(value, index, ar) {
	return value.name == checked_provider;
}
function isHoveredProvider(value, index, ar) {
	return value.name == hovered_provider;
}
function isSelectPair(value, index, ar) {
	return ((value.specialty1 == spcl1_select) & (value.specialty2 == spcl2_select));
}

function change_drop_down_select(type)	{
	if(type == "master")	{
		var temp_selection = document.getElementById("selection_list_master");
		for(i = 0; i < temp_selection.length; i++) {
			if (temp_selection.options[i].text == spcl1_select) {
				temp_selection.selectedIndex = temp_selection.options[i].index;
			}
		}
	}
	else {
		var temp_selection = document.getElementById("selection_list_overlay");
		for(i = 0; i < temp_selection.length; i++) {
			if (temp_selection.options[i].text == spcl2_select) {
				temp_selection.selectedIndex = temp_selection.options[i].index;
			}
		}
	}
}

function change_drop_down_keyboard(index, type)	{
	if(type == "master")	{
		var temp_selection = document.getElementById("selection_list_master");
		temp_selection.selectedIndex = index;		
		spcl1_select = temp_selection.options[temp_selection.selectedIndex].text;
		redraw_bars_1()		
	}
	else {
		var temp_selection = document.getElementById("selection_list_overlay");
		temp_selection.selectedIndex = index;
		spcl2_select = temp_selection.options[temp_selection.selectedIndex].text;
		redraw_bars_2()
	}
};

d3.select(window).on("keydown", function() {
	switch (d3.event.keyCode) {
		case 70: 
			if(current_master_index > 0)	{
				current_master_index = current_master_index-1;
				console.log(current_master_index);
			}	
			change_drop_down_keyboard(current_master_index,"master");

		break;
		case 71: 
			if(current_master_index < max_index_master)	{
	    		current_master_index = current_master_index+1;
	    		console.log(current_master_index);
		   	}
			change_drop_down_keyboard(current_master_index,"master");
		break;
		case 84: 
			if(current_overlay_index > 0)	{
				current_overlay_index = current_overlay_index - 1;
				console.log(current_overlay_index);
			}
			change_drop_down_keyboard(current_overlay_index,"overlay");
		break;
		case 66: 
			if(current_overlay_index < max_index_overlay)		{
				current_overlay_index = current_overlay_index + 1;
				console.log(current_overlay_index);
		   	}
			change_drop_down_keyboard(current_overlay_index,"overlay");
		break;
		}
	redraw_bars_1()
	redraw_bars_2()
});
// Highlight other, associated players
// Change up data structure
// nest function
// Calculations only done for the element hovered
// Lessons: Don't rely too heavily on using a variable to refer to - use select IDs much more.