let activeTabIndex = 0;
let storedMissions = loadStoredMissions();

// Used in main.js 369 because authstatechanged gets called twice
// This flag prevents a mission from getting opened twice
let tabsInited = false;

// Grab missions from local storage otherwise let's create a new untitled mission
function loadStoredMissions() {
    if(localStorage.getItem("storedMissions") != null) {
        return JSON.parse(localStorage.getItem("storedMissions"));
    // The first time when there is nothing in storage
    } else {
        let firstMission = [{"title": "Untitled", xml: null}];
        localStorage.setItem("activeTabIndex", activeTabIndex);
        localStorage.setItem("storedMissions", JSON.stringify(firstMission));
        return firstMission;
    }

}

// Update the mission in storage 
function updateMissionInStorage(index) {
    storedMissions[index].xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()));
    localStorage.setItem("storedMissions", JSON.stringify(storedMissions));
}

// Add a new mission to storage
function addMissionToStorage(mission) {
    storedMissions.push(mission);
    localStorage.setItem("storedMissions", JSON.stringify(storedMissions));
}

// Get storage data and build tabs
function buildTabsFromStoredMissions() {
    for (let i = 0; i < storedMissions.length; i++) {
        addNewTab(storedMissions[i].title);
    }
}

// Retrieve the most recently selected tab
function getActiveTabIndex() {
    if (localStorage.getItem("activeTabIndex")) {
        return parseInt(localStorage.getItem("activeTabIndex"));
    } else {
        return 0;
    }
}

// When a user opens a mission from Firebase
function openTabFromCloudMission(missionTitle) {
    
    // Increment tab index since it this will be coming from a redirect
    activeTabIndex++;

    // Store the active tab index
    localStorage.setItem("activeTabIndex", activeTabIndex);

    // Open the mission and select the tab
    addNewTab(missionTitle)

    // Add the cloud mission to storage
    addMissionToStorage( {"title": missionTitle, "xml": Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()))} )

    // Highlight the newly opened tab
    highlightActiveTab();

}

// Initialize all the tabs
function initTabs() {

    activeTabIndex = getActiveTabIndex();

    // For when the add new tab button is clicked
    document.getElementById('add-new-tab').addEventListener('click', (event) => {
        addNewTab(null);
    });

    buildTabsFromStoredMissions();

    highlightActiveTab();
}

// Highlight a tab when selected
function highlightActiveTab() {

    // Loop through all tabs and reset
    document.querySelectorAll('.tab-list-item').forEach(tab => {
        tab.className = "tab-list-item";
    });

    // Set active tab
    document.getElementById("tab" + activeTabIndex).className += " tab-list-active";
}

// When a new tab is selected
function selectTab(event) {

    // Get the current workspace
    const workspace = Blockly.getMainWorkspace();

    // Store the previous tab's workspace XML in localStorage
    const previousTab = document.getElementById("tab" + activeTabIndex);
    const previousTabIndex = activeTabIndex;
    updateMissionInStorage(previousTabIndex);
    
    // Make the new tab active
    activeTabIndex = parseInt(event.target.id.split("tab")[1]);

    // Clear the workspace
    workspace.clear();

    // Load the workspace from the tab's stored XML
    if(typeof storedMissions[activeTabIndex].xml !== 'undefined') {
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(storedMissions[activeTabIndex].xml), workspace);
    }

    // Store the active tab index
    localStorage.setItem("activeTabIndex", activeTabIndex);

    // Highlight the tab
    highlightActiveTab();

}

// Create a new tab when clicked
function addNewTab(tabTitle) {

    // Get the tab list
    const tabList = document.getElementById("missionTabs");

    // Create the tab with className and text content
    const tab = document.createElement("li");

    // Assign the class name
    tab.className = "tab-list-item";

    // Assign the id - this is for highlighting the tab on selection
    tab.id = "tab" + (tabList.childElementCount-1);

    // Create the tab label
    let label;
    if (tabTitle == null) {
        label = document.createTextNode("Untitled");
    } else {
        label = document.createTextNode(tabTitle);
    }
    
    // Add the click listener
    tab.addEventListener("click", selectTab);

    // Append the label to the tab
    tab.appendChild(label);

    // Insert the tab before the add button
    tabList.insertBefore(tab, tabList.lastElementChild);

    // New untitled tab
    if (tabTitle == null) {
        // Save tab info to storage
        addMissionToStorage({"title": "Untitled"});
        
        // After the tab is added we want to select it
        tab.click();
    }
}

// Initialize the tabs
initTabs();