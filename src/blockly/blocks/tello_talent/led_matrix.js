Blockly.Blocks['matrix_clear'] = {
	init: function() {
		this.jsonInit(
			{
				"type": "matrix_clear",
				"message0": "clear matrix",
				"previousStatement": null,
				"nextStatement": null,
				"colour": "#f988fd",
				"tooltip": "Turn off all matrix LEDs"
			}
		);
	}
};

Blockly.Blocks['matrix_single_led'] = {
	init: function() {
		this.jsonInit(
      {
        "type": "block_type",
        "message0": "set color %1 row %2 column %3 %4",
        "args0": [
          {
            "type": "field_colour",
            "name": "color",
			"align": "RIGHT",
            "colour": "#ff0000",
			"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
          },
          {
            "type": "input_value",
            "name": "row",
			"align": "RIGHT",
            "value": 1,
            "min": 1,
            "max": 64
          },
          {
            "type": "input_value",
            "name": "column",
			"align": "RIGHT",
            "value": 1,
            "min": 1,
            "max": 64
          },
		  {
			  "type": "input_dummy"
		  }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#f988fd",
        "tooltip": "Set the color of any 1 of 64 LEDs in the matrix",
      }
		);
	}
};

Blockly.Blocks['matrix_scroll_text'] = {
	init: function() {
		this.jsonInit(
			{
				"type": "matrix_scroll_text",
				"message0": "scroll text %1 direction %2 color %3 frequency %4 %5",
				"args0": [
					{
						"type": "field_input",
						"name": "message",
						"text": "hello world!"
					},
					{
						"type": "field_dropdown",
						"name": "direction",
						"options": [
							[
								"left",
								"l"
							],
							[
								"right",
								"r"
							],
							[
								"up",
								"u"
							],
							[
								"down",
								"d"
							]
						]
					},
					{
						"type": "field_colour",
						"name": "color",
						"colour": "#ff0000",
						"colourOptions": ['#ff0000', '#0000ff', '#6d2aff']
					},
					{
						"type": "input_value",
						"name": "frequency"
					},
					{
						"type": "input_dummy"
					}
				],
				"previousStatement": null,
				"nextStatement": null,
				"colour": "#f988fd",
				"tooltip": "Scroll text a given direction with a frequency between 0.1 to 2.5 Hz. Max 70 characters.",
			}
		);
	}
};

Blockly.Blocks['matrix_led_colors'] = {
	init: function() {
		this.jsonInit(
			{
					"type": "matrix_led_colors",
					"message0": "set matrix colors %1 %2 %3 %4 %5 %6 %7 %8 %9 %10 %11 %12 %13 %14 %15 %16 %17 %18 %19 %20 %21 %22 %23 %24 %25 %26 %27 %28 %29 %30 %31 %32 %33 %34 %35 %36 %37 %38 %39 %40 %41 %42 %43 %44 %45 %46 %47 %48 %49 %50 %51 %52 %53 %54 %55 %56 %57 %58 %59 %60 %61 %62 %63 %64 %65 %66 %67 %68 %69 %70 %71 %72",
					"args0": [
						{
							"type": "input_dummy"
						},
						{
							"type": "field_colour",
							"name": "l1",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l2",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l3",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l4",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l5",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l6",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l7",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l8",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "input_dummy"
						},
						{
							"type": "field_colour",
							"name": "l9",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l10",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l11",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l12",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l13",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l14",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l15",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l16",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "input_dummy"
						},
						{
							"type": "field_colour",
							"name": "l17",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l18",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l19",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l20",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l21",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l22",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l23",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l24",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "input_dummy"
						},
						{
							"type": "field_colour",
							"name": "l25",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l26",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l27",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l28",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l29",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l30",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l31",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l32",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "input_dummy"
						},
						{
							"type": "field_colour",
							"name": "l33",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l34",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l35",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l36",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l37",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l38",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l39",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l40",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "input_dummy"
						},
						{
							"type": "field_colour",
							"name": "l41",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l42",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l43",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l44",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l45",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l46",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l47",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l48",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "input_dummy"
						},
						{
							"type": "field_colour",
							"name": "l49",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l50",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l51",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l52",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l53",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l54",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l55",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l56",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "input_dummy"
						},
						{
							"type": "field_colour",
							"name": "l57",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l58",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l59",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l60",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l61",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l62",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l63",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						},
						{
							"type": "field_colour",
							"name": "l64",
							"colour": "#ff0000",
							"colourOptions": ['#ff0000', '#0000ff', '#6d2aff', '#000000']
						}
					],
					"previousStatement": null,
					"nextStatement": null,
					"colour": "#f988fd",
					"tooltip": "Set the matrix LED colors to red, blue, purple or off"
				}
		);
	}
}