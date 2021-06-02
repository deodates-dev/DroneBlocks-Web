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
    storedMissions[index].title = document.getElementById("tab" + index).firstChild.textContent;
    storedMissions[index].xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()));
    localStorage.setItem("storedMissions", JSON.stringify(storedMissions));
}

// Add a new mission to storage
function addMissionToStorage(mission) {
    storedMissions.push(mission);
    localStorage.setItem("storedMissions", JSON.stringify(storedMissions));
}

// Delete a mission from storage based on index
function deleteMissionFromStorage(index) {
    storedMissions.splice(index, 1);
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
// Called from main.js : 402
function openTabFromCloudMission(missionTitle, missionId) {
    
    // We don't need to display the mission title since it's already in the tab
    document.getElementById("missionTitle").textContent = "";
    
    // We'll open the new tab as the last one in the list
    activeTabIndex = storedMissions.length;

    // Store the active tab index
    localStorage.setItem("activeTabIndex", activeTabIndex);

    // Open the mission and select the tab
    addNewTab(missionTitle);

    // Add the cloud mission to storage
    addMissionToStorage( {"title": missionTitle, "missionId": missionId, "xml": Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()))} )

    // Highlight the newly opened tab
    highlightActiveTab();

}

// Initialize all the tabs
function initTabs() {

    // Let's remove the mission title since it's in the tab
    document.getElementById("missionTitle").textContent = "";

    // Store the current tab index
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

    // If the mission was opened from Firebase we will have saved the missionId in storedMissions
    // Therefore we need to update the local storage missionId value when switching between tabs
    // This will keep things in sync when users switch between tabs and try to save them to Firebase
    if(typeof storedMissions[activeTabIndex].missionId !== 'undefined') {
        localStorage.setItem('missionId', storedMissions[activeTabIndex].missionId);
    }

    // Store the active tab index
    localStorage.setItem("activeTabIndex", activeTabIndex);

    // Highlight the tab
    highlightActiveTab();

}

// Create a new tab when clicked
function addNewTab(tabTitle) {
    
    // Get the tab list
    const tabList = document.getElementById("mission-tabs");

    // Create the tab with className and text content
    const tab = document.createElement("li");

    // Assign the class name
    tab.className = "tab-list-item";

    // Assign the id - this is for highlighting the tab on selection
    tab.id = "tab" + tabList.childElementCount;

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

    // Create the close button
    let closeButton = document.createElement("span");
    closeButton.className = "close-tab";
    closeButton.id = "close" + tabList.childElementCount;

    // Add trhe click listener
    closeButton.addEventListener("click", closeTab);
    closeButton.appendChild(document.createTextNode("✖"));
    
    // Space before close button
    tab.appendChild(document.createTextNode("\u00A0\u00A0"));
    tab.appendChild(closeButton);

    // Insert the tab before the add button
    tabList.appendChild(tab);

    // Scroll the tab into view
    // This causes problems with the rendering of the page and tabs get cut off
    //tab.scrollIntoView();

    // New untitled tab
    if (tabTitle == null) {
        // Save tab info to storage
        addMissionToStorage({"title": "Untitled"});
        
        // After the tab is added we want to select it
        tab.click();
    }
}

// When a tab is closed we want to remove it and delete the mission from storage
function closeTab(event) {

    // Don't let this bubble up to the tab select click handler
    event.stopPropagation();

    // Don't allow the tab to be deleted if it's the only one in the list
    if (document.getElementById("mission-tabs").childElementCount == 1) {
        return;
    }

    // Use the Blockly style confirmation since we'll need this in the Chrome App
    Blockly.confirm("Are you sure you want to close this mission? Please be sure to save your work.",
        function(ok) {

            if (ok) {

                // Get the ID of the tab being closed
                const tabId = parseInt(event.target.id.split("close")[1]);
        
                // Delete the mission from storage
                deleteMissionFromStorage(tabId);

                // Remove all tabs    
                for (let i = 0; i <= storedMissions.length; i++) {
                    const tab = document.getElementById("tab" + i);
                    tab.parentElement.removeChild(tab);
                }

                // Let's set the previous tab as the active one
                // Don't decrement the active tab if the first one is currently selected
                if (activeTabIndex != 0)
                    activeTabIndex--;

                // Reload the tabs
                buildTabsFromStoredMissions();
        
                // Highlight first tab
                highlightActiveTab();

                // Clear the workspace
                Blockly.getMainWorkspace().clear();

                // Load mission
                if(typeof storedMissions[activeTabIndex].xml !== 'undefined') {
                    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(storedMissions[activeTabIndex].xml), Blockly.getMainWorkspace());
                }
            }
        }
    );
}

// Initialize the tabs
initTabs();