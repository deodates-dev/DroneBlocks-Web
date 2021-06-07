Blockly.Python['main_led_color'] = function(block) {
  var hexColor = block.getFieldValue('color');
  let rgbColor = hexToRgb(hexColor);
  return "setMainLedColor(" + rgbColor.r + " ," + rgbColor.g + " ," + rgbColor.b + ");\n";
};

Blockly.Python['main_led_color_rgb'] = function(block) {
  let red = Blockly.Python.valueToCode(block, 'red', Blockly.JavaScript.ORDER_NONE);
  let green = Blockly.Python.valueToCode(block, 'green', Blockly.JavaScript.ORDER_NONE);
  let blue = Blockly.Python.valueToCode(block, 'blue', Blockly.JavaScript.ORDER_NONE);
  return "setMainLedColor(" + red + " ," + green + " ," + blue + ");\n";
};