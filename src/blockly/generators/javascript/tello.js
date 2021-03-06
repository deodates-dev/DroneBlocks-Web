Blockly.JavaScript['takeoff'] = function(block) {
  return 'mission+="takeoff,' + encodeURIComponent(block.id) + '";';
};

Blockly.JavaScript['takeoff_after'] = function(block) {
  var delay = Blockly.JavaScript.valueToCode(block, 'delay', Blockly.JavaScript.ORDER_NONE);
  let blockId = encodeURIComponent(block.id)

  if(isNaN(parseInt(delay))) {
    return 'mission+="hover," + eval(' + delay + ') + ",' + blockId + '|takeoff,' + blockId + '";';
  } else {
    return 'mission+="hover,' + delay + ',' + blockId + '|takeoff,' + blockId + '";';
  }
};


Blockly.JavaScript['set_speed'] = function(block) {
  var distance = Blockly.JavaScript.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  let blockId = encodeURIComponent(block.id)

  if(isNaN(parseInt(distance))) {
    return 'mission+="|speed," + eval(' + distance + ') + ",' + units + ',' + blockId + '";';
  } else {
    return 'mission+="|speed,' + distance + ',' + units + ',' + blockId + '";';
  }
};

Blockly.JavaScript['fly_forward'] = function(block) {
  var distance = Blockly.JavaScript.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  let blockId = encodeURIComponent(block.id)

  if(isNaN(parseInt(distance))) {
    return 'mission+="|fly_forward," + eval(' + distance + ') + ",' + units + ',' + blockId + '";';
  } else {
    return 'mission+="|fly_forward,' + distance + ',' + units + ',' + blockId + '";';
  }
};

Blockly.JavaScript['fly_backward'] = function(block) {
  var distance = Blockly.JavaScript.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  let blockId = encodeURIComponent(block.id)

  if(isNaN(parseInt(distance))) {
    return 'mission+="|fly_backward," + eval(' + distance + ') + ",' + units + ',' + blockId + '";';
  } else {
    return 'mission+="|fly_backward,' + distance + ',' + units + ',' + blockId + '";';
  }
};

Blockly.JavaScript['fly_left'] = function(block) {
  var distance = Blockly.JavaScript.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  let blockId = encodeURIComponent(block.id)

  if(isNaN(parseInt(distance))) {
    return 'mission+="|fly_left," + eval(' + distance + ') + ",' + units + ',' + blockId + '";';
  } else {
    return 'mission+="|fly_left,' + distance + ',' + units + ',' + blockId + '";';
  }
};

Blockly.JavaScript['fly_right'] = function(block) {
  var distance = Blockly.JavaScript.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  let blockId = encodeURIComponent(block.id)

  if(isNaN(parseInt(distance))) {
    return 'mission+="|fly_right," + eval(' + distance + ') + ",' + units + ',' + blockId + '";';
  } else {
    return 'mission+="|fly_right,' + distance + ',' + units + ',' + blockId + '";';
  }
};

Blockly.JavaScript['fly_up'] = function(block) {
  var distance = Blockly.JavaScript.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  let blockId = encodeURIComponent(block.id)

  if(isNaN(parseInt(distance))) {
    return 'mission+="|fly_up," + eval(' + distance + ') + ",' + units + ',' + blockId + '";';
  } else {
    return 'mission+="|fly_up,' + distance + ',' + units + ',' + blockId + '";';
  }
};

Blockly.JavaScript['fly_down'] = function(block) {
  var distance = Blockly.JavaScript.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  let blockId = encodeURIComponent(block.id)

  if(isNaN(parseInt(distance))) {
    return 'mission+="|fly_down," + eval(' + distance + ') + ",' + units + ',' + blockId + '";';
  } else {
    return 'mission+="|fly_down,' + distance + ',' + units + ',' + blockId + '";';
  }
};

Blockly.JavaScript['fly_xyz'] = function(block) {
  var xdistance = Blockly.JavaScript.valueToCode(block, 'xdistance', Blockly.JavaScript.ORDER_NONE);
  var ydistance = Blockly.JavaScript.valueToCode(block, 'ydistance', Blockly.JavaScript.ORDER_NONE);
  var zdistance = Blockly.JavaScript.valueToCode(block, 'zdistance', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  
  var blockString = 'mission+="|fly_xyz,';

  if(isNaN(parseInt(xdistance))) {
    blockString += '" + eval(' + xdistance + ') + "';
  } else {
    blockString += xdistance;
  }
  
  if(isNaN(parseInt(ydistance))) {
    blockString += '," + eval(' + ydistance + ') + "';
  } else {
    blockString += ',' + ydistance;
  }
  
  if(isNaN(parseInt(zdistance))) {
    blockString += '," + eval(' + zdistance + ') + "';
  } else {
    blockString += ',' + zdistance;
  }
  
  blockString += "," + units;
  blockString += "," + encodeURIComponent(block.id)
  blockString += '";';
  
  return blockString;
  
};

Blockly.JavaScript['curve'] = function(block) {
  var x1distance = Blockly.JavaScript.valueToCode(block, 'x1distance', Blockly.JavaScript.ORDER_NONE);
  var y1distance = Blockly.JavaScript.valueToCode(block, 'y1distance', Blockly.JavaScript.ORDER_NONE);
  var z1distance = Blockly.JavaScript.valueToCode(block, 'z1distance', Blockly.JavaScript.ORDER_NONE);
  var x2distance = Blockly.JavaScript.valueToCode(block, 'x2distance', Blockly.JavaScript.ORDER_NONE);
  var y2distance = Blockly.JavaScript.valueToCode(block, 'y2distance', Blockly.JavaScript.ORDER_NONE);
  var z2distance = Blockly.JavaScript.valueToCode(block, 'z2distance', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  
  var blockString = 'mission+="|curve,';

  if(isNaN(parseInt(x1distance))) {
    blockString += '" + eval(' + x1distance + ') + "';
  } else {
    blockString += x1distance;
  }
  
  if(isNaN(parseInt(y1distance))) {
    blockString += '," + eval(' + y1distance + ') + "';
  } else {
    blockString += ',' + y1distance;
  }
  
  if(isNaN(parseInt(z1distance))) {
    blockString += '," + eval(' + z1distance + ') + "';
  } else {
    blockString += ',' + z1distance;
  }

  if(isNaN(parseInt(x2distance))) {
    blockString += '," + eval(' + x2distance + ') + "';
  } else {
    blockString += ',' + x2distance;
  }
  
  if(isNaN(parseInt(y2distance))) {
    blockString += '," + eval(' + y2distance + ') + "';
  } else {
    blockString += ',' + y2distance;
  }
  
  if(isNaN(parseInt(z2distance))) {
    blockString += '," + eval(' + z2distance + ') + "';
  } else {
    blockString += ',' + z2distance;
  }  
  
  blockString += "," + units;
  blockString += "," + encodeURIComponent(block.id)
  blockString += '";';
  
  return blockString;
  
};

Blockly.JavaScript['hover'] = function(block) {
  var duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_NONE);
  let blockId = encodeURIComponent(block.id)

  if(isNaN(parseInt(duration))) {
    return 'mission+="|hover," + eval(' + duration + ') + ",' + blockId + '";';
  } else {
    return 'mission+="|hover,' + duration + ',' + blockId + '";';
  }
};

Blockly.JavaScript['yaw_right'] = function(block) {
  var angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_NONE);
  let blockId = encodeURIComponent(block.id)

  if(isNaN(parseInt(angle))) {
    return 'mission+="|yaw_right," + eval(' + angle + ') + ",' + blockId + '";';
  } else {
    return 'mission+="|yaw_right,' + angle + ',' + blockId + '";';
  }
};

Blockly.JavaScript['yaw_left'] = function(block) {
  var angle = Blockly.JavaScript.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_NONE);
  let blockId = encodeURIComponent(block.id)

  if(isNaN(parseInt(angle))) {
    return 'mission+="|yaw_left," + eval(' + angle + ') + ",' + blockId + '";';
  } else {
    return 'mission+="|yaw_left,' + angle + ',' + blockId + '";';
  }
};

Blockly.JavaScript['photo'] = function(block) {
  return 'mission+="|photo,' + encodeURIComponent(block.id) + '";';

   
};

Blockly.JavaScript['photo_interval'] = function(block) {
  var photo_count = Blockly.JavaScript.valueToCode(block, 'photo_count', Blockly.JavaScript.ORDER_NONE);
  var interval = Blockly.JavaScript.valueToCode(block, 'interval', Blockly.JavaScript.ORDER_NONE);

  var blockString = 'mission+="|photo_interval,';

  if(isNaN(parseInt(photo_count))) {
    blockString += '" + eval(' + photo_count + ') + "';
  } else {
    blockString += photo_count;
  }
  
  if(isNaN(parseInt(interval))) {
    blockString += '," + eval(' + interval + ') + "';
  } else {
    blockString += ',' + interval;
  }

  blockString += "," + encodeURIComponent(block.id)
  blockString += '";';

  return blockString;
}; 

Blockly.JavaScript['video'] = function(block) {
  var action = block.getFieldValue("video_action");
  return 'mission+="|video,' + action + '";';
};

Blockly.JavaScript['video_duration'] = function(block) {
  var duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_NONE);

  if(isNaN(parseInt(duration))) {
    return 'mission+="|video_duration," + eval(' + duration + ') + "";';
  } else {
    return 'mission+="|video_duration,' + duration + '";';
  }
};

Blockly.JavaScript['flip_forward'] = function(block) {
  return 'mission+="|flip_forward,' + encodeURIComponent(block.id) + '";';
};

Blockly.JavaScript['flip_backward'] = function(block) {
  return 'mission+="|flip_backward,' + encodeURIComponent(block.id) + '";';
};

Blockly.JavaScript['flip_left'] = function(block) {
  return 'mission+="|flip_left,' + encodeURIComponent(block.id) + '";';
};

Blockly.JavaScript['flip_right'] = function(block) {
  return 'mission+="|flip_right,' + encodeURIComponent(block.id) + '";';
};

Blockly.JavaScript['land_then_takeoff'] = function(block) {
  var duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_NONE);
  let blockId = encodeURIComponent(block.id)

  if(isNaN(parseInt(duration))) {
    return 'mission+="|land,' + blockId + '|hover," + eval(' + duration + ') + ",' + blockId + '|takeoff,' + blockId + '";';
  } else {
    return 'mission+="|land,' + blockId + '|hover,' + duration + ',' + blockId + '|takeoff,' + blockId + '";';
  }
};

Blockly.JavaScript['land'] = function(block) {
  return 'mission+="|land,' + encodeURIComponent(block.id) + '";';
};

Blockly.JavaScript['loop'] = function(block) {
  var loopVar = Blockly.JavaScript.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);
  var repeats = Blockly.JavaScript.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_NONE);  
  var branch = Blockly.JavaScript.statementToCode(block, 'DO').trim();
  var code = "for(var " + loopVar + " = 0; " + loopVar + " < " + repeats + "; " + loopVar + "++){" + branch + "}";
  return code;  
};