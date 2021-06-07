Blockly.Blocks['led_pulse'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Pulse")
        .appendField(new Blockly.FieldColour("#ff0000"), "NAME")
        .appendField("with frequency:")
        .appendField(new Blockly.FieldNumber(0, 0.1, 100), "NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['led_pulse_components'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Pulse")
        .appendField("R")
        .appendField(new Blockly.FieldNumber(0, 0, 255), "r")
        .appendField("G")
        .appendField(new Blockly.FieldNumber(0, 0, 255), "g")
        .appendField("B")
        .appendField(new Blockly.FieldNumber(0, 0, 255), "b")
        .appendField("with frequency:")
        .appendField(new Blockly.FieldNumber(0, 0.1, 100), "NAME");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['pulse_led_between'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Pulse between")
        .appendField(new Blockly.FieldColour("#ff0000"), "color1")
        .appendField("and")
        .appendField(new Blockly.FieldColour("#3333ff"), "color2")
        .appendField("with frequency:")
        .appendField(new Blockly.FieldNumber(0, 0.1, 100), "frequency");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['main_led_color'] = {
  init: function() {
    this.jsonInit(
      {
        "type": "main_led_color",
        "message0": "LED color %1",
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
        "tooltip": "Set the color of the main LED",
        "helpUrl": ""
      }
    );
  }
}

Blockly.Blocks['main_led_color_rgb'] = {
  /**
   * Show block.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit(
    {
        "message0": "LED color with red %1 green %2 blue %3",
        "args0": [
          {
            "type": "input_value",
            "name": "red",
            "aligh": "RIGHT",
            "min": 0,
            "max": 255
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
        "helpUrl": "%{BKY_COLOUR_RGB_HELPURL}",
        "tooltip": "%{BKY_COLOUR_RGB_TOOLTIP}",
        "previousStatement": true,
        "nextStatement": true,
        "colour": 270
      });
  }
};