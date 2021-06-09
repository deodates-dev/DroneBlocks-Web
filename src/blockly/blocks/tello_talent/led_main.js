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
        "colour": 270,
        "tooltip": "Set color of main LED",
        "helpUrl": ""
      }
    );
  }
}

Blockly.Blocks['main_led_color_rgb'] = {
  init: function() {
    this.jsonInit(
    {
        "message0": "set color with red %1 green %2 blue %3",
        "args0": [
          {
            "type": "input_value",
            "name": "red",
            "align": "RIGHT",
            "min": 0,
            "max": 255,
          },
          {
            "type": "input_value",
            "name": "green",
            "align": "RIGHT",
            "min": 0,
            "max": 255
          },
          {
            "type": "input_value",
            "name": "blue",
            "align": "RIGHT",
            "min": 0,
            "max": 255
          }
        ],
        "tooltip": "Set color of main LED using RGB values from 0-255",
        "previousStatement": true,
        "nextStatement": true,
        "colour": 270
      });
  }
};

Blockly.Blocks['main_led_pulse'] = {
  init: function() {
    this.jsonInit(
    {
        "message0": "pulse with color %1 frequency %2",
        "args0": [
          {
            "type": "input_value",
            "name": "color",
            "align": "RIGHT",
            "colour": "#ff0000"
          },
          {
            "type": "input_value",
            "name": "frequency",
            "align": "RIGHT",
            "min": 0.1,
            "max": 2.5
          }
        ],
        "tooltip": "Pulse main LED with a frequency between 0.1 to 2.5 Hz",
        "previousStatement": true,
        "nextStatement": true,
        "colour": 270
      });
  }
};

Blockly.Blocks['main_led_pulse_colors'] = {
  init: function() {
    this.jsonInit(
    {
        "message0": "pulse with color 1 %1 color 2 %2 frequency %3",
        "args0": [
          {
            "type": "input_value",
            "name": "color1",
            "align": "RIGHT"
          },
          {
            "type": "input_value",
            "name": "color2",
            "align": "RIGHT"
          },
          {
            "type": "input_value",
            "name": "frequency",
            "align": "RIGHT",
            "min": 0.1,
            "max": 10
          }
        ],
        "tooltip": "Pulse main LED with two colors and a frequency between 0.1 to 10 Hz",
        "previousStatement": true,
        "nextStatement": true,
        "colour": 270
      });
  }
};


