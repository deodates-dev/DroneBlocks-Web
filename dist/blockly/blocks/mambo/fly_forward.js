Blockly.Blocks['fly_forward'] = {
  init: function() {
    this.jsonInit(
      {
        "message0": "fly forward %1 seconds",
        "args0": [
          {
            "type": "input_value",
            "name": "time"
          }
        ],
        "previousStatement": true,
        "nextStatement": true,
        "colour": "#2A9D8F"
      });
  }
};