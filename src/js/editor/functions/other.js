import { distanceArg } from '../common'

export const OtherFunctionMap = {
  change_altitude: {
    name: 'change_altitude',
    arguments: [
      distanceArg('change altitude to', 'altitude'),
      {
        category: 'dummy',
        title: 'ft'
      }
    ]
  },
}

