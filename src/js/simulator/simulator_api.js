function logCommand(command) {
  const subcommands = command.split(',');
  console.log('One command finished:'+ subcommands[0]);
}

function highlightBlock() {
  
  // Don't repeatedly try to highlight the block
  if (blockId != previousBlockId) {
    Blockly.getMainWorkspace().highlightBlock(decodeURIComponent(blockId));
    previousBlockId = blockId;
    //console.log("highlighting block: " + blockId);
  }

  // Mission is done so let's remove the highlight
  if (window.commands.length == 0) {
    blockId = null
  }

}