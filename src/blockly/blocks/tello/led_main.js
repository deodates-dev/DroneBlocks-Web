Blockly.Blocks['led_main_components'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set LED")
        .appendField("R")
        .appendField(new Blockly.FieldNumber(500, 0, 255), "r")
        .appendField("G")
        .appendField(new Blockly.FieldNumber(500, 0, 255), "g")
        .appendField("B")
        .appendField(new Blockly.FieldNumber(500, 0, 255), "b");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(270);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['led_main_color'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set LED")
        .appendField(new Blockly.FieldColour("#ff0000"), "rgb");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(270);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};