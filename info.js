    function detectBrowser() {
    var browser = document.getElementById('browser');

    var ua = navigator.userAgent;
    var M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    var browserInfo = void 0;
    var tem = void 0;

    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || [];

        browserInfo = {
            name: 'IE',
            version: tem[1] || ''
        };
    }

    if (M[1] === 'Chrome') {
        tem = ua.match(/\bOPR|Edge\/(\d+)/);

        if (tem != null) {
            browserInfo = {
                name: 'Opera',
                version: tem[1]
            };
        }
    }

    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

    if ((tem = ua.match(/version\/(\d+)/i)) != null) {
        M.splice(1, 1, tem[1]);
    }

    browserInfo = {
        name: M[0],
        version: M[1]
    };

    browser.innerHTML = browserInfo.name + " " + browserInfo.version;
}

function detectOS() {

    var systemName = "";

    if (window.navigator.userAgent.indexOf('Windows NT 10.0') != -1) systemName = "Windows 10";
    if (window.navigator.userAgent.indexOf('Windows NT 6.2') != -1) systemName = "Windows 8";
    if (window.navigator.userAgent.indexOf('Windows NT 6.1') != -1) systemName = "Windows 7";
    if (window.navigator.userAgent.indexOf('Windows NT 6.0') != -1) systemName = "Windows Vista";
    if (window.navigator.userAgent.indexOf('Windows NT 5.1') != -1) systemName = "Windows XP";
    if (window.navigator.userAgent.indexOf('Windows NT 5.0') != -1) systemName = "Windows 2000";
    if (window.navigator.userAgent.indexOf('Android') != -1) systemName = "Android";
    if (window.navigator.userAgent.indexOf('Mac') != -1) systemName = "Mac/iOS";
    if (window.navigator.userAgent.indexOf('X11') != -1) systemName = "UNIX";
    if (window.navigator.userAgent.indexOf('Linux') != -1) systemName = "Linux";
    document.getElementById('os').innerHTML = systemName;
    //document.getElementById('os').innerHTML = systemName;
}
function detectISP() {
     fetch('http://ip-api.com/json')
    .then(response => response.json())
    .then(data => document.getElementById('isp').innerHTML = data.as);
}


function getIP() {
    fetch('http://ip-api.com/json')
    .then(response => response.json())
    .then(data => document.getElementById('ip').innerHTML = data.query);
}
detectOS();
detectISP();
detectBrowser();
getIP();