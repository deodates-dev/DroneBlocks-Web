let activeTab = document.getElementById("mission1");

// Sets up the tab click listener
function initTabs() {
    document.querySelectorAll('.tab-list-item').forEach(tab => {
        tab.addEventListener('click', selectTab);
    });

    document.getElementById('add-new-tab').addEventListener('click', addNewTab);
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

// Create a new tab when clicked
function addNewTab() {

    // Get the tab list
    const tabList = document.getElementById("missionTabs");

    // Create the tab with className and text content
    const tab = document.createElement("li");

    // Assign the class name
    tab.className = "tab-list-item";

    // Assign the id
    tab.id = "mission" + tabList.childElementCount;

    // Create the tab label
    const label = document.createTextNode("New Mission " + tabList.childElementCount);

    // Add the click listener
    tab.addEventListener("click", selectTab);

    // Append the label to the tab
    tab.appendChild(label);

    // Insert the tab before the add button
    tabList.insertBefore(tab, tabList.lastElementChild);
}

// Initialize the tabs
initTabs();