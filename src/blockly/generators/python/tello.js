Blockly.Python['takeoff'] = function(block) {
  return 'takeOff();\n';
};

Blockly.Python['takeoff_after'] = function(block) {
  var delay = Blockly.JavaScript.valueToCode(block, 'delay', Blockly.JavaScript.ORDER_NONE);
  return 'takeOffAfter(' + delay + ');\n';
};

Blockly.Python['set_speed'] = function(block) {
  var distance = Blockly.Python.valueToCode(block, 'speed', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'setSpeed(' + distance + ', "' + units + '");\n';
};

Blockly.Python['fly_forward'] = function(block) {
  var distance = Blockly.Python.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'flyForward(' + distance + ', "' + units + '");\n';
};

Blockly.Python['fly_backward'] = function(block) {
  var distance = Blockly.Python.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'flyBackward(' + distance + ', "' + units + '");\n';
};

Blockly.Python['fly_left'] = function(block) {
  var distance = Blockly.Python.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'flyLeft(' + distance + ', "' + units + '");\n';
};

Blockly.Python['fly_right'] = function(block) {
  var distance = Blockly.Python.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'flyRight(' + distance + ', "' + units + '");\n';
};

Blockly.Python['fly_up'] = function(block) {
  var distance = Blockly.Python.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'flyUp(' + distance + ', "' + units + '");\n';
};

Blockly.Python['fly_down'] = function(block) {
  var distance = Blockly.Python.valueToCode(block, 'distance', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'flyDown(' + distance + ', "' + units + '");\n';
};

Blockly.Python['fly_xyz'] = function(block) {
  var xdistance = Blockly.Python.valueToCode(block, 'xdistance', Blockly.JavaScript.ORDER_NONE);
  var ydistance = Blockly.Python.valueToCode(block, 'ydistance', Blockly.JavaScript.ORDER_NONE);
  var zdistance = Blockly.Python.valueToCode(block, 'zdistance', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'flyXYZ(' + xdistance + ', ' + ydistance + ', ' + zdistance + ', "' + units + '");\n';
};

Blockly.Python['curve'] = function(block) {
  var x1distance = Blockly.Python.valueToCode(block, 'x1distance', Blockly.JavaScript.ORDER_NONE);
  var y1distance = Blockly.Python.valueToCode(block, 'y1distance', Blockly.JavaScript.ORDER_NONE);
  var z1distance = Blockly.Python.valueToCode(block, 'z1distance', Blockly.JavaScript.ORDER_NONE);
  var x2distance = Blockly.Python.valueToCode(block, 'x2distance', Blockly.JavaScript.ORDER_NONE);
  var y2distance = Blockly.Python.valueToCode(block, 'y2distance', Blockly.JavaScript.ORDER_NONE);
  var z2distance = Blockly.Python.valueToCode(block, 'z2distance', Blockly.JavaScript.ORDER_NONE);
  var units = block.getFieldValue("units");
  return 'flyCurve(' + x1distance + ', ' + y1distance + ', ' + z1distance + ', ' + x2distance + ', ' + y2distance + ', ' + z2distance + ', "' + units + '");\n';
};

Blockly.Python['yaw_right'] = function(block) {
  var angle = Blockly.Python.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_NONE);
  return 'yawRight(' + angle + ');\n';
};

Blockly.Python['yaw_left'] = function(block) {
  var angle = Blockly.Python.valueToCode(block, 'angle', Blockly.JavaScript.ORDER_NONE);
  return 'yawLeft(' + angle + ');\n';
};

Blockly.Python['photo'] = function(block) {
  return 'takePhoto();\n';
};

Blockly.Python['photo_interval'] = function(block) {
  var photo_count = Blockly.Python.valueToCode(block, 'photo_count', Blockly.JavaScript.ORDER_NONE);
  var interval = Blockly.Python.valueToCode(block, 'interval', Blockly.JavaScript.ORDER_NONE);
  return 'takePhoto(' + photo_count + ', ' + interval + ');\n';
};

Blockly.Python['video'] = function(block) {
  var action = block.getFieldValue("video_action");
  return "video('" + action + "');\n";
};

Blockly.Python['video_duration'] = function(block) {
  var duration = Blockly.JavaScript.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_NONE);
  return "video('start', " + duration + ");\n";
};

Blockly.Python['flip_forward'] = function(block) {
  return 'flipForward();\n';
};

Blockly.Python['flip_backward'] = function(block) {
  return 'flipBackward();\n';
};

Blockly.Python['flip_left'] = function(block) {
  return 'flipLeft();\n';
};

Blockly.Python['flip_right'] = function(block) {
  return 'flipRight();\n';
};

Blockly.Python['land_then_takeoff'] = function(block) {
  var duration = Blockly.Python.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_NONE);
  return 'landThenTakeOff(' + duration + ');\n';
};

Blockly.Python['land'] = function(block) {
  return 'land();\n';
};

Blockly.Python['hover'] = function(block) {
  var duration = Blockly.Python.valueToCode(block, 'duration', Blockly.JavaScript.ORDER_NONE);
  return 'hover(' + duration + ');\n';
};

Blockly.Python['loop'] = function(block) {
  var loopVar = Blockly.Python.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);
  var repeats = Blockly.Python.valueToCode(block, 'TIMES', Blockly.JavaScript.ORDER_NONE);
  var branch = Blockly.Python.statementToCode(block, 'DO').trim();
  var code = "\nfor (var " + loopVar + " = 0; " + loopVar + " < " + repeats + "; " + loopVar + "++) {\n";
  code += '  ' + branch + '\n';
  code += "}\n\n";
  return code;
};

Blockly.Python['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var code = '', branchCode, conditionCode;
  do {
    conditionCode = Blockly.Python.valueToCode(block, 'IF' + n,
      Blockly.Python.ORDER_NONE) || 'false';
      branchCode = Blockly.Python.statementToCode(block, 'DO' + n) || '';
    code += (n == 0 ? 'if (' : '} else if (' ) + conditionCode + ') {\n' + branchCode;

    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE')) {
    branchCode = Blockly.Python.statementToCode(block, 'ELSE') ||
        Blockly.Python.PASS;
    code += '} else {\n' + branchCode + '}\n';
  }
  return code + '}';
};

Blockly.Python['variables_set'] = function(block) {
  // Variable setter.
  var argument0 = Blockly.Python.valueToCode(block, 'VALUE',
      Blockly.Python.ORDER_NONE) || '0';
  var varName = Blockly.Python.variableDB_.getName(block.getFieldValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return varName + ' = ' + argument0 + ';\n';
};

/*
 * This code below was added on 11/18/2020 to support the new functions category block
 * It was pulled from the JavaScript procedures.js generator so that we can "Show Mission Code" in a JS format
*/
Blockly.Python['procedures_defreturn'] = function(block) {
  // Define a procedure with a return value.
  var funcName = Blockly.Python.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.Python.statementToCode(block, 'STACK');
  if (Blockly.Python.STATEMENT_PREFIX) {
    branch = Blockly.Python.prefixLines(
        Blockly.Python.STATEMENT_PREFIX.replace(/%1/g,
        '\'' + block.id + '\''), Blockly.Python.INDENT) + branch;
  }
  if (Blockly.Python.INFINITE_LOOP_TRAP) {
    branch = Blockly.Python.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var returnValue = Blockly.Python.valueToCode(block, 'RETURN',
      Blockly.Python.ORDER_NONE) || '';
  if (returnValue) {
    returnValue = '  return ' + returnValue + ';\n';
  }
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Python.variableDB_.getName(block.arguments_[i],
        Blockly.Variables.NAME_TYPE);
  }
  var code = 'function ' + funcName + '(' + args.join(', ') + ') {\n' +
      branch + returnValue + '}';
  code = Blockly.Python.scrub_(block, code);
  // Add % so as not to collide with helper functions in definitions list.
  Blockly.Python.definitions_['%' + funcName] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.Python['procedures_defnoreturn'] =
    Blockly.Python['procedures_defreturn'];

Blockly.Python['procedures_callreturn'] = function(block) {
  // Call a procedure with a return value.
  var funcName = Blockly.Python.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Python.valueToCode(block, 'ARG' + i,
        Blockly.Python.ORDER_NONE) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['procedures_callnoreturn'] = function(block) {
  // Call a procedure with no return value.
  var funcName = Blockly.Python.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var i = 0; i < block.arguments_.length; i++) {
    args[i] = Blockly.Python.valueToCode(block, 'ARG' + i,
        Blockly.Python.ORDER_NONE) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ');\n';
  return code;
};

Blockly.Python['procedures_ifreturn'] = function(block) {
  // Conditionally return value from a procedure.
  var condition = Blockly.Python.valueToCode(block, 'CONDITION',
      Blockly.Python.ORDER_NONE) || 'false';
  var code = 'if (' + condition + ') {\n';
  if (block.hasReturnValue_) {
    var value = Blockly.Python.valueToCode(block, 'VALUE',
        Blockly.Python.ORDER_NONE) || 'null';
    code += '  return ' + value + ';\n';
  } else {
    code += '  return;\n';
  }
  code += '}\n';
  return code;
};