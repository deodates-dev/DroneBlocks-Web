Blockly.Blocks['yaw_right'] = {
  init: function() {
    this.jsonInit(
      {
        "message0": Blockly.Msg.NAVIGATION_YAW_RIGHT + " %1 " + Blockly.Msg.NAVIGATION_DEGREES,
        "args0": [
          {
            "type": "input_value",
            "name": "angle"
          }
        ],
        "previousStatement": true,
        "nextStatement": true,
        "colour": "#2A9D8F"
      });
  }
};