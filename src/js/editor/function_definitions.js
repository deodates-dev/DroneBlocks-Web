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
  // flyForward: {
  //   name: 'fly_forward',
  //   arguments: [
  //     {
  //       name: 'distance',
  //       type: 'Number',
  //       title: 'fly forward',
  //       category: 'value'
  //     },
  //     {
  //       category: 'dummy',
  //       title: 'ft'
  //     },
  //     {
  //       name: 'speed',
  //       type: 'Number',
  //       title: 'at',
  //       category: 'value'
  //     },
  //     {
  //       category: 'dummy',
  //       title: 'mph'
  //     },
  //   ]
  // },
  flyForward: {
    name: 'fly_forward',
    arguments: [
      {
        name: 'distance',
        type: 'input_value',
        title: 'fly forward',
        category: 'value'
      },
      {
        name: 'units',
        type: 'field_dropdown',
        title: 'units',
        category: 'value'
      }
    ]
  },
  flyBackward: {
    name: 'fly_backward',
    arguments: [
      {
        name: 'distance',
        type: 'input_value',
        title: 'fly backward',
        category: 'value'
      },
      {
        name: 'units',
        type: 'field_dropdown',
        title: 'units',
        category: 'value'
      }
    ]
  },
  land: {
    name: 'land',
    arguments: [

    ]
  },
}

