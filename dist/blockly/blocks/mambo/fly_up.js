Blockly.Blocks['fly_up'] = {
  init: function() {
    this.jsonInit(
      {
        "message0": "fly up %1 seconds",
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