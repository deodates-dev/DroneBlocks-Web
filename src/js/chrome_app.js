window.addEventListener('message', onMessage);

var appWindow, appOrigin;

function onMessage(e) {
  appWindow = e.source;
  appOrigin = e.origin;

  console.log("got some data: " + e.data);
  
  if (e.data == "displayConnectionModal") {

    $('#connectToTelloModal').openModal();

  } else if (e.data.command == "highlightBlock") {

    Blockly.getMainWorkspace().highlightBlock(decodeURIComponent(e.data.blockId))

  }
}

$("#connectButton").click(function() {
  // Appwindow is so we can post to the chrome app
  appWindow.postMessage("beginTelloConnection", appOrigin);
  $("#connectToTelloModal").closeModal();
});