Blockly.Python['motors_start'] = function(block) {
  return 'startMotors();\n';
};

Blockly.Python['motors_stop'] = function(block) {
  return 'stopMotors();\n';
};

Blockly.Python['main_led_color'] = function(block) {
  var hexColor = block.getFieldValue('color');
  let rgbColor = hexToRgb(hexColor);
  return "setMainLedColor(" + rgbColor.r + " ," + rgbColor.g + " ," + rgbColor.b + ");\n";
};

Blockly.Python['main_led_color_rgb'] = function(block) {
  let red = Blockly.Python.valueToCode(block, 'red', Blockly.JavaScript.ORDER_NONE);
  let green = Blockly.Python.valueToCode(block, 'green', Blockly.JavaScript.ORDER_NONE);
  let blue = Blockly.Python.valueToCode(block, 'blue', Blockly.JavaScript.ORDER_NONE);
  return "setMainLedColor(" + red + ", " + green + ", " + blue + ");\n";
};

Blockly.Python['main_led_pulse'] = function(block) {
  var hexColor = block.getFieldValue('color');
  let rgbColor = hexToRgb(hexColor);
  let frequency = Blockly.Python.valueToCode(block, 'frequency', Blockly.JavaScript.ORDER_NONE);
  return "pulseMainLed(" + rgbColor.r + ", " + rgbColor.g + ", " + rgbColor.b + ", " + frequency + ");\n";
};

Blockly.Python['main_led_pulse_colors'] = function(block) {
  var hexColor1 = block.getFieldValue('color1');
  var hexColor2 = block.getFieldValue('color2');
  let rgbColor1 = hexToRgb(hexColor1);
  let rgbColor2 = hexToRgb(hexColor2);
  let frequency = Blockly.Python.valueToCode(block, 'frequency', Blockly.JavaScript.ORDER_NONE);
  return "pulseMainLedWithColors(" + rgbColor1.r + ", " + rgbColor1.g + ", " + rgbColor1.b + ", " + rgbColor2.r + ", " + rgbColor2.g + ", " + rgbColor2.b + ", " + frequency + ");\n";
};

Blockly.Python['matrix_clear'] = function(block) {
  
  return "setMatrixLedColors(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);";

};

Blockly.Python['matrix_single_led'] = function(block) {
  let row = Blockly.Python.valueToCode(block, 'row', Blockly.JavaScript.ORDER_NONE);
  let column = Blockly.Python.valueToCode(block, 'column', Blockly.JavaScript.ORDER_NONE);
  let color = block.getFieldValue('color');

  return "setMatrixLed('" + color + "', " + row + ", " + column + ");\n";

};

Blockly.Python['matrix_scroll_text'] = function(block) {
  let message = block.getFieldValue('message');
  let direction = block.getFieldValue('direction');
  let color = block.getFieldValue('color');
  let frequency = Blockly.JavaScript.valueToCode(block, 'frequency', Blockly.JavaScript.ORDER_NONE);

  return "scrollMatrixText('" + message + "', '" + direction + "', '" + color + "', " + frequency + ");\n";

};


Blockly.Python['matrix_led_colors'] = function(block) {
  
  let output = "setMatrixLedColors(";

  for (let i = 1; i <= 64; i++) {
    let color = block.getFieldValue('l' + i);

    if (color.indexOf('#ff0000') > -1) {
      output += "'r', ";
    } else if (color.indexOf('#0000ff') > -1) {
      output += "'b', ";
    } else if (color.indexOf('#6d2aff') > -1) {
      output += "'p', ";
    } else if (color.indexOf('#000000') > -1) {
      output += "'0', ";
    }

  }

  output += ");\n";

  return output;

};

