let activeTabIndex;
let storedMissions = loadStoredMissions();

function loadStoredMissions() {
    if(localStorage.getItem("storedMissions")) {
        return JSON.parse(localStorage.getItem("storedMissions"));
    } else {
        let firstMission = [{"title": "Untitled", xml: null}];
        localStorage.setItem("storedMissions", JSON.stringify(firstMission));
        return firstMission;
    }

}

function saveMissionToStorage(index) {
    storedMissions[index].xml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace()));
    localStorage.setItem("storedMissions", JSON.stringify(storedMissions));
}

function addMissionToStorage(mission) {
    storedMissions.push(mission);
    localStorage.setItem("storedMissions", JSON.stringify(storedMissions));
}

function buildTabsFromStoredMissions() {
    for (let i = 0; i < storedMissions.length; i++) {
        addNewTab(storedMissions[i].title);
    }
}

function getActiveTabIndex() {
    if (localStorage.getItem("activeTabIndex")) {
        return parseInt(localStorage.getItem("activeTabIndex"));
    } else {
        return 0;
    }
}

// Sets up the tab click listener
function initTabs() {

    activeTabIndex = getActiveTabIndex();

    // For when the add new tab button is clicked
    document.getElementById('add-new-tab').addEventListener('click', (event) => {
        addNewTab(null);
    });

    buildTabsFromStoredMissions();

    highlightActiveTab();
}

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
    //const tab = { title: previousTab.textContent, mission: Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace)) };
    saveMissionToStorage(previousTabIndex);
    
    //localStorage.setItem(previousTab.id, JSON.stringify(tab));

    // Get the index of the tab so we can update the stored missions object
    //console.log(event.target.id);
    //let tabId = parseInt(event.target.id.split("tab")[1]);

    //console.log(storedMissions[tabId]);

    // Store the previous tab
    //const previousTab = activeTab;

    // Make the new tab active
    activeTabIndex = parseInt(event.target.id.split("tab")[1]);

    // Clear the workspace
    workspace.clear();

    // Load the workspace from the tab's stored XML
    if(typeof storedMissions[activeTabIndex].xml !== 'undefined') {
        // const tab = JSON.parse(localStorage.getItem(activeTab));
        Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(storedMissions[activeTabIndex].xml), workspace);
        console.log("in here");
    }

    // Store the active tab index
    localStorage.setItem("activeTabIndex", activeTabIndex);

    highlightActiveTab();

}

// Create a new tab when clicked
function addNewTab(tabTitle) {

    // New tab so let's add to storage
    if (tabTitle == null) {
        addMissionToStorage({"title": "Untitled"});
    }

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

}

// So we can remember which tab to select when a user comes back
function storeActiveTabId(tab) {
    localStorage.setItem("activeTabIndex", tab);
}

// Listen for changes to the mission title. This means the mission has been loaded from Firebase
// let titleObserver = new MutationObserver((mutations) => {
//     activeTab.textContent = document.getElementById("missionTitle").textContent;
// });

// // 
// titleObserver.observe(document.getElementById("missionTitle"), { 
//     characterData: false,
//     childList: true
// });

// Initialize the tabs
initTabs();