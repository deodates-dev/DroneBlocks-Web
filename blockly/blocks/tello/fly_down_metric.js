Blockly.Blocks['fly_down'] = {
  init: function() {
    this.jsonInit(
      {
        "message0": Blockly.Msg.NAVIGATION_FLY_DOWN + " %1 %2",
        "args0": [
          {
            "type": "input_value",
            "name": "distance"
          },
          {
            "type": "field_dropdown",
            "name": "units",
            "options":
                [["cm", "cm"],
                ["in", "in"]]
          }
        ],
        "previousStatement": true,
        "nextStatement": true,
        "colour": "#2A9D8F"
      });
  }
};