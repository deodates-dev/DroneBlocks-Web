Blockly.Python['motors_start'] = function(block) {
  return 'startMotors();\n';
};

Blockly.Python['motors_stop'] = function(block) {
  return 'stopMotors();\n';
};

Blockly.Python['main_led_color'] = function(block) {
  var hexColor = block.getFieldValue('color');
  console.log(hexColor);
  let rgbColor = hexToRgb(hexColor);
  console.log(rgbColor);
  return "setMainLedColor(" + rgbColor.r + " ," + rgbColor.g + " ," + rgbColor.b + ");\n";
};

Blockly.Python['main_led_color_rgb'] = function(block) {
  let red = Blockly.Python.valueToCode(block, 'red', Blockly.JavaScript.ORDER_NONE);
  let green = Blockly.Python.valueToCode(block, 'green', Blockly.JavaScript.ORDER_NONE);
  let blue = Blockly.Python.valueToCode(block, 'blue', Blockly.JavaScript.ORDER_NONE);
  return "setMainLedColor(" + red + ", " + green + ", " + blue + ");\n";
};

Blockly.Python['main_led_pulse'] = function(block) {
  let hexColor = Blockly.Python.valueToCode(block, 'color', Blockly.JavaScript.ORDER_NONE);
  let rgbColor = hexToRgb(hexColor);
  let frequency = Blockly.Python.valueToCode(block, 'frequency', Blockly.JavaScript.ORDER_NONE);
  return "pulseMainLed(" + rgbColor.r + ", " + rgbColor.g + ", " + rgbColor.b + ", " + frequency + ");\n";
};
