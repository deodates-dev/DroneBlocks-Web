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
  let blockId = encodeURIComponent(block.id)

  let blockString = 'mission+="|main_led_color,';
  let rgbColor = hexToRgb(hexColor);

  blockString += rgbColor.r + ',' + rgbColor.g + ',' + rgbColor.b;
  blockString += "," + encodeURIComponent(block.id)
  blockString += '";';

  return blockString;
};