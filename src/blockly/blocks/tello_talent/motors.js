Blockly.Blocks['motors_start'] = {
  init: function() {
    this.jsonInit(
      {
        "message0": "start motors",
        "previousStatement": true,
        "nextStatement": true,
        "colour": "#264653",
        "tooltip": "Start motors to keep Tello cool while on the bench",
      });
  }
};

Blockly.Blocks['motors_stop'] = {
    init: function() {
      this.jsonInit(
        {
          "message0": "stop motors",
          "previousStatement": true,
          "nextStatement": true,
          "colour": "#264653",
          "tooltip": "Stop motors after bench testing",
        });
    }
  };