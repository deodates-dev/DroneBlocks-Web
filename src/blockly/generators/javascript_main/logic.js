/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScriptMain for logic blocks.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.JavaScriptMain.logic');

goog.require('Blockly.JavaScriptMain');


Blockly.JavaScriptMain['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var code = '', branchCode, conditionCode;
  do {
    conditionCode = Blockly.JavaScriptMain.valueToCode(block, 'IF' + n,
      Blockly.JavaScriptMain.ORDER_NONE) || 'false';
    branchCode = Blockly.JavaScriptMain.statementToCode(block, 'DO' + n);
    code += (n > 0 ? ' else ' : '') +
        'if (' + conditionCode + ') {\n' + branchCode + '}';

    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE')) {
    branchCode = Blockly.JavaScriptMain.statementToCode(block, 'ELSE');
    code += ' else {\n' + branchCode + '}';
  }
  return code + '\n';
};

Blockly.JavaScriptMain['controls_ifelse'] = Blockly.JavaScriptMain['controls_if'];

Blockly.JavaScriptMain['logic_compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getFieldValue('OP')];
  var order = (operator == '==' || operator == '!=') ?
      Blockly.JavaScriptMain.ORDER_EQUALITY : Blockly.JavaScriptMain.ORDER_RELATIONAL;
  var argument0 = Blockly.JavaScriptMain.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.JavaScriptMain.valueToCode(block, 'B', order) || '0';
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.JavaScriptMain['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
  var order = (operator == '&&') ? Blockly.JavaScriptMain.ORDER_LOGICAL_AND :
      Blockly.JavaScriptMain.ORDER_LOGICAL_OR;
  var argument0 = Blockly.JavaScriptMain.valueToCode(block, 'A', order);
  var argument1 = Blockly.JavaScriptMain.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    var defaultArgument = (operator == '&&') ? 'true' : 'false';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  var code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

Blockly.JavaScriptMain['logic_negate'] = function(block) {
  // Negation.
  var order = Blockly.JavaScriptMain.ORDER_LOGICAL_NOT;
  var argument0 = Blockly.JavaScriptMain.valueToCode(block, 'BOOL', order) ||
      'true';
  var code = '!' + argument0;
  return [code, order];
};

Blockly.JavaScriptMain['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, Blockly.JavaScriptMain.ORDER_ATOMIC];
};

Blockly.JavaScriptMain['logic_null'] = function(block) {
  // Null data type.
  return ['null', Blockly.JavaScriptMain.ORDER_ATOMIC];
};

Blockly.JavaScriptMain['logic_ternary'] = function(block) {
  // Ternary operator.
  var value_if = Blockly.JavaScriptMain.valueToCode(block, 'IF',
      Blockly.JavaScriptMain.ORDER_CONDITIONAL) || 'false';
  var value_then = Blockly.JavaScriptMain.valueToCode(block, 'THEN',
      Blockly.JavaScriptMain.ORDER_CONDITIONAL) || 'null';
  var value_else = Blockly.JavaScriptMain.valueToCode(block, 'ELSE',
      Blockly.JavaScriptMain.ORDER_CONDITIONAL) || 'null';
  var code = value_if + ' ? ' + value_then + ' : ' + value_else;
  return [code, Blockly.JavaScriptMain.ORDER_CONDITIONAL];
};
