// IMPORTANT: only use for reporting (use feature detection for browser specific functions!)
// Returns an Object with name and version of browser, compatable across roughly 99.8% browsers
// Fonte: https://gist.github.com/ocundale/13c5a632b3bdb8cadb59

//Extend browsers here.
var acceptedVersions = {
  "Chrome": 49,
  "Firefox": 43,
  "Opera": -1,
  "Vivaldi": -1,
  "IE": -1
}

var getBrowserInfo = function(ua){
  var sTempInfo,
    oBrowserInfo = {},
    sBrowserString = ua.match(/(vivaldi|opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([0-9|\.]+)/i) || [];

  //trident check (IE11 and below)
  if(/trident/i.test(sBrowserString[1])) {
    sTempInfo = /\brv[ :]+(\d+)/g.exec(ua) || [];
    oBrowserInfo.sName = 'MSIE';
    oBrowserInfo.sVersion = sTempInfo[1];
    return oBrowserInfo;
  }
  if(sBrowserString[1]=== 'Chrome') {
    sTempInfo = ua.match(/\b(OPR|Edge)\/(\d+)/);
    //Opera/Edge case:
    if(sTempInfo !== null) {
      if(sTempInfo.indexOf('Edge')) {
        oBrowserInfo.sName = 'MSIE';   //mark ms edge browser as MSIE
      } else {
        oBrowserInfo.sName = 'Opera';
      }
      oBrowserInfo.sVersion = sTempInfo.slice(1);
      return oBrowserInfo;
    }
  }
  sBrowserString = sBrowserString[2]? [sBrowserString[1], sBrowserString[2]]: [navigator.appName, navigator.appVersion, '-?'];
  sTempInfo = ua.match(/version\/(\d+)/i);

  if(sTempInfo!== null) {
    sBrowserString.splice(1, 1, sTempInfo[1]);
  }
  oBrowserInfo.sName = sBrowserString[0];
  oBrowserInfo.sVersion = sBrowserString[1];
  return oBrowserInfo;
};

var browser = getBrowserInfo(navigator.userAgent);

if  (parseFloat(acceptedVersions[browser.sName]) == -1 ){
  document.write('<div class="not-found making-lemonade"><div class="message"><h1 class="title">Oops!<\/h1><span class="block">Lemonade was tested on the following browsers: Chrome and Firefox, and might be susceptible to errors in this browser. Please use it in one of the two options, to ensure a best experience! <\/span><\/div><\/div>');
} else if (parseFloat(browser.sVersion) >  parseFloat(acceptedVersions[browser.sName])){
  document.write('<script src="/assets/vendor.js"><\/script>')
  document.write('<script src="/assets/citron.js"><\/script>');
} else {
  document.write('<div class="not-found making-lemonade"><div class="message"><h1 class="title">Oops!<\/h1><span class="block">It seems like you are using an older browser. Please update you browser. <\/span><span class="block">The versions accepted for ', browser.sName, ' are newer than ', acceptedVersions[browser.sName], '<\/span><\/div><\/div>');
}

