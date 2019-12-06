export const unitsDropdown = {
  name: 'units',
  type: 'field_dropdown',
  title: 'units',
  category: 'value'
}

export const distanceArg = (title, name =  'distance') => ({
  name,
  type: 'input_value',
  title: title,
  category: 'value'
})
