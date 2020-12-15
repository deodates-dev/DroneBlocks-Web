Blockly.Blocks['photo_interval'] = {
  /**
   * Show block.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit(
      {
        "message0": "take %1 photos with %2 sec interval",
        "args0": [
          {
            "type": "input_value",
            "name": "photo_count"
          },
          {
            "type": "input_value",
            "name": "interval"
          }
        ],
        "nextStatement": true,
        "previousStatement": true,
        "colour": "#64c2d9"
      });
  }
};