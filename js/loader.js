var toolboxXml;

$(function() {
    const lang = findLanguage();
    const aircraftType = findAircraftType();
    loadScript('./blockly/msg/js/' + lang + '.js', 'script')
    .then((script) => {
        return loadScript('./xml/' + aircraftType + '_toolbox.xml', 'xml');
    })
    .then((xmlDoc) => {
        updateToolbox(xmlDoc);
        return loadScript('./js/droneblocks.js', 'script');
    })
    .then(json => {
        firebase.initializeApp(config);
    })
    .catch(err => console.log('Script loading error', err));
});


function updateToolbox(xmlDoc) {
    Array.from(xmlDoc.getElementsByTagName('category')).forEach(category => {
        const name = category.getAttribute('name');
        const value = Blockly.Msg['CATEGORY_' + name.toUpperCase()];
        console.log(name + ":" + value);
        category.setAttribute('name', value);
    });
    toolboxXml = new XMLSerializer().serializeToString(xmlDoc);
}

function loadScript(url, dataType) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: url,
            dataType: dataType,
            success: function (data) {
                resolve(data);
            },
            error: function (jqXHR, exception) {
                reject(exception);
            }
        });
    });
}

function findLanguage() {
    let lang = 'en';

    const searchStr = location.search.substr(1);
    searchStr.split("&").forEach(keyValue => {
        const keyValues = keyValue.split('=');
        if (keyValues.length && keyValues[0] === 'language') {
            lang = keyValues[1];
        }        
    });

    return lang;
}

function findAircraftType() {
    let aircraftType = "dji";
    
    if (location.pathname.includes("tello") || location.pathname.includes("chrome_app")) {
        return "tello";
    }

    return aircraftType;
}