Blockly.Blocks['video_duration'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("record video for")
        .appendField(new Blockly.FieldNumber('10', 1, 600, 1), 'duration')
        .appendField("seconds");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour('#64c2d9');
  }
};


Blockly.Blocks['video_duration'] = {
  init: function() {
    this.jsonInit(
      {
        "message0": "record video for %1 seconds",
          "args0": [
          {
            "type": "input_value",
            "name": "duration"
          }
        ],
        "previousStatement": true,
        "nextStatement": true,
        "colour": "#64c2d9"
      });
  }
};