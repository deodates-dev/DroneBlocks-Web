Blockly.Blocks['main_led_color'] = {
  init: function() {
    this.jsonInit(
      {
        "type": "main_led_color",
        "message0": "set color %1",
        "args0": [
          {
            "type": "field_colour",
            "name": "color",
            "colour": "#ff0000"
          }
        ],
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#f988fd",
        "tooltip": "Set color of main LED"
      }
    );
  }
}

Blockly.Blocks['main_led_color_rgb'] = {
  init: function() {
    this.jsonInit(
    {
        "message0": "set color with red %1 green %2 blue %3 %4",
        "args0": [
          {
            "type": "input_value",
            "name": "red"
          },
          {
            "type": "input_value",
            "name": "green"
          },
          {
            "type": "input_value",
            "name": "blue"
          },
          {
            "type": "input_dummy"
          }
        ],
        "tooltip": "Set color of main LED using RGB values from 0-255",
        "previousStatement": null,
        "nextStatement": null,
        "colour": "#f988fd"
      });
  }
};

Blockly.Blocks['main_led_pulse'] = {
  init: function() {
    this.jsonInit(
    {
        "message0": "pulse with color %1 frequency %2 %3",
        "args0": [
          {
            "type": "field_colour",
            "name": "color",
            "colour": "#ff0000"
          },
          {
            "type": "input_value",
            "name": "frequency",
          },
          {
            "type": "input_dummy"
          }
        ],
        "tooltip": "Pulse main LED with a frequency between 0.1 to 2.5 Hz",
        "previousStatement": true,
        "nextStatement": true,
        "colour": "#f988fd"
      });
  }
};

Blockly.Blocks['main_led_pulse_colors'] = {
  init: function() {
    this.jsonInit(
    {
        "message0": "pulse with color 1 %1 color 2 %2 frequency %3 %4",
        "args0": [
          {
            "type": "field_colour",
            "name": "color1",
            "colour": "#00ff00"
          },
          {
            "type": "field_colour",
            "name": "color2",
            "colour": "#0000ff"
          },
          {
            "type": "input_value",
            "name": "frequency",
          },
          {
            "type": "input_dummy"
          }
        ],
        "tooltip": "Pulse main LED with two colors and a frequency between 0.1 to 10 Hz",
        "previousStatement": true,
        "nextStatement": true,
        "colour": "#f988fd"
      });
  }
};


