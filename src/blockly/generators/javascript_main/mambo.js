Blockly.JavaScriptMain['takeoff'] = function(block) {
  return 'takeoff();\n';
};

Blockly.JavaScriptMain['set_speed'] = function(block) {
  var distance = Blockly.JavaScriptMain.valueToCode(block, 'speed', Blockly.JavaScriptMain.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'setSpeed(' + distance + ', "' + units + '");\n';
};

Blockly.JavaScriptMain['fly_forward'] = function(block) {
  var time = Blockly.JavaScriptMain.valueToCode(block, 'time', Blockly.JavaScriptMain.ORDER_NONE);
  return 'fly("forward", ' + time + ');\n';
};

Blockly.JavaScriptMain['fly_backward'] = function(block) {
  var time = Blockly.JavaScriptMain.valueToCode(block, 'time', Blockly.JavaScriptMain.ORDER_NONE);
  return 'fly("backward", ' + time + ');\n';
};

Blockly.JavaScriptMain['fly_left'] = function(block) {
  var time = Blockly.JavaScriptMain.valueToCode(block, 'time', Blockly.JavaScriptMain.ORDER_NONE);
  return 'fly("left", ' + time + ');\n';
};

Blockly.JavaScriptMain['fly_right'] = function(block) {
  var time = Blockly.JavaScriptMain.valueToCode(block, 'time', Blockly.JavaScriptMain.ORDER_NONE);
  return 'fly("right", ' + time + ');\n';
};

Blockly.JavaScriptMain['fly_up'] = function(block) {
  var time = Blockly.JavaScriptMain.valueToCode(block, 'time', Blockly.JavaScriptMain.ORDER_NONE);
  return 'fly("up", ' + time + ');\n';
};

Blockly.JavaScriptMain['fly_down'] = function(block) {
  var time = Blockly.JavaScriptMain.valueToCode(block, 'time', Blockly.JavaScriptMain.ORDER_NONE);
  return 'fly("down", ' + time + ');\n';
};

Blockly.JavaScriptMain['yaw_right'] = function(block) {
  var angle = Blockly.JavaScriptMain.valueToCode(block, 'angle', Blockly.JavaScriptMain.ORDER_NONE);
  return 'yaw("right", ' + angle + ');\n';
};

Blockly.JavaScriptMain['yaw_left'] = function(block) {
  var angle = Blockly.JavaScriptMain.valueToCode(block, 'angle', Blockly.JavaScriptMain.ORDER_NONE);
  return 'yaw("left", ' + angle + ');\n';
};

Blockly.JavaScriptMain['flip_forward'] = function(block) {
  return 'flip("forward");\n';
};

Blockly.JavaScriptMain['flip_backward'] = function(block) {
  return 'flip("backward");\n';
};

Blockly.JavaScriptMain['flip_left'] = function(block) {
  return 'flip("left");\n';
};

Blockly.JavaScriptMain['flip_right'] = function(block) {
  return 'flip("right");\n';
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
