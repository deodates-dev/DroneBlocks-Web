import { FlyFunctionMap } from './functions/navigation';

export const FunctionMap = {
  takeoff: {
    name: 'takeoff',
    arguments: [
      // {
      //   name: 'altitude',
      //   type: 'Number',
      //   title: 'takeoff to',
      //   category: 'value'
      // },
      // {
      //   category: 'dummy',
      //   title: 'ft'
      // }
    ]
  },
  change_altitude: {
    name: 'change_altitude',
    arguments: [
      {
        name: 'altitude',
        type: 'Number',
        title: 'change altitude to',
        category: 'value'
      },
      {
        category: 'dummy',
        title: 'ft'
      }
    ]
  },
  ...FlyFunctionMap,
  land: {
    name: 'land',
    arguments: [

    ]
  },
}

