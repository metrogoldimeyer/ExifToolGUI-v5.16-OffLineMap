window.google = window.google || {};
google.maps = google.maps || {};
(function() {

var DEBUG = !1;
var address_query;

function getScript(src) {
	var c = document;
	var d = c.body;
	c = c.createElement("script");
	c.type = "text/javascript";
	c.charset = "UTF-8";
	c.defer = true;
	c.async = true;
	c.src = src;
	c.onload = function() {
		var scrDrv = document.getElementById('drv');
		if (scrDrv != null) {
			document.body.removeChild(scrDrv);
		}
		initMap();
	};
	d.appendChild(c);
}

function isEmptyOrSpaces(str){
    return str === null || str.match(/^ *$/) !== null;
}

function contains(masterString, subString) {
  outerloop:
  for(var i=0; i <= masterString.length-subString.length; ++i) {
    for(var j=0; j<subString.length; ++j)
      if(masterString[i + j] !== subString[j]) continue outerloop;
    return true;
  }
  return false;
}

function isValidLatAndLong(coordinates){
	return /^(-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6})\s*,\s*(-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6})$/.test(coordinates);
}

google.maps.jsonData = (function (data) {
    if (!data || !data[0]) {
		alert("Geocoding '"+address_query+"' failed.");
		return !1;
    }
	if (DEBUG) { alert("google.maps.jsonData - lat:\n" + data[0].lat + "," + data[0].lon); }
	jsonCallback(data[0].lat, data[0].lon);
});

var jsonCallback;
function DownloadUrlNavigator4 (url, callback) {
	if (DEBUG) {  alert("DownloadUrlNavigator4"); }
	jsonCallback = callback;
	CreateJsonScript(url);
}

function CreateJsonScript(url) {
	var script = document.getElementById('json');
	if (script != null) {
		document.body.removeChild(script);
		if (DEBUG) { alert("document.body.removeChild script"); }
	}
	var c = document;
	var d = c.body;
	c = c.createElement("script");
	c.type = "text/javascript";
	c.charset = "UTF-8";
	c.id = 'json';
	c.src = url;
	d.appendChild(c);
}

google.maps.PlaceSearch = (function (address, callback) {
	if (isEmptyOrSpaces(address)) {
		return !0;
	}
	address_query = address;
	var url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + encodeURIComponent(address) + "&json_callback=google.maps.jsonData";
	var ver = navigator.appVersion, ua  = navigator.userAgent, regex;

	if ( isValidLatAndLong(address) ) {
		address = address.replace(/\s+/g, '');
		var loc=address.split(',');
		if (DEBUG) { alert("GotoPoint: "+address); }
		callback(loc[0],loc[1]);
	} else if (contains(ver,"Navigator4.0")) {
		if (DEBUG) { alert("NavigatorVersion:\n" + ver + "\n\nuserAgent:\n" + ua + "\nGotoAddress: "+address); }
		DownloadUrlNavigator4(url, callback);
	} else {
		if (DEBUG) { alert("GotoAddress: "+address); }
		DownloadUrlNavigator4(url, callback);
	}
});

var modules = google.maps.modules = {};
google.maps.__gjsload__ = function(name, text) {
	modules[name] = text;
};

google.maps.Load = function(apiLoad) {
delete google.maps.Load;
apiLoad([0.009999999776482582, [
[["https://mts0.googleapis.com/vt?lyrs=m@275000000\u0026src=api\u0026hl=es-ES\u0026",
  "https://mts1.googleapis.com/vt?lyrs=m@275000000\u0026src=api\u0026hl=es-ES\u0026"], null, null, null, null, "m@275000000",

["https://mts0.google.com/vt?lyrs=m@275000000\u0026src=api\u0026hl=es-ES\u0026",
 "https://mts1.google.com/vt?lyrs=m@275000000\u0026src=api\u0026hl=es-ES\u0026"]],

[["https://mt0.google.com/vt/lyrs=s,h\u0026hl=es\u0026",
  "https://mt1.google.com/vt/lyrs=s,h\u0026hl=es\u0026"], null, null, null, 1, "158",

 ["https://mt0.google.com/vt/lyrs=s\u0026hl=es\u0026",
  "https://mt1.google.com/vt/lyrs=s\u0026hl=es\u0026"]],

[["https://mts0.googleapis.com/vt?lyrs=h@275000000\u0026src=api\u0026hl=es-ES\u0026",
  "https://mts1.googleapis.com/vt?lyrs=h@275000000\u0026src=api\u0026hl=es-ES\u0026"], null, null, null, null, "h@275000000",

["https://mts0.google.com/vt?lyrs=h@275000000\u0026src=api\u0026hl=es-ES\u0026",
 "https://mts1.google.com/vt?lyrs=h@275000000\u0026src=api\u0026hl=es-ES\u0026"]],

[["https://mts0.googleapis.com/vt?lyrs=t@132,r@275000000\u0026src=api\u0026hl=es-ES\u0026",
  "https://mts1.googleapis.com/vt?lyrs=t@132,r@275000000\u0026src=api\u0026hl=es-ES\u0026"], null, null, null, null, "t@132,r@275000000",

 ["https://mts0.google.com/vt?lyrs=t@132,r@275000000\u0026src=api\u0026hl=es-ES\u0026",
 "https://mts1.google.com/vt?lyrs=t@132,r@275000000\u0026src=api\u0026hl=es-ES\u0026"]], null, null,

[["https://cbks0.googleapis.com/cbk?", "https://cbks1.googleapis.com/cbk?"]],

[["https://mt0.google.com/vt/lyrs=s\u0026hl=es\u0026", "https://mt1.google.com/vt/lyrs=s\u0026hl=es\u0026"], null, null, null, null, "84",
 ["https://mt0.google.com/vt/lyrs=s\u0026hl=es\u0026", "https://mt1.google.com/vt/lyrs=s\u0026hl=es\u0026"]],

[["https://mts0.googleapis.com/mapslt?hl=es-ES\u0026", "https://mts1.googleapis.com/mapslt?hl=es-ES\u0026"]],

[["https://mts0.googleapis.com/mapslt/ft?hl=es-ES\u0026", "https://mts1.googleapis.com/mapslt/ft?hl=es-ES\u0026"]],

[["https://mts0.googleapis.com/vt?hl=es-ES\u0026", "https://mts1.googleapis.com/vt?hl=es-ES\u0026"]],

[["https://mts0.googleapis.com/mapslt/loom?hl=es-ES\u0026", "https://mts1.googleapis.com/mapslt/loom?hl=es-ES\u0026"]],

[["https://mts0.googleapis.com/mapslt?hl=es-ES\u0026", "https://mts1.googleapis.com/mapslt?hl=es-ES\u0026"]],

[["https://mts0.googleapis.com/mapslt/ft?hl=es-ES\u0026", "https://mts1.googleapis.com/mapslt/ft?hl=es-ES\u0026"]],

[["https://mts0.googleapis.com/mapslt/loom?hl=es-ES\u0026", "https://mts1.googleapis.com/mapslt/loom?hl=es-ES\u0026"]]],

[
	"es-ES", "ES", null, 0, null, null,
	"maps-api-v3/mapfiles/",
	"https://csi.gstatic.com",
	null,
	"maps-api-v3",
	null,
	"https://maps.google.com"
],

["maps-api-v3/api/js/9/20/intl/es_ALL", "3.9.20"], [4290248692], 1,
 null, null, null, null, null, "", null, null, 1,

"https://khms.googleapis.com/mz?v=158\u0026", null,

 "https://earthbuilder.googleapis.com", "https://earthbuilder.googleapis.com", null,
 "https://mts.googleapis.com/vt/icon",

[["https://mts0.googleapis.com/vt", "https://mts1.googleapis.com/vt"],

[null, null], [null, [[0, "m", 275000000]], [null, "es-ES", "ES", null, 18, null, null, null, null, null, null, [[47], [37, [["smartmaps"]]]]], 0], [null, [[0, "m", 275000000]], [null, "es-ES", "ES", null, 18, null, null, null, null, null, null, [[47], [37, [["smartmaps"]]]]], 3], [null, [[0, "m", 275000000]], [null, "es-ES", "ES", null, 18, null, null, null, null, null, null, [[50], [37, [["smartmaps"]]]]], 0], [null, [[0, "m", 275000000]], [null, "es-ES", "ES", null, 18, null, null, null, null, null, null, [[50], [37, [["smartmaps"]]]]], 3], [null, [[4, "t", 132], [0, "r", 132000000]], [null, "es-ES", "ES", null, 18, null, null, null, null, null, null, [[63], [37, [["smartmaps"]]]]], 0], [null, [[4, "t", 132], [0, "r", 132000000]], [null, "es-ES", "ES", null, 18, null, null, null, null, null, null, [[63], [37, [["smartmaps"]]]]], 3], [null, null, [null, "es-ES", "ES", null, 18], 0], [null, null, [null, "es-ES", "ES", null, 18], 3], [null, null, [null, "es-ES", "ES", null, 18], 6], [null, null, [null, "es-ES", "ES", null, 18], 0],

["https://mts0.google.com/vt", "https://mts1.google.com/vt"], "/maps/vt", 275000000, 132], 2, 500,
["https://geo0.ggpht.com/cbk", "https://www.gstatic.com/landmark/tour", "https://www.gstatic.com/landmark/config", "/maps/preview/reveal?authuser=0", "/maps/preview/log204", null, "https://static.panoramio.com.storage.googleapis.com/photos/"],

["maps-api-v3/api/js/9/20/intl/es_ALL",
 "maps-api-v3/api/js/9/20/intl/es_ALL"], 1, 0], loadScriptTime);
};

var loadScriptTime = (new Date).getTime();

if (DEBUG) {
	var obj = window.location;
	for (Property in obj) {
		alert(Property + ": " + obj[Property]);
	}
}

var Script="maps-api-v3/api/js/9/20/intl/es_ALL/main.js";
getScript(Script);

var HOST = unescape(window.location.href.substring(0,(window.location.href.lastIndexOf("/"))+1)); // file:///N:/apps/photos/ExifToolGUI/
if (HOST) {
	var URL=HOST+Script;
} else {
	var URL="file:///< C | D | E | ..>:/apps/photos/ExifToolGUI/"+Script;
}
if (DEBUG) { alert('mgm: maps-api-v3/js.js -> \n'+URL); }
})();