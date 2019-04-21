Blockly.Blocks['land_then_takeoff'] = {
    /**
     * Show block.
     * @this Blockly.Block
     */
    init: function() {
      this.jsonInit(
        {
          "message0": Blockly.Msg.LAND_LAND_THEN_TAKEOFF,
          "args0": [
            {
                "type": "input_value",
                "name": "duration"
            }
          ],
          "previousStatement": true,
          "nextStatement": true,
          "colour": "#E76F51"
        });
    }
  };