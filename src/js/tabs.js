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

    // Store the previous tab
    let previousTab = activeTab

    // Make the new tab active
    activeTab = document.getElementById(event.target.id);

    // Store the previous tab's workspace XML as an attribute in the DOM
    // previousTab.blocklyXML = Blockly.Xml.workspaceToDom(workspace);

    // Store the previous tab's workspace XML in localStorage
    localStorage.setItem(previousTab.id, Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace)));

    // Clear the workspace
    workspace.clear();

    // Load the workspace from the tab's stored XML
    if(localStorage.getItem(activeTab.id)) {
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(localStorage.getItem(activeTab.id)), workspace);
    }

}

// Create a new tab when clicked
function addNewTab() {

    // Get the tab list
    const tabList = document.getElementById("missionTabs");

    // Need to make this a modal
    // Using 6 because the add button counts as a list item
    if (tabList.childElementCount >= 6) {
        alert("You can have up to 5 missions open at a time");
        return;
    }

    // Create the tab with className and text content
    const tab = document.createElement("li");

    // Assign the class name
    tab.className = "tab-list-item";

    // Assign the id
    tab.id = "mission" + tabList.childElementCount;

    // Create the tab label
    const label = document.createTextNode("Untitled Mission");

    // Add the click listener
    tab.addEventListener("click", selectTab);

    // Append the label to the tab
    tab.appendChild(label);

    // Insert the tab before the add button
    tabList.insertBefore(tab, tabList.lastElementChild);

    // Make the tab active
    tab.click();

}

// Initialize the tabs
initTabs();