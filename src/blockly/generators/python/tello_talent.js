Blockly.Python['main_led_color'] = function(block) {
  var hexColor = block.getFieldValue('color');
  let rgbColor = hexToRgb(hexColor);
  return "setMainLedColor(" + rgbColor.r + " ," + rgbColor.g + " ," + rgbColor.b + ");\n";
  return code;
};


Blockly.Python['video_duration'] = function(block) {
  var duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_NONE);
  return "video('start', " + duration + ");\n";
};