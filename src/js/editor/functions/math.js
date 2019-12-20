import { unitsDropdown, distanceArg } from '../common'

export const MathFunctionMap = {
  'Math.abs': {
    name: 'math_single',
    op: 'ABS',
    arguments: [
      distanceArg('', 'NUM')
    ]
  },
  'Math.sqrt': {
    name: 'math_single',
    op: 'ROOT',
    arguments: [
      distanceArg('', 'NUM')
    ]
  },
  'Math.log': {
    name: 'math_single',
    op: 'LN',
    arguments: [
      distanceArg('', 'NUM')
    ]
  },
  'Math.log10': {
    name: 'math_single',
    op: 'LOG10',
    arguments: [
      distanceArg('', 'NUM')
    ]
  },
  'Math.exp': {
    name: 'math_single',
    op: 'EXP',
    arguments: [
      distanceArg('', 'NUM')
    ]
  },
  'Math.pow': {
    name: 'math_single',
    op: 'POW10',
    arguments: [
      distanceArg('', 'NUM')
    ]
  },
  'Math.round': {
    name: 'math_single',
    op: 'ROUND',
    arguments: [
      distanceArg('', 'NUM')
    ]
  },
  'Math.ceil': {
    name: 'math_single',
    op: 'ROUNDUP',
    arguments: [
      distanceArg('', 'NUM')
    ]
  },
  'Math.floor': {
    name: 'math_single',
    op: 'ROUNDDOWN',
    arguments: [
      distanceArg('', 'NUM')
    ]
  },
  'Math.sin': {
    name: 'math_trig',
    op: 'SIN',
    arguments: [
      distanceArg('', 'NUM')
    ]
  },
  'Math.cos': {
    name: 'math_trig',
    op: 'COS',
    arguments: [
      distanceArg('', 'NUM')
    ]
  },
  'Math.tan': {
    name: 'math_trig',
    op: 'TAN',
    arguments: [
      distanceArg('', 'NUM')
    ]
  },
  'Math.PI': {
    name: 'math_constant',
    constant: 'PI',
  },
  'Math.E': {
    name: 'math_constant',
    constant: 'E',
  },
  'Math.SQRT2': {
    name: 'math_constant',
    constant: 'SQRT2',
  },
  'Math.SQRT1_2': {
    name: 'math_constant',
    constant: 'SQRT1_2',
  },
}
