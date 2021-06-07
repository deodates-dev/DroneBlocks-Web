function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

Blockly.JavaScript['main_led_color'] = function(block) {
  let hexColor = block.getFieldValue('color');
  let rgbColor = hexToRgb(hexColor);
  let blockString = 'mission+="|main_led_color,';

  blockString += rgbColor.r + ',' + rgbColor.g + ',' + rgbColor.b;
  blockString += "," + encodeURIComponent(block.id);
  blockString += '";';

  return blockString;
};

Blockly.JavaScript['main_led_color_rgb'] = function(block) {
  let red = Blockly.JavaScript.valueToCode(block, 'red', Blockly.JavaScript.ORDER_NONE);
  let green = Blockly.JavaScript.valueToCode(block, 'green', Blockly.JavaScript.ORDER_NONE);
  let blue = Blockly.JavaScript.valueToCode(block, 'blue', Blockly.JavaScript.ORDER_NONE);
  let blockString = 'mission+="|main_led_color,';

  if(isNaN(parseInt(red))) {
    blockString += '" + eval(' + red + ') + "';
  } else {
    blockString += red;
  }

  if(isNaN(parseInt(green))) {
    blockString += '," + eval(' + green + ') + "';
  } else {
    blockString += ',' + green;
  }

  if(isNaN(parseInt(blue))) {
    blockString += '," + eval(' + blue + ') + "';
  } else {
    blockString += ',' + blue;
  }
  
  blockString += "," + encodeURIComponent(block.id);
  blockString += '";';

  return blockString;
};