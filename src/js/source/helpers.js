const getMobileOS = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    // https://stackoverflow.com/questions/58019463/how-to-detect-device-name-in-safari-on-ios-13-while-it-doesnt-show-the-correct
    const isIOS = /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

    if (isIOS) {
      return 'iOS';
    }
    else if( userAgent.match( /Android/i ) ) {
      return 'Android';
    }
    else {
      return 'unknown';
    }
}

export {
    getMobileOS
}