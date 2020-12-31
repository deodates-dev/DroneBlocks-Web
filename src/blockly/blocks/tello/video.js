Blockly.Blocks['video'] = {
  init: function() {
    this.jsonInit(
      {
        "message0": "%1 recording video",
        "args0": [
          {
            "type": "field_dropdown",
            "name": "video_action",
            "options":
                [["start", "start"],
                ["stop", "stop"]]
          }
        ],
        "previousStatement": true,
        "nextStatement": true,
        "colour": "#64c2d9"
      });
  }
};