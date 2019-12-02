Blockly.JavaScriptMain['takeoff'] = function(block) {
  var altitude = Blockly.JavaScriptMain.valueToCode(block, 'altitude', Blockly.JavaScriptMain.ORDER_NONE);
  return 'takeoff(' + altitude + ');\n';
};

Blockly.JavaScriptMain['flight_path'] = function(block) {
  var path = block.getFieldValue("path");
  return 'flight_path("' + path + '");\n';
};

Blockly.JavaScriptMain['heading_mode'] = function(block) {
  var mode = block.getFieldValue("mode");
  return 'mission+="heading_mode,' + mode + '|";';
};

Blockly.JavaScriptMain['land'] = function(block) {
  return 'land();\n';
};

Blockly.JavaScriptMain['land_home'] = function(block) {
  return 'landHome();\n';
};

Blockly.JavaScriptMain['hover'] = function(block) {
  var duration = Blockly.JavaScriptMain.valueToCode(block, 'duration', Blockly.JavaScriptMain.ORDER_NONE);
  return 'hover(' + duration + ');\n';
};

Blockly.JavaScriptMain['yaw_right'] = function(block) {
  var angle = Blockly.JavaScriptMain.valueToCode(block, 'angle', Blockly.JavaScriptMain.ORDER_NONE);
  var velocity = block.getFieldValue("velocity");
  return 'yawRight(' + angle + ', ' + velocity + ');\n';
};

Blockly.JavaScriptMain['yaw_left'] = function(block) {
  var angle = Blockly.JavaScriptMain.valueToCode(block, 'angle', Blockly.JavaScriptMain.ORDER_NONE);
  var velocity = block.getFieldValue("velocity");
  return 'yawLeft(' + angle + ', ' + velocity + ');\n';
};

Blockly.JavaScriptMain['photo'] = function(block) {
  return 'takePhoto();\n';
};

Blockly.JavaScriptMain['photo_interval'] = function(block) {
  var photo_count = block.getFieldValue("photo_count");
  var interval = block.getFieldValue("interval");
  return 'takePhoto(' + photo_count + ', ' + interval + ');\n';
};

Blockly.JavaScriptMain['pitch_gimbal_to'] = function(block) {
  var angle = Blockly.JavaScriptMain.valueToCode(block, 'angle', Blockly.JavaScriptMain.ORDER_NONE);
  return 'pitchGimbal(' + angle + ');\n';
};

Blockly.JavaScriptMain['fly_forward'] = function(block) {
  var distance = Blockly.JavaScriptMain.valueToCode(block, 'distance', Blockly.JavaScriptMain.ORDER_NONE);
  var speed = block.getFieldValue("speed");
  return 'flyForward(' + distance + ', ' + speed + ');\n';
};

Blockly.JavaScriptMain['video'] = function(block) {
  var action = block.getFieldValue("video_status");
  return "video('" + action + "');\n";
};

Blockly.JavaScriptMain['video_duration'] = function(block) {
  var duration = block.getFieldValue("duration");
  return "video('start', " + duration + ");\n";
};

Blockly.JavaScriptMain['orbit'] = function(block) {
  var radius = Blockly.JavaScriptMain.valueToCode(block, 'radius', Blockly.JavaScriptMain.ORDER_NONE);
  var velocity = block.getFieldValue("velocity");
  return 'orbit(' + radius + ', ' + velocity + ');\n';
};

/*
Blockly.JavaScriptMain['orbit'] = function(block) {
  var radius = block.getFieldValue('radius');
  var altitude = block.getFieldValue('altitude');
  var direction = block.getFieldValue('direction');
  var heading = block.getFieldValue('heading');
  var rotation = block.getFieldValue('rotation');
  return "orbit," + radius + "," + altitude + "," + direction + "," + heading + "," + rotation + "|";
};
*/

Blockly.JavaScriptMain['loop'] = function(block) {
  var loopVar = Blockly.JavaScriptMain.variableDB_.getDistinctName('count', Blockly.Variables.NAME_TYPE);
  var repeats = Blockly.JavaScriptMain.valueToCode(block, 'TIMES', Blockly.JavaScriptMain.ORDER_NONE);
  var branch = Blockly.JavaScriptMain.statementToCode(block, 'DO').trim();
  var code = "for (var " + loopVar + " = 0; " + loopVar + " < " + repeats + "; " + loopVar + "++) {\n";
  code += '  ' + branch + '\n';
  code += "}\n";
  return code;
};

Blockly.JavaScriptMain['change_altitude'] = function(block) {
  var altitude = Blockly.JavaScriptMain.valueToCode(block, 'altitude', Blockly.JavaScriptMain.ORDER_NONE);
  return 'change_altitude(' + altitude + ');\n';
};

// Blockly.JavaScriptMain['controls_if'] = function(block) {
//   // If/elseif/else condition.
//   var n = 0;
//   var code = '', branchCode, conditionCode;
//   do {
//     conditionCode = Blockly.JavaScriptMain.valueToCode(block, 'IF' + n,
//       Blockly.JavaScriptMain.ORDER_NONE) || 'false';
//       branchCode = Blockly.JavaScriptMain.statementToCode(block, 'DO' + n) || '';
//     code += (n == 0 ? 'if (' : '} else if (' ) + conditionCode + ') {\n' + branchCode;

//     ++n;
//   } while (block.getInput('IF' + n));

//   if (block.getInput('ELSE')) {
//     branchCode = Blockly.JavaScriptMain.statementToCode(block, 'ELSE') ||
//         Blockly.JavaScriptMain.PASS;
//     code += '} else {\n' + branchCode + '}\n';
//   }
//   return code + '}';
// };

// Blockly.JavaScriptMain['variables_set'] = function(block) {
//   // Variable setter.
//   var argument0 = Blockly.JavaScriptMain.valueToCode(block, 'VALUE',
//       Blockly.JavaScriptMain.ORDER_NONE) || '0';
//   var varName = Blockly.JavaScriptMain.variableDB_.getName(block.getFieldValue('VAR'),
//       Blockly.Variables.NAME_TYPE);
//   return varName + ' = ' + argument0 + ';\n';
// };
