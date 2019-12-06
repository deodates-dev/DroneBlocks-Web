import { unitsDropdown, distanceArg } from '../common'

export const FlyFunctionMap = {
  setSpeed: {
    name: 'fly_forward',
    arguments: [
      distanceArg('set speed to', 'speed'),
      unitsDropdown
    ]
  },
  flyForward: {
    name: 'fly_forward',
    arguments: [
      distanceArg('fly forward'),
      unitsDropdown
    ]
  },
  flyBackward: {
    name: 'fly_backward',
    arguments: [
      distanceArg('fly backward'),
      unitsDropdown
    ]
  },
  flyLeft: {
    name: 'fly_left',
    arguments: [
      distanceArg('fly left'),
      unitsDropdown
    ]
  },
  flyRight: {
    name: 'fly_right',
    arguments: [
      distanceArg('fly right'),
      unitsDropdown
    ]
  },
  flyUp: {
    name: 'fly_up',
    arguments: [
      distanceArg('fly up'),
      unitsDropdown
    ]
  },
  flyDown: {
    name: 'fly_down',
    arguments: [
      distanceArg('fly down'),
      unitsDropdown
    ]
  },
  flyXYZ: {
    name: 'fly_xyz',
    arguments: [
      distanceArg('fly to x', 'xdistance'),
      distanceArg('y', 'ydistance'),
      distanceArg('z', 'zdistance'),
      unitsDropdown
    ]
  },
  curve: {
    name: 'curve',
    arguments: [
      distanceArg('curve x1', 'x1distance'),
      distanceArg('y1', 'y1distance'),
      distanceArg('z1', 'z1distance'),
      distanceArg('x2', 'x2distance'),
      distanceArg('y2', 'y2distance'),
      distanceArg('z2', 'z2distance'),
      unitsDropdown
    ]
  },
  yawRight: {
    name: 'yaw_right',
    arguments: [
      distanceArg('yawn right', 'angle'),
    ]
  },
  yawLeft: {
    name: 'yaw_left',
    arguments: [
      distanceArg('yawn left', 'angle'),
    ]
  },
  hover: {
    name: 'hover',
    arguments: [
      distanceArg('hover', 'duration')
    ]
  },
}

