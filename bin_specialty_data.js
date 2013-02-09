	// Infile Dataset: HCPCSBin - Specialty Level (i)
	var data_binlevel = [
		{"HCPCSBin": 100, "specialty":"Cardiology", "m_array":[
			{"percent_lines":8, "percent_cost":9}]},
		{"HCPCSBin": 100, "specialty":"Rheumatology", "m_array":[
			{"percent_lines":0, "percent_cost":0}]},
		{"HCPCSBin": 100, "specialty":"Internal Medicine", "m_array":[
			{"percent_lines":10, "percent_cost":14}]},
		{"HCPCSBin": 100, "specialty":"Emergency Medicine", "m_array":[
			{"percent_lines":30, "percent_cost":24}]},
		{"HCPCSBin": 100, "specialty":"Physical Medicine", "m_array":[
			{"percent_lines":0, "percent_cost":24}]},
		{"HCPCSBin": 200, "specialty":"Cardiology", "m_array":[
			{"percent_lines":4, "percent_cost":2}]}, 
		{"HCPCSBin": 200, "specialty":"Rheumatology", "m_array":[
			{"percent_lines":10, "percent_cost":7}]},
		{"HCPCSBin": 200, "specialty":"Internal Medicine", "m_array":[
			{"percent_lines":2, "percent_cost":1}]},
		{"HCPCSBin": 200, "specialty":"Emergency Medicine", "m_array":[
			{"percent_lines":1, "percent_cost":1}]},
		{"HCPCSBin": 200, "specialty":"Physical Medicine", "m_array":[
			{"percent_lines":45, "percent_cost":50}]},
		{"HCPCSBin": 300, "specialty":"Cardiology", "m_array":[
			{"percent_lines":12, "percent_cost":15}]}, 
		{"HCPCSBin": 300, "specialty":"Rheumatology", "m_array":[
			{"percent_lines":0, "percent_cost":0}]},
		{"HCPCSBin": 300, "specialty":"Internal Medicine", "m_array":[
			{"percent_lines":20, "percent_cost":23}]},
		{"HCPCSBin": 300, "specialty":"Emergency Medicine", "m_array":[
			{"percent_lines":12, "percent_cost":20}]},
		{"HCPCSBin": 300, "specialty":"Physical Medicine", "m_array":[
			{"percent_lines":3, "percent_cost":1}]},			
		{"HCPCSBin": 410, "specialty":"Cardiology", "m_array":[
			{"percent_lines":14, "percent_cost":9}]}, 
		{"HCPCSBin": 410, "specialty":"Rheumatology", "m_array":[
			{"percent_lines":0, "percent_cost":0}]}, 
		{"HCPCSBin": 410, "specialty":"Internal Medicine", "m_array":[
			{"percent_lines":7, "percent_cost":5}]},
		{"HCPCSBin": 410, "specialty":"Emergency Medicine", "m_array":[
			{"percent_lines":9, "percent_cost":8}]},
		{"HCPCSBin": 410, "specialty":"Physical Medicine", "m_array":[
			{"percent_lines":20, "percent_cost":14}]},
		{"HCPCSBin": 425, "specialty":"Cardiology", "m_array":[
			{"percent_lines":20, "percent_cost":18}]}, 
		{"HCPCSBin": 425, "specialty":"Rheumatology", "m_array":[
			{"percent_lines":0, "percent_cost":0}]},
		{"HCPCSBin": 425, "specialty":"Internal Medicine", "m_array":[
			{"percent_lines":10, "percent_cost":11}]},
		{"HCPCSBin": 425, "specialty":"Emergency Medicine", "m_array":[
			{"percent_lines":13, "percent_cost":15}]},
		{"HCPCSBin": 425, "specialty":"Physical Medicine", "m_array":[
			{"percent_lines":25, "percent_cost":28}]},
		{"HCPCSBin": 600, "specialty":"Cardiology", "m_array":[
			{"percent_lines":0, "percent_cost":0}]},
		{"HCPCSBin": 600, "specialty":"Rheumatology", "m_array":[
			{"percent_lines":20, "percent_cost":27}]},
		{"HCPCSBin": 600, "specialty":"Internal Medicine", "m_array":[
			{"percent_lines":7, "percent_cost":11}]},
		{"HCPCSBin": 600, "specialty":"Emergency Medicine", "m_array":[
			{"percent_lines":7, "percent_cost":11}]},
		{"HCPCSBin": 600, "specialty":"Physical Medicine", "m_array":[
			{"percent_lines":0, "percent_cost":0}]},
		{"HCPCSBin": 620, "specialty":"Cardiology", "m_array":[
			{"percent_lines":0, "percent_cost":0}]}, 
		{"HCPCSBin": 620, "specialty":"Rheumatology", "m_array":[
			{"percent_lines":24, "percent_cost":18}]}, 
		{"HCPCSBin": 620, "specialty":"Internal Medicine", "m_array":[
			{"percent_lines":5, "percent_cost":4}]},
		{"HCPCSBin": 620, "specialty":"Emergency Medicine", "m_array":[
			{"percent_lines":0, "percent_cost":0}]},			
		{"HCPCSBin": 620, "specialty":"Physical Medicine", "m_array":[
			{"percent_lines":1, "percent_cost":1}]},			
		{"HCPCSBin": 830, "specialty":"Cardiology", "m_array":[
			{"percent_lines":1, "percent_cost":2}]}, 
		{"HCPCSBin": 830, "specialty":"Rheumatology", "m_array":[
			{"percent_lines":10, "percent_cost":20}]}, 
		{"HCPCSBin": 830, "specialty":"Internal Medicine", "m_array":[
			{"percent_lines":12, "percent_cost":24}]},
		{"HCPCSBin": 830, "specialty":"Emergency Medicine", "m_array":[
			{"percent_lines":18, "percent_cost":25}]},
		{"HCPCSBin": 830, "specialty":"Physical Medicine", "m_array":[
			{"percent_lines":5, "percent_cost":5}]}
		];
			
	var data_spclpairs = [
		{"specialty1":"Cardiology", "specialty2":"Cardiology", "m_array":[{"resid_percent_lines":0, "resid_percent_cost":0}]},
		{"specialty1":"Internal Medicine", "specialty2":"Internal Medicine", "m_array":[{"resid_percent_lines":0, "resid_percent_cost":0}]},
		{"specialty1":"Rheumatology", "specialty2":"Rheumatology", "m_array":[{"resid_percent_lines":0, "resid_percent_cost":0}]},
		{"specialty1":"Cardiology", "specialty2":"Internal Medicine", "m_array":[{"resid_percent_lines":40, "resid_percent_cost":60}]},
		{"specialty1":"Cardiology", "specialty2":"Physical Medicine", "m_array":[{"resid_percent_lines":80, "resid_percent_cost":80}]},
		{"specialty1":"Cardiology", "specialty2":"Emergency Medicine", "m_array":[{"resid_percent_lines":20, "resid_percent_cost":20}]},
		{"specialty1":"Cardiology", "specialty2":"Rheumatology", "m_array":[{"resid_percent_lines":70, "resid_percent_cost":75}]},
		{"specialty1":"Internal Medicine", "specialty2":"Cardiology", "m_array":[{"resid_percent_lines":40, "resid_percent_cost":60}]},
		{"specialty1":"Internal Medicine", "specialty2":"Rheumatology", "m_array":[{"resid_percent_lines":45, "resid_percent_cost":30}]},
		{"specialty1":"Internal Medicine", "specialty2":"Physical Medicine", "m_array":[{"resid_percent_lines":35, "resid_percent_cost":38}]},
		{"specialty1":"Internal Medicine", "specialty2":"Emergency Medicine", "m_array":[{"resid_percent_lines":42, "resid_percent_cost":42}]},
		{"specialty1":"Emergency Medicine", "specialty2":"Cardiology", "m_array":[{"resid_percent_lines":20, "resid_percent_cost":20}]},
		{"specialty1":"Emergency Medicine", "specialty2":"Internal Medicine", "m_array":[{"resid_percent_lines":42, "resid_percent_cost":42}]},
		{"specialty1":"Emergency Medicine", "specialty2":"Rheumatology", "m_array":[{"resid_percent_lines":78, "resid_percent_cost":78}]},
		{"specialty1":"Emergency Medicine", "specialty2":"Physical Medicine", "m_array":[{"resid_percent_lines":80, "resid_percent_cost":80}]},
		{"specialty1":"Physical Medicine", "specialty2":"Cardiology", "m_array":[{"resid_percent_lines":80, "resid_percent_cost":80}]},
		{"specialty1":"Physical Medicine", "specialty2":"Internal Medicine", "m_array":[{"resid_percent_lines":35, "resid_percent_cost":38}]},
		{"specialty1":"Physical Medicine", "specialty2":"Rheumatology", "m_array":[{"resid_percent_lines":63, "resid_percent_cost":63}]},
		{"specialty1":"Physical Medicine", "specialty2":"Emergency Medicine", "m_array":[{"resid_percent_lines":80, "resid_percent_cost":80}]},
		{"specialty1":"Rheumatology", "specialty2":"Cardiology", "m_array":[{"resid_percent_lines":70, "resid_percent_cost":75}]},
		{"specialty1":"Rheumatology", "specialty2":"Emergency Medicine", "m_array":[{"resid_percent_lines":78, "resid_percent_cost":78}]},
		{"specialty1":"Rheumatology", "specialty2":"Physical Medicine", "m_array":[{"resid_percent_lines":63, "resid_percent_cost":63}]},
		{"specialty1":"Rheumatology", "specialty2":"Internal Medicine", "m_array":[{"resid_percent_lines":45, "resid_percent_cost":30}]}
	];

	var hcpbin_info = [
		{"HCPCSBin":100, "description":"Insertion or Replacement of Permanent Pacemaker with Transvenous Electrode(s); Atrial and Ventricular", "spcl_owner":"Internal Medicine"},
		{"HCPCSBin":200, "description":"Manual Therapy", "spcl_owner":"None"},
		{"HCPCSBin":300, "description":"Coronary Endarterectomy, Open, Any Method, Of Left Anterior Descending, Circumflex, Or Right Coronoary Artery Performed in Conjunction with Coronaryartery Bypass Graft Procedure, Each Vessel (List Separately)", "spcl_owner":"Internal Medicine"},
		{"HCPCSBin":410, "description":"Repair of Thoracoabdominal Aortic Root Replacement Using Valved Conduit and Coronary Reconstruction (Eg. Bentall)", "spcl_owner":"Cardiology"},
		{"HCPCSBin":425, "description":"Insertion of Tunneled Centrally Inserted Central Venous Cathetor, with subcutaneous port or pump", "spcl_owner":"Cardiology"},
		{"HCPCSBin":600, "description":"Thrombectomy", "spcl_owner":"Rheumatology"},
		{"HCPCSBin":620, "description":"Right Heart Catheterization", "spcl_owner":"Rheumatology"},
		{"HCPCSBin":830, "description":"Insertion and Placeent of Flow Directed Catheter (Eg. Swan-Ganz) For Monitoring Purposes", "spcl_owner":"Internal Medicine"}
	];
	var data_hcpbin_detail = [
		{"HCPCSBin":100, "data_element":1, "display_data":["Specialty Owner: ", "Cardiology"], "Description":"Specialty Owner", "value":"Cardiology"},
		{"HCPCSBin":100, "data_element":2, "display_data":["Top Preceding Diagnoses: ", "Diabetes (56%), Carpal Tunnel (32%), Wheezing(22%)"], "Description":"Top Preceding Diagnoses", "value":"Diabetes (56%), Carpal Tunnel (32%), Wheezing(22%)", "arrayed_value":[{"CC":"Diabetes","% Benes":56},{"CC":"Carpal Tunnel","% Benes":32},{"CC":"Wheezing","% Benes":22}]},
		{"HCPCSBin":100, "data_element":3, "display_data":["Prior IP %: ", "6%"], "Description":"Prior IP %", "value":6},
		{"HCPCSBin":100, "data_element":4, "display_data":["Prior SNF %: ", "3%"], "Description":"Prior SNF %", "value":3},
		{"HCPCSBin":100, "data_element":5, "display_data":["Top Preceding CPT: ", "Scan (18%)"], "Description":"Top Preceding CPT", "value":"Scan (18%)", "arrayed_value":[{"CPT":"Scan","p_Visits":18}]},
		
		{"HCPCSBin":200, "data_element":1, "display_data":["Specialty Owner: ", "Internal Medicine"], "Description":"Specialty Owner", "value":"Internal Medicine"},
		{"HCPCSBin":200, "data_element":2, "display_data":["Top Preceding Diagnoses: ", "Chest Pain (26%), Carpal Tunnel (12%), Wheezing(8%)"], "Description":"Top Preceding Diagnoses", "value":"Chest Pain (26%), Carpal Tunnel (12%), Wheezing(8%)", "arrayed_value":[{"CC":"Diabetes","% Benes":56},{"CC":"Carpal Tunnel","% Benes":32},{"CC":"Wheezing","% Benes":22}]},
		{"HCPCSBin":200, "data_element":3, "display_data":["Prior IP %: ", "3%"], "Description":"Prior IP %", "value":6},
		{"HCPCSBin":200, "data_element":4, "display_data":["Prior SNF %: ", "8%"], "Description":"Prior SNF %", "value":3},
		{"HCPCSBin":200, "data_element":5, "display_data":["Top Preceding CPT: ", "Debridement (34%)"], "Description":"Top Preceding CPT", "value":"Scan (18%)", "arrayed_value":[{"CPT":"Scan","p_Visits":18}]},
		
		{"HCPCSBin":300, "data_element":1, "display_data":["Specialty Owner: ", "Neurology"], "Description":"Specialty Owner", "value":"Neurology"},
		{"HCPCSBin":300, "data_element":2, "display_data":["Top Preceding Diagnoses: ", "Diabetes (34%), Carpal Tunnel (32%), Wheezing(22%)"], "Description":"Top Preceding Diagnoses", "value":"Diabetes (34%), Carpal Tunnel (32%), Wheezing(22%)", "arrayed_value":[{"CC":"Diabetes","% Benes":56},{"CC":"Carpal Tunnel","% Benes":32},{"CC":"Wheezing","% Benes":22}]},
		{"HCPCSBin":300, "data_element":3, "display_data":["Prior IP %: ", "12%"], "Description":"Prior IP %", "value":6},
		{"HCPCSBin":300, "data_element":4, "display_data":["Prior SNF %: ", "2%"], "Description":"Prior SNF %", "value":3},
		{"HCPCSBin":300, "data_element":5, "display_data":["Top Preceding CPT: ", "H-Reflex (50%)"], "Description":"Top Preceding CPT", "value":"Scan (18%)", "arrayed_value":[{"CPT":"Scan","p_Visits":18}]},
		
		{"HCPCSBin":410, "data_element":1, "display_data":["Specialty Owner: ", "Psychiatry"], "Description":"Specialty Owner", "value":"Psychiatry"},
		{"HCPCSBin":410, "data_element":2, "display_data":["Top Preceding Diagnoses: ", "Insomnia (27%), Arthiritis (19%), Chest Pain(10%)"], "Description":"Top Preceding Diagnoses", "value":"Diabetes (56%), Carpal Tunnel (32%), Wheezing(22%)", "arrayed_value":[{"CC":"Diabetes","% Benes":56},{"CC":"Carpal Tunnel","% Benes":32},{"CC":"Wheezing","% Benes":22}]},
		{"HCPCSBin":410, "data_element":3, "display_data":["Prior IP %: ", "35%"], "Description":"Prior IP %", "value":6},
		{"HCPCSBin":410, "data_element":4, "display_data":["Prior SNF %: ", "8%"], "Description":"Prior SNF %", "value":3},
		{"HCPCSBin":410, "data_element":5, "display_data":["Top Preceding CPT: ", "Group Therapy (27%)"], "Description":"Top Preceding CPT", "value":"Scan (18%)", "arrayed_value":[{"CPT":"Scan","p_Visits":18}]},

		{"HCPCSBin":425, "data_element":1, "display_data":["Specialty Owner: ", "Internal Medicine"], "Description":"Specialty Owner", "value":"Internal Medicine"},
		{"HCPCSBin":425, "data_element":2, "display_data":["Top Preceding Diagnoses: ", "Headache (57%), Sleep Studies (5%), Dry Mouth(4%)"], "Description":"Top Preceding Diagnoses", "value":"Diabetes (56%), Carpal Tunnel (32%), Wheezing(22%)", "arrayed_value":[{"CC":"Diabetes","% Benes":56},{"CC":"Carpal Tunnel","% Benes":32},{"CC":"Wheezing","% Benes":22}]},
		{"HCPCSBin":425, "data_element":3, "display_data":["Prior IP %: ", "4%"], "Description":"Prior IP %", "value":6},
		{"HCPCSBin":425, "data_element":4, "display_data":["Prior SNF %: ", "5%"], "Description":"Prior SNF %", "value":3},
		{"HCPCSBin":425, "data_element":5, "display_data":["Top Preceding CPT: ", "Venipuncture(57%)"], "Description":"Top Preceding CPT", "value":"Scan (18%)", "arrayed_value":[{"CPT":"Scan","p_Visits":18}]},

		{"HCPCSBin":600, "data_element":1, "display_data":["Specialty Owner: ", "Radiology"], "Description":"Specialty Owner", "value":"Radiology"},
		{"HCPCSBin":600, "data_element":4, "display_data":["Prior SNF %: ", "8%"], "Description":"Prior SNF %", "value":3},
		{"HCPCSBin":600, "data_element":5, "display_data":["Top Preceding CPT: ", "Ultrasound Mammography (87%)"], "Description":"Top Preceding CPT", "value":"Scan (18%)", "arrayed_value":[{"CPT":"Scan","p_Visits":18}]},

		{"HCPCSBin":620, "data_element":1, "display_data":["Specialty Owner: ", "Radiology"], "Description":"Specialty Owner", "value":"Radiology"},
		{"HCPCSBin":620, "data_element":2, "display_data":["Top Preceding Diagnoses: ", "Headache (57%), Sleep Studies (5%), Dry Mouth(4%)"], "Description":"Top Preceding Diagnoses", "value":"Diabetes (56%), Carpal Tunnel (32%), Wheezing(22%)", "arrayed_value":[{"CC":"Diabetes","% Benes":56},{"CC":"Carpal Tunnel","% Benes":32},{"CC":"Wheezing","% Benes":22}]},
		{"HCPCSBin":620, "data_element":3, "display_data":["Prior IP %: ", "6%"], "Description":"Prior IP %", "value":6},
		{"HCPCSBin":620, "data_element":4, "display_data":["Prior SNF %: ", "3%"], "Description":"Prior SNF %", "value":3},
		{"HCPCSBin":620, "data_element":5, "display_data":["Top Preceding CPT: ", "Office E&M (87%)"], "Description":"Top Preceding CPT", "value":"Scan (18%)", "arrayed_value":[{"CPT":"Scan","p_Visits":18}]},

		{"HCPCSBin":830, "data_element":1, "display_data":["Specialty Owner: ", "Rheumatology"], "Description":"Specialty Owner", "value":"Rheumatology"},
		{"HCPCSBin":830, "data_element":2, "display_data":["Top Preceding Diagnoses: ", "Headache (57%), Sleep Studies (5%), Dry Mouth(4%)"], "Description":"Top Preceding Diagnoses", "value":"Diabetes (56%), Carpal Tunnel (32%), Wheezing(22%)", "arrayed_value":[{"CC":"Diabetes","% Benes":56},{"CC":"Carpal Tunnel","% Benes":32},{"CC":"Wheezing","% Benes":22}]},
		{"HCPCSBin":830, "data_element":3, "display_data":["Prior SNF %: ", "6%"], "Description":"Prior IP %", "value":6},
		{"HCPCSBin":830, "data_element":4, "display_data":["Prior SNF %: ", "3%"], "Description":"Prior SNF %", "value":3},
		{"HCPCSBin":830, "data_element":5, "display_data":["Top Preceding CPT: ", "Scan (16%)"], "Description":"Top Preceding CPT", "value":"Scan (18%)", "arrayed_value":[{"CPT":"Scan","p_Visits":18}]}
	];
	var data_spcl_detail = [
		{"specialty":"Rheumatology", "display_data":["# of NPIs: ", "2,000"], "n_NPIs":2000, "top_cpts":["Nerve Conduction","Pain Relievers",""], "owned_codes":["", ""]},
		{"specialty":"Cardiology", "display_data":["# of NPIs: ", "16,089"], "n_NPIs":16089, "top_cpts":["ECG","Echocardiography","Cardiac Stent"], "owned_codes":["", ""]},
		{"specialty":"Emergency Medicine", "display_data":["# of NPIs: ", "11,008"], "n_NPIs":11008, "top_cpts":["ECG","CT Scan","MRI Scan"], "owned_codes":["", ""]},
		{"specialty":"Physical Medicine", "display_data":["# of NPIs: ", "17,486"], "n_NPIs":17486, "top_cpts":["Manual Therapy","Physical Therapy","Office E&M"], "owned_codes":["", ""]},
		{"specialty":"Internal Medicine", "display_data":["# of NPIs: ", "59,563"], "n_NPIs":59563, "top_cpts":["Venipuncture","Lab Tests","Office E&M"], "owned_codes":["", ""]}
	];

	var hcpbin_spcl_dist = [
		{"HCPCSBin":100, "specialty":"Cardiology", "dist_array":[1,2,3,4,5,6,7,8,9,10,10,9,8,7,6,5,4,3,2,1]},
		{"HCPCSBin":100, "specialty":"Internal Medicine", "dist_array":[1,1,2,2,3,3,4,4,1,1,5,5,2,2,1,1,2,2,1,1]}
	];

	var section_pane_indices = [
		{"indices":1, "title":"Providers", "contents":[{"name":"Jacques Roy"},{"name":"Hicham El-Horr"},{"name":"Jonathan Wahl"},{"name":"Shayna Rayker"},{"name":"Humpty"},{"name":"Dumpty"}]},
		{"indices":2, "title":"Options", "contents":["Part B","Part A","Part A/B"]},
		{"indices":3, "title":"Selectors", "contents":["Before New PTAN","After New PTAN","All"]}
	];

	var provider_detail = [
		{"name":"Jacques Roy", "display_data":["Listed Specialty: ", "Emergency Medicine"], "value":"Emergency Medicine", "listed_value":"Emergency Medicine", "predict":"Internal Medicine"},
		{"name":"Jacques Roy", "display_data":["Predicted Specialty: ", "Internal Medicine"], "value":"Internal Medicine", "listed_value":"Emergency Medicine", "predict":"Internal Medicine"},
		{"name":"Hicham El-Horr", "display_data":["Listed Specialty: ", "Internal Medicine"], "value":"Internal Medicine", "listed_value":"Internal Medicine", "predict":"Internal Medicine"},
		{"name":"Hicham El-Horr", "display_data":["Predicted Specialty: ", "Internal Medicine"], "value":"Internal Medicine", "listed_value":"Internal Medicine", "predict":"Internal Medicine"},
		{"name":"Jonathan Wahl", "display_data":["Listed Specialty: ", "Physical Medicine"], "value":"Physical Medicine", "listed_value":"Physical Medicine", "predict":"Physical Medicine"},
		{"name":"Jonathan Wahl", "display_data":["Predicted Specialty: ", "Physical Medicine"], "value":"Physical Medicine", "listed_value":"Physical Medicine", "predict":"Physical Medicine"},
		{"name":"Shayna Rayker", "display_data":["Listed Specialty: ", "Internal Medicine"], "value":"Internal Medicine", "listed_value":"Internal Medicine", "predict":"Physical Medicine"},
		{"name":"Shayna Rayker", "display_data":["Predicted Specialty: ", "Physical Medicine"], "value":"Physical Medicine", "listed_value":"Internal Medicine", "predict":"Physical Medicine"},
		{"name":"Humpty", "display_data":["Listed Specialty: ", "Cardiology"], "value":"Cardiology", "listed_value":"Cardiology", "predict":"Rheumatology"},
		{"name":"Humpty", "display_data":["Predicted Specialty: ", "Rheumatology"], "value":"Rheumatology", "listed_value":"Cardiology", "predict":"Rheumatology"},
		{"name":"Dumpty", "display_data":["Listed Specialty: ", "Cardiology"], "value":"Cardiology", "listed_value":"Cardiology", "predict":"Cardiology"},
		{"name":"Dumpty", "display_data":["Predicted Specialty: ", "Cardiology"], "value":"Cardiology", "listed_value":"Cardiology", "predict":"Cardiology"}
	];

	var provider_binlevel = [
		{"HCPCSBin": 100, "name":"Jacques Roy", "m_array":[
			{"percent_lines":18, "percent_cost":9}]},
		{"HCPCSBin": 100, "name":"Hicham El-Horr", "m_array":[
			{"percent_lines":0, "percent_cost":0}]},
		{"HCPCSBin": 100, "name":"Jonathan Wahl", "m_array":[
			{"percent_lines":2, "percent_cost":14}]},
		{"HCPCSBin": 200, "name":"Jacques Roy", "m_array":[
			{"percent_lines":7, "percent_cost":2}]}, 
		{"HCPCSBin": 200, "name":"Hicham El-Horr", "m_array":[
			{"percent_lines":6, "percent_cost":7}]},
		{"HCPCSBin": 200, "name":"Jonathan Wahl", "m_array":[
			{"percent_lines":45, "percent_cost":1}]},
		{"HCPCSBin": 300, "name":"Jacques Roy", "m_array":[
			{"percent_lines":25, "percent_cost":15}]}, 
		{"HCPCSBin": 300, "name":"Hicham El-Horr", "m_array":[
			{"percent_lines":22, "percent_cost":0}]},
		{"HCPCSBin": 300, "name":"Jonathan Wahl", "m_array":[
			{"percent_lines":8, "percent_cost":23}]},
		{"HCPCSBin": 410, "name":"Jacques Roy", "m_array":[
			{"percent_lines":7, "percent_cost":9}]}, 
		{"HCPCSBin": 410, "name":"Hicham El-Horr", "m_array":[
			{"percent_lines":5, "percent_cost":0}]}, 
		{"HCPCSBin": 410, "name":"Jonathan Wahl", "m_array":[
			{"percent_lines":19, "percent_cost":5}]},
		{"HCPCSBin": 425, "name":"Jacques Roy", "m_array":[
			{"percent_lines":2, "percent_cost":18}]}, 
		{"HCPCSBin": 425, "name":"Hicham El-Horr", "m_array":[
			{"percent_lines":7, "percent_cost":0}]},
		{"HCPCSBin": 425, "name":"Jonathan Wahl", "m_array":[
			{"percent_lines":17, "percent_cost":11}]},
		{"HCPCSBin": 600, "name":"Jacques Roy", "m_array":[
			{"percent_lines":0, "percent_cost":0}]},
		{"HCPCSBin": 600, "name":"Hicham El-Horr", "m_array":[
			{"percent_lines":5, "percent_cost":27}]},
		{"HCPCSBin": 600, "name":"Jonathan Wahl", "m_array":[
			{"percent_lines":9, "percent_cost":11}]},
		{"HCPCSBin": 620, "name":"Jacques Roy", "m_array":[
			{"percent_lines":9, "percent_cost":0}]}, 
		{"HCPCSBin": 620, "name":"Hicham El-Horr", "m_array":[
			{"percent_lines":14, "percent_cost":18}]}, 
		{"HCPCSBin": 620, "name":"Jonathan Wahl", "m_array":[
			{"percent_lines":8, "percent_cost":4}]},
		{"HCPCSBin": 830, "name":"Jacques Roy", "m_array":[
			{"percent_lines":1, "percent_cost":2}]}, 
		{"HCPCSBin": 830, "name":"Hicham El-Horr", "m_array":[
			{"percent_lines":19, "percent_cost":20}]}, 
		{"HCPCSBin": 830, "specialty":"Jonathan Wahl", "m_array":[
			{"percent_lines":4, "percent_cost":24}]}
		];