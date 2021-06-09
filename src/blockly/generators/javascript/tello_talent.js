function hexToRgb(hex) {
  let result = hex.replace(/'/g,''); // Remove single quotes, in value input cases Blockly will wrap in single quotes
  result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(result);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

Blockly.JavaScript['motors_start'] = function(block) {
  return 'mission+="|motors_start,' + encodeURIComponent(block.id) + '";';
};

Blockly.JavaScript['motors_stop'] = function(block) {
  return 'mission+="|motors_stop,' + encodeURIComponent(block.id) + '";';
};

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

Blockly.JavaScript['main_led_pulse'] = function(block) {

  let hexColor = Blockly.JavaScript.valueToCode(block, 'color', Blockly.JavaScript.ORDER_NONE);
  let rgbColor = hexToRgb(hexColor);
  let frequency = Blockly.JavaScript.valueToCode(block, 'frequency', Blockly.JavaScript.ORDER_NONE);
  let blockString = 'mission+="|main_led_pulse,';

  blockString += rgbColor.r + ',' + rgbColor.g + ',' + rgbColor.b;

  if(isNaN(parseInt(frequency))) {
    blockString += '" + eval(' + frequency + ') + "';
  } else {
    blockString += ',' + frequency;
  }

  blockString += "," + encodeURIComponent(block.id);
  blockString += '";';

  return blockString;
  
};

Blockly.JavaScript['main_led_pulse_colors'] = function(block) {

  let hexColor1 = Blockly.JavaScript.valueToCode(block, 'color1', Blockly.JavaScript.ORDER_NONE);
  let rgbColor1 = hexToRgb(hexColor1);
  let hexColor2 = Blockly.JavaScript.valueToCode(block, 'color2', Blockly.JavaScript.ORDER_NONE);
  let rgbColor2 = hexToRgb(hexColor2);
  let frequency = Blockly.JavaScript.valueToCode(block, 'frequency', Blockly.JavaScript.ORDER_NONE);
  let blockString = 'mission+="|main_led_pulse_colors,';

  blockString += rgbColor1.r + ',' + rgbColor1.g + ',' + rgbColor1.b;
  blockString += ','+ rgbColor2.r + ',' + rgbColor2.g + ',' + rgbColor2.b;

  if(isNaN(parseInt(frequency))) {
    blockString += '" + eval(' + frequency + ') + "';
  } else {
    blockString += ',' + frequency;
  }

  blockString += "," + encodeURIComponent(block.id);
  blockString += '";';

  return blockString;
  
};

Blockly.JavaScript['matrix_led_colors'] = function(block) {
  let color = block.getFieldValue('color');
  let blockString = 'mission+="|matrix_led_colors,';
  let output = "";

  for (let i = 1; i <= 64; i++) {
    let color = block.getFieldValue('l' + i);

    if (color.indexOf('#ff0000') > -1) {
      output += "r";
    } else if (color.indexOf('#0000ff') > -1) {
      output += "b";
    } else if (color.indexOf('#6d2aff') > -1) {
      output += "p";
    } else if (color.indexOf('#000000') > -1) {
      output += "0";
    }

  }

  blockString += output;
  blockString += "," + encodeURIComponent(block.id);
  blockString += '";';

  return blockString;
};