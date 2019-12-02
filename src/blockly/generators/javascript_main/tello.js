Blockly.JavaScriptMain['takeoff'] = function(block) {
  return 'takeoff();\n';
};

Blockly.JavaScriptMain['set_speed'] = function(block) {
  var distance = Blockly.JavaScriptMain.valueToCode(block, 'speed', Blockly.JavaScriptMain.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'setSpeed(' + distance + ', "' + units + '");\n';
};

Blockly.JavaScriptMain['fly_forward'] = function(block) {
  var distance = Blockly.JavaScriptMain.valueToCode(block, 'distance', Blockly.JavaScriptMain.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'flyForward(' + distance + ', "' + units + '");\n';
};

Blockly.JavaScriptMain['fly_backward'] = function(block) {
  var distance = Blockly.JavaScriptMain.valueToCode(block, 'distance', Blockly.JavaScriptMain.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'flyBackward(' + distance + ', "' + units + '");\n';
};

Blockly.JavaScriptMain['fly_left'] = function(block) {
  var distance = Blockly.JavaScriptMain.valueToCode(block, 'distance', Blockly.JavaScriptMain.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'flyLeft(' + distance + ', "' + units + '");\n';
};

Blockly.JavaScriptMain['fly_right'] = function(block) {
  var distance = Blockly.JavaScriptMain.valueToCode(block, 'distance', Blockly.JavaScriptMain.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'flyRight(' + distance + ', "' + units + '");\n';
};

Blockly.JavaScriptMain['fly_up'] = function(block) {
  var distance = Blockly.JavaScriptMain.valueToCode(block, 'distance', Blockly.JavaScriptMain.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'flyUp(' + distance + ', "' + units + '");\n';
};

Blockly.JavaScriptMain['fly_down'] = function(block) {
  var distance = Blockly.JavaScriptMain.valueToCode(block, 'distance', Blockly.JavaScriptMain.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'flyDown(' + distance + ', "' + units + '");\n';
};

Blockly.JavaScriptMain['fly_xyz'] = function(block) {
  var xdistance = Blockly.JavaScriptMain.valueToCode(block, 'xdistance', Blockly.JavaScriptMain.ORDER_NONE);
  var ydistance = Blockly.JavaScriptMain.valueToCode(block, 'ydistance', Blockly.JavaScriptMain.ORDER_NONE);
  var zdistance = Blockly.JavaScriptMain.valueToCode(block, 'zdistance', Blockly.JavaScriptMain.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'flyXYZ(' + xdistance + ', ' + ydistance + ', ' + zdistance + ', "' + units + '");\n';
};

Blockly.JavaScriptMain['curve'] = function(block) {
  var x1distance = Blockly.JavaScriptMain.valueToCode(block, 'x1distance', Blockly.JavaScriptMain.ORDER_NONE);
  var y1distance = Blockly.JavaScriptMain.valueToCode(block, 'y1distance', Blockly.JavaScriptMain.ORDER_NONE);
  var z1distance = Blockly.JavaScriptMain.valueToCode(block, 'z1distance', Blockly.JavaScriptMain.ORDER_NONE);
  var x2distance = Blockly.JavaScriptMain.valueToCode(block, 'x2distance', Blockly.JavaScriptMain.ORDER_NONE);
  var y2distance = Blockly.JavaScriptMain.valueToCode(block, 'y2distance', Blockly.JavaScriptMain.ORDER_NONE);
  var z2distance = Blockly.JavaScriptMain.valueToCode(block, 'z2distance', Blockly.JavaScriptMain.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'curve(' + x1distance + ', ' + y1distance + ', ' + z1distance + ', ' + x2distance + ', ' + y2distance + ', ' + z2distance + ', "' + units + '");\n';
};

Blockly.JavaScriptMain['yaw_right'] = function(block) {
  var angle = Blockly.JavaScriptMain.valueToCode(block, 'angle', Blockly.JavaScriptMain.ORDER_NONE);
  return 'yawRight(' + angle + ');\n';
};

Blockly.JavaScriptMain['yaw_left'] = function(block) {
  var angle = Blockly.JavaScriptMain.valueToCode(block, 'angle', Blockly.JavaScriptMain.ORDER_NONE);
  return 'yawLeft(' + angle + ');\n';
};

Blockly.JavaScriptMain['flip_forward'] = function(block) {
  return 'flipForward();\n';
};

Blockly.JavaScriptMain['flip_backward'] = function(block) {
  return 'flipBackward();\n';
};

Blockly.JavaScriptMain['flip_left'] = function(block) {
  return 'flipLeft();\n';
};

Blockly.JavaScriptMain['flip_right'] = function(block) {
  return 'flipRight();\n';
};

Blockly.JavaScriptMain['land_then_takeoff'] = function(block) {
  var duration = Blockly.JavaScriptMain.valueToCode(block, 'duration', Blockly.JavaScriptMain.ORDER_NONE);
  return 'landThenTakeoff(' + duration + ');\n';
};

Blockly.JavaScriptMain['land'] = function(block) {
  return 'land();\n';
};

Blockly.JavaScriptMain['hover'] = function(block) {
  var duration = Blockly.JavaScriptMain.valueToCode(block, 'duration', Blockly.JavaScriptMain.ORDER_NONE);
  return 'hover(' + duration + ');\n';
};


Blockly.JavaScriptMain['loop'] = function(block) {
  var loopVar = Blockly.JavaScriptMain.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);
  var repeats = Blockly.JavaScriptMain.valueToCode(block, 'TIMES', Blockly.JavaScriptMain.ORDER_NONE);
  var branch = Blockly.JavaScriptMain.statementToCode(block, 'DO').trim();
  var code = "\nfor (var " + loopVar + " = 0; " + loopVar + " < " + repeats + "; " + loopVar + "++) {\n";
  code += '  ' + branch + '\n';
  code += "}\n\n";
  return code;
};

Blockly.JavaScriptMain['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var code = '', branchCode, conditionCode;
  do {
    conditionCode = Blockly.JavaScriptMain.valueToCode(block, 'IF' + n,
      Blockly.JavaScriptMain.ORDER_NONE) || 'false';
      branchCode = Blockly.JavaScriptMain.statementToCode(block, 'DO' + n) || '';
    code += (n == 0 ? 'if (' : '} else if (' ) + conditionCode + ') {\n' + branchCode;

    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE')) {
    branchCode = Blockly.JavaScriptMain.statementToCode(block, 'ELSE') ||
        Blockly.JavaScriptMain.PASS;
    code += '} else {\n' + branchCode + '}\n';
  }
  return code + '}';
};

Blockly.JavaScriptMain['variables_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.JavaScriptMain.valueToCode(block, 'VALUE',
      Blockly.JavaScriptMain.ORDER_NONE) || '0';
  var varName = Blockly.JavaScriptMain.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};
