Blockly.Blocks['takeoff'] = {
  /**
   * Show block.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit(
      {
        "message0": Blockly.Msg.TAKEOFF,
        "nextStatement": true,
        "colour": "#264653"
      });
  }
};