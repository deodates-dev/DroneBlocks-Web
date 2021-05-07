let activeTab = document.getElementById("one");

// Sets up the tab click listener
function initTabs() {
    document.querySelectorAll('.tab-list-item').forEach(tab => {
        tab.addEventListener('click', selectTab);
    });
}

// When a new tab is selected
function selectTab(event) {

    // Loop through all tabs and reset
    document.querySelectorAll('.tab-list-item').forEach(tab => {
        tab.className = "tab-list-item";
    });

    // Set active tab
    event.target.className += " tab-list-active";

    // Get the current workspace
    let workspace = Blockly.getMainWorkspace();

    console.log(Blockly.Xml.workspaceToDom(workspace));

    // Count the blocks in the current workspace
    const totalBlocks = workspace.getAllBlocks().length;

    // Store the previous tab
    let previousTab = activeTab

    // Make the new tab active
    activeTab = document.getElementById(event.target.id);

    // Store the previous tab's workspace XML
    previousTab.blocklyXML = Blockly.Xml.workspaceToDom(workspace);

    // Clear the workspace
    workspace.clear();

    // Load the workspace from the tab's stored XML
    if(activeTab.blocklyXML) {
        Blockly.Xml.domToWorkspace(activeTab.blocklyXML, workspace);
    }

}

// Initialize the tabs
initTabs();