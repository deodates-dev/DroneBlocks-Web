let activeTab = document.getElementById("mission1");

// Sets up the tab click listener
function initTabs() {

    // For when the add new tab button is clicked
    document.getElementById('add-new-tab').addEventListener('click', (event) => {
        addNewTab();
    });

    // Assign a click handler to the very first tab
    activeTab.addEventListener('click', selectTab);

    // Let's check if there are any missions already stored
    setTimeout(() => {

        if (localStorage.getItem("mission1")) {
            Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(localStorage.getItem("mission1")), Blockly.getMainWorkspace());
        }

        if (localStorage.getItem("mission2")) {
            addNewTab();
        }

        if (localStorage.getItem("mission3")) {
            addNewTab();
        }

        if (localStorage.getItem("mission4")) {
            addNewTab();
        }

        if (localStorage.getItem("mission5")) {
            addNewTab();
        }

        // Let's select the last active tab
        if (localStorage.getItem("activeTabId")) {
            document.getElementById(localStorage.getItem("activeTabId")).click();
        }

    }, 1000);
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
    const workspace = Blockly.getMainWorkspace();

    // Store the previous tab
    const previousTab = activeTab

    // Make the new tab active
    activeTab = document.getElementById(event.target.id);

    // Store the previous tab's workspace XML in localStorage
    localStorage.setItem(previousTab.id, Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace)));

    // Clear the workspace
    workspace.clear();

    // Load the workspace from the tab's stored XML
    if(localStorage.getItem(activeTab.id)) {
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(localStorage.getItem(activeTab.id)), workspace);
    }

    // Store the active tab id
    storeActiveTabId(activeTab);

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
    const label = document.createTextNode("Untitled " + (tabList.childElementCount));

    // Add the click listener
    tab.addEventListener("click", selectTab);

    // Append the label to the tab
    tab.appendChild(label);

    // Insert the tab before the add button
    tabList.insertBefore(tab, tabList.lastElementChild);

}

// So we can remember which tab to select when a user comes back
function storeActiveTabId(tab) {
    localStorage.setItem("activeTabId", tab.id);
}

// Initialize the tabs
initTabs();