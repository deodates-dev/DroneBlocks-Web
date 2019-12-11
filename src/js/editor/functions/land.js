import { unitsDropdown, distanceArg } from '../common'

export const LandFunctionMap = {
  land: {
    name: 'land',
    arguments: [
    ]
  },
  landThenTakeoff: {
    name: 'land_then_takeoff',
    arguments: [
      distanceArg('land for', 'duration')
    ]
  },
}

