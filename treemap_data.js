/* Ideal format for incoming data of such a chart:
Needs to be compatible with treemap format. 
Remaining challenge - make sure bubble area/radius is consistent to the metric being presented. */

var data = [
   {"bin_value": 5, "bin_id": "bin_5", "x_metric": 5.1, "another_label":"lvl_1", "name": "corporation_1", "size":16.0},
   {"bin_value": 5, "bin_id": "bin_5", "x_metric": 5.2, "another_label":"lvl_1", "name": "corporation_1", "size":25.0},
   {"bin_value": 5, "bin_id": "bin_5", "x_metric": 5.5, "another_label":"lvl_1", "name": "corporation_3", "size":8.0},
   {"bin_value": 5, "bin_id": "bin_5", "x_metric": 5.2, "another_label":"lvl_3", "name": "corporation_4", "size":9.0},
   {"bin_value": 5, "bin_id": "bin_5", "x_metric": 5.3, "another_label":"lvl_1", "name": "corporation_5", "size":36.0},
   {"bin_value": 5, "bin_id": "bin_5", "x_metric": 5.4, "another_label":"lvl_2", "name": "corporation_6", "size":30.0},
   {"bin_value": 5, "bin_id": "bin_5", "x_metric": 5.1, "another_label":"lvl_1", "name": "corporation_7", "size":25.0},
   {"bin_value": 5, "bin_id": "bin_5", "x_metric": 5.0, "another_label":"lvl_1", "name": "corporation_8", "size":16.0},
   {"bin_value": 5, "bin_id": "bin_5", "x_metric": 5.2, "another_label":"lvl_2", "name": "corporation_9", "size":16.0},
   {"bin_value": 5, "bin_id": "bin_5", "x_metric": 5.7, "another_label":"lvl_2", "name": "corporation_10", "size":50.0},
   {"bin_value": 5, "bin_id": "bin_5", "x_metric": 5.5, "another_label":"lvl_1", "name": "corporation_11", "size":25.0},
   {"bin_value": 5, "bin_id": "bin_5", "x_metric": 5.3, "another_label":"lvl_1", "name": "corporation_12", "size":24.0},
   {"bin_value": 5, "bin_id": "bin_5", "x_metric": 5.8, "another_label":"lvl_1", "name": "corporation_13", "size":10.0},
   {"bin_value": 5, "bin_id": "bin_5", "x_metric": 5.7, "another_label":"lvl_4", "name": "corporation_14", "size":16.0},
   {"bin_value": 5, "bin_id": "bin_5", "x_metric": 5.2, "another_label":"lvl_3", "name": "corporation_15", "size":15.0},
   {"bin_value": 5, "bin_id": "bin_5", "x_metric": 5.4, "another_label":"lvl_1", "name": "corporation_16", "size":32.0},
   {"bin_value": 5, "bin_id": "bin_5", "x_metric": 5.1, "another_label":"lvl_2", "name": "corporation_17", "size":24.0},
   {"bin_value": 5, "bin_id": "bin_5", "x_metric": 5.0, "another_label":"lvl_1", "name": "corporation_18", "size":4.0},
   {"bin_value": 5, "bin_id": "bin_5", "x_metric": 5.8, "another_label":"lvl_3", "name": "corporation_19", "size":4.0},
   {"bin_value": 5, "bin_id": "bin_5", "x_metric": 5.6, "another_label":"lvl_2", "name": "corporation_20", "size":9.0},
   {"bin_value": 5, "bin_id": "bin_5", "x_metric": 5.9, "another_label":"lvl_1", "name": "corporation_21", "size":8.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.1, "another_label":"lvl_3", "name": "corporation_22", "size":4.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.2, "another_label":"lvl_4", "name": "corporation_23", "size":4.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.7, "another_label":"lvl_6", "name": "corporation_24", "size":8.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.9, "another_label":"lvl_5", "name": "corporation_25", "size":9.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.4, "another_label":"lvl_3", "name": "corporation_26", "size":6.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.5, "another_label":"lvl_2", "name": "corporation_27", "size":25.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.4, "another_label":"lvl_1", "name": "corporation_28", "size":9.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.3, "another_label":"lvl_1", "name": "corporation_29", "size":75.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.2, "another_label":"lvl_1", "name": "corporation_30", "size":30.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.2, "another_label":"lvl_2", "name": "corporation_31", "size":4.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.2, "another_label":"lvl_2", "name": "corporation_32", "size":20.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.1, "another_label":"lvl_2", "name": "corporation_33", "size":24.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.1, "another_label":"lvl_2", "name": "corporation_34", "size":8.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.2, "another_label":"lvl_3", "name": "corporation_35", "size":4.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.7, "another_label":"lvl_4", "name": "corporation_36", "size":7.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.8, "another_label":"lvl_2", "name": "corporation_37", "size":48.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.1, "another_label":"lvl_2", "name": "corporation_38", "size":30.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.3, "another_label":"lvl_2", "name": "corporation_39", "size":8.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.5, "another_label":"lvl_2", "name": "corporation_40", "size":10.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.5, "another_label":"lvl_3", "name": "corporation_41", "size":9.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.7, "another_label":"lvl_4", "name": "corporation_42", "size":8.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.3, "another_label":"lvl_4", "name": "corporation_43", "size":16.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.3, "another_label":"lvl_1", "name": "corporation_44", "size":25.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.1, "another_label":"lvl_2", "name": "corporation_45", "size":8.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.1, "another_label":"lvl_2", "name": "corporation_46", "size":9.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.2, "another_label":"lvl_2", "name": "corporation_47", "size":36.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.3, "another_label":"lvl_1", "name": "corporation_48", "size":30.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.4, "another_label":"lvl_2", "name": "corporation_49", "size":25.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.7, "another_label":"lvl_1", "name": "corporation_50", "size":16.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.1, "another_label":"lvl_3", "name": "corporation_51", "size":16.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.2, "another_label":"lvl_3", "name": "corporation_52", "size":50.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.1, "another_label":"lvl_3", "name": "corporation_53", "size":25.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.1, "another_label":"lvl_3", "name": "corporation_54", "size":24.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.3, "another_label":"lvl_3", "name": "corporation_55", "size":10.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.4, "another_label":"lvl_3", "name": "corporation_56", "size":16.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.4, "another_label":"lvl_3", "name": "corporation_57", "size":15.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.2, "another_label":"lvl_3", "name": "corporation_58", "size":32.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.2, "another_label":"lvl_2", "name": "corporation_59", "size":24.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.7, "another_label":"lvl_2", "name": "corporation_60", "size":4.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.3, "another_label":"lvl_1", "name": "corporation_61", "size":4.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.8, "another_label":"lvl_1", "name": "corporation_62", "size":9.0},
   {"bin_value": 6, "bin_id": "bin_6", "x_metric": 6.0, "another_label":"lvl_1", "name": "corporation_63", "size":8.0},
   {"bin_value": 7, "bin_id": "bin_7", "x_metric": 7.0, "another_label":"lvl_4", "name": "corporation_64", "size":8.0},
   {"bin_value": 7, "bin_id": "bin_7", "x_metric": 7.1, "another_label":"lvl_4", "name": "corporation_65", "size":4.0},
   {"bin_value": 7, "bin_id": "bin_7", "x_metric": 7.3, "another_label":"lvl_3", "name": "corporation_66", "size":7.0},
   {"bin_value": 7, "bin_id": "bin_7", "x_metric": 7.0, "another_label":"lvl_1", "name": "corporation_67", "size":48.0},
   {"bin_value": 7, "bin_id": "bin_7", "x_metric": 7.4, "another_label":"lvl_1", "name": "corporation_68", "size":30.0},
   {"bin_value": 7, "bin_id": "bin_7", "x_metric": 7.4, "another_label":"lvl_5", "name": "corporation_69", "size":8.0},
   {"bin_value": 7, "bin_id": "bin_7", "x_metric": 7.7, "another_label":"lvl_4", "name": "corporation_70", "size":10.0},
   {"bin_value": 7, "bin_id": "bin_7", "x_metric": 7.7, "another_label":"lvl_3", "name": "corporation_71", "size":9.0},
   {"bin_value": 7, "bin_id": "bin_7", "x_metric": 7.9, "another_label":"lvl_2", "name": "corporation_72", "size":8.0},
   {"bin_value": 7, "bin_id": "bin_7", "x_metric": 7.2, "another_label":"lvl_4", "name": "corporation_73", "size":16.0},
   {"bin_value": 7, "bin_id": "bin_7", "x_metric": 7.0, "another_label":"lvl_1", "name": "corporation_74", "size":25.0},
   {"bin_value": 7, "bin_id": "bin_7", "x_metric": 7.1, "another_label":"lvl_4", "name": "corporation_75", "size":8.0},
   {"bin_value": 7, "bin_id": "bin_7", "x_metric": 7.5, "another_label":"lvl_4", "name": "corporation_76", "size":9.0},
   {"bin_value": 7, "bin_id": "bin_7", "x_metric": 7.5, "another_label":"lvl_3", "name": "corporation_77", "size":36.0},
   {"bin_value": 7, "bin_id": "bin_7", "x_metric": 7.4, "another_label":"lvl_2", "name": "corporation_78", "size":30.0},
   {"bin_value": 7, "bin_id": "bin_7", "x_metric": 7.6, "another_label":"lvl_1", "name": "corporation_79", "size":25.0},
   {"bin_value": 8, "bin_id": "bin_8", "x_metric": 8.1, "another_label":"lvl_1", "name": "corporation_80", "size":16.0},
   {"bin_value": 8, "bin_id": "bin_8", "x_metric": 8.2, "another_label":"lvl_1", "name": "corporation_81", "size":25.0},
   {"bin_value": 8, "bin_id": "bin_8", "x_metric": 8.5, "another_label":"lvl_1", "name": "corporation_82", "size":8.0},
   {"bin_value": 8, "bin_id": "bin_8", "x_metric": 8.2, "another_label":"lvl_3", "name": "corporation_83", "size":9.0},
   {"bin_value": 8, "bin_id": "bin_8", "x_metric": 8.3, "another_label":"lvl_1", "name": "corporation_84", "size":36.0},
   {"bin_value": 8, "bin_id": "bin_8", "x_metric": 8.4, "another_label":"lvl_2", "name": "corporation_85", "size":30.0},
   {"bin_value": 8, "bin_id": "bin_8", "x_metric": 8.1, "another_label":"lvl_1", "name": "corporation_86", "size":25.0},
   {"bin_value": 8, "bin_id": "bin_8", "x_metric": 8.0, "another_label":"lvl_1", "name": "corporation_87", "size":16.0},
   {"bin_value": 8, "bin_id": "bin_8", "x_metric": 8.2, "another_label":"lvl_2", "name": "corporation_88", "size":16.0},
   {"bin_value": 8, "bin_id": "bin_8", "x_metric": 8.7, "another_label":"lvl_2", "name": "corporation_89", "size":50.0},
   {"bin_value": 8, "bin_id": "bin_8", "x_metric": 8.5, "another_label":"lvl_1", "name": "corporation_90", "size":25.0},
   {"bin_value": 8, "bin_id": "bin_8", "x_metric": 8.3, "another_label":"lvl_1", "name": "corporation_91", "size":24.0},
   {"bin_value": 8, "bin_id": "bin_8", "x_metric": 8.8, "another_label":"lvl_1", "name": "corporation_92", "size":10.0},
   {"bin_value": 8, "bin_id": "bin_8", "x_metric": 8.7, "another_label":"lvl_4", "name": "corporation_93", "size":16.0},
   {"bin_value": 8, "bin_id": "bin_8", "x_metric": 8.2, "another_label":"lvl_3", "name": "corporation_94", "size":15.0},
   {"bin_value": 8, "bin_id": "bin_8", "x_metric": 8.4, "another_label":"lvl_1", "name": "corporation_95", "size":32.0},
   {"bin_value": 8, "bin_id": "bin_8", "x_metric": 8.1, "another_label":"lvl_2", "name": "corporation_96", "size":24.0},
   {"bin_value": 8, "bin_id": "bin_8", "x_metric": 8.0, "another_label":"lvl_1", "name": "corporation_97", "size":4.0},
   {"bin_value": 8, "bin_id": "bin_8", "x_metric": 8.8, "another_label":"lvl_3", "name": "corporation_98", "size":4.0},
   {"bin_value": 9, "bin_id": "bin_9", "x_metric": 9.6, "another_label":"lvl_2", "name": "corporation_99", "size":9.0},
   {"bin_value": 9, "bin_id": "bin_9", "x_metric": 9.9, "another_label":"lvl_1", "name": "corporation_100", "size":3.0},
   {"bin_value": 9, "bin_id": "bin_9", "x_metric": 9.1, "another_label":"lvl_1", "name": "corporation_101", "size":14.0},
   {"bin_value": 9, "bin_id": "bin_9", "x_metric": 9.2, "another_label":"lvl_3", "name": "corporation_102", "size":21.0},
   {"bin_value": 9, "bin_id": "bin_9", "x_metric": 9.1, "another_label":"lvl_2", "name": "corporation_103", "size":6.0},
   {"bin_value": 9, "bin_id": "bin_9", "x_metric": 9.3, "another_label":"lvl_1", "name": "corporation_104", "size":8.0},
]
