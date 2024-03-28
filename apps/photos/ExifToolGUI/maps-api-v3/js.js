window.google = window.google || {};
google.maps = google.maps || {};
(function() {

//--- mgm ----------------------------------------------------------------------

function getScript(src) {
	document.write('<' + 'script src="' + src + '"' + ' type="text/javascript"><' + '/script>');
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
	return /^(-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}),\s*(-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6})$/.test(coordinates);
}

/*
 * https://www.gocher.me/OpenStreetMap-Marker
 */
function DownloadUrl (url, callback) {
	var xhr = (window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
	xhr.open("GET", url, true);
	xhr.responseType = 'json';
	xhr.addEventListener('load', function (event) {
		if (xhr.readyState === 4 && xhr.status === 200) {
		  if (xhr.response && xhr.response[0]) {
			var lat = xhr.response[0].lat;
			var lon = xhr.response[0].lon;
			var text = xhr.response[0].display_name;
			callback(lat, lon, text);
		  }
		}
	});
	xhr.send();
}

/*
 * getScript("maps-api-v3/api/js/9/20/intl/es_ALL/jquery.min.js");
 */
function DownloadUrlNavigator4 (url, callback) {
	alert("window.XMLHttpRequest.name: " + window.XMLHttpRequest.name);
	$(document).ready(function() {
	 alert("document.ready");
		$.ajax({
		 url: url,
		 method: 'GET',
		 dataType: 'json',
		 success: function(data) {
			 alert("lat: " +data[0].lat + " lon: " + data[0].lon);
		 },
		 error: function(error) {
			 console.error('Error:', error);
		 }
		});
	});
}

function DownloadUrlNavigator4_OLD (url, callback) {

	alert("window.XMLHttpRequest.name: " + window.XMLHttpRequest.name);

    var xhr = (window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")); // objet
    alert("xhr: " + xhr);

	xhr.open("GET", url, true);
	alert("GET");

	xhr.responseType = 'json';
	xhr.addEventListener('load', function (event) {
		if (xhr.readyState === 4 && xhr.status === 200) {
		  if (xhr.response && xhr.response[0]) {
			var lat = xhr.response[0].lat;
			alert("lat:"+lat);
			var lon = xhr.response[0].lon;
			var text = xhr.response[0].display_name;
			callback(lat, lon, text);
		  }
		}
	});
	xhr.send();
}

/*
 * ExifToolGUI.html - google.maps.PlaceSearch(location, GotoLocation);
 *
 * +++ https://www.gocher.me/OpenStreetMap-Marker - xhr.open("GET", url, true);
 *
 * - ExifToolGUI v5.16.0.0
 *
 *   ver: Navigator4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727;
 *       .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)
 *
 *   ua: Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727;
 *       .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E)
 *
 */
google.maps.PlaceSearch = (function (address, callback) {

	if (isEmptyOrSpaces(address)) {
		return !0;
	}

	var url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + encodeURIComponent(address);
	
	var ver = navigator.appVersion, ua  = navigator.userAgent, regex;
	if (contains(ver,"Navigator4.0")) {					// ExifToolGUI v5.16.0.0 Navigator
		alert("NavigatorVersion:\n" + ver + "\n\nuserAgent:\n" + ua);

		DownloadUrlNavigator4(url, callback);			// not working with Navigator4.0 of ExifToolGUI v5.16.0.0
		// ec.DownloadUrl(url, callback, false, false);	// not working with Navigator4.0 of ExifToolGUI v5.16.0.0
		// PI(url, callback, false, false);				// not working with Navigator4.0 of ExifToolGUI v5.16.0.0
		// fetchUrl(url, callback);						// Error script with Navigator4.0 of ExifToolGUI v5.16.0.0
	}

	if ( isValidLatAndLong(address) ) {
		var loc=address.split(',');
		callback(loc[0],loc[1]); // GotoLocation(lat,lon);
	} else {
		alert("GotoAddress: "+address);

		DownloadUrl(url, callback);						// working with Chome Windows 7 - ExifToolGUI-maps-api-v3-1g.html
		// ec.aa(url, true, false, true);				// working with Chome Windows 7 - ExifToolGUI-maps-api-v3-1g.html
		// ec.DownloadUrl(url, callback, false, false);	// working with Chome Windows 7 - ExifToolGUI-maps-api-v3-1g.html
		// PI(url, callback, false, false);				// working with Chome Windows 7 - ExifToolGUI-maps-api-v3-1g.html
		// fetchUrl(url, callback);						// working with Chome Windows 7 - ExifToolGUI-maps-api-v3-1g.html

		// getScript(url+"&callback=DownloadUrlScript");
	}
});

/*
 * https://maps.googleapis.com/maps-api-v3/api/js/28/19/intl/es_ALL/zombie.js
 *
 * F:\apps\photos\ExifToolGUI\maps-api-v3\api\js\28\19\intl\es_ALL\zombie.js
 */
var ec = {
	create: function() {
		try {
			if ("undefined" != typeof ActiveXObject)
				return new ActiveXObject("Microsoft.XMLHTTP");
			if (window.XMLHttpRequest)
				return new XMLHttpRequest
		} catch (a) {}
		return null
	},
	/*
	 * DownloadUrl: ec.aa -> ec.DownloadUrl(url, callback, method (false -> GET | true -> POST), ? -> "Content-Type");
	 *	a: url
	 *  b: callback
	 *  c:
	 */
	//aa: function(a, b, c, e) {
	DownloadUrl: function(url, callback, c, e) {
		var xhr = ec.create();

		// xhr.responseType = 'json'; // mgm

		if (!xhr)
			return !1;
		callback && (xhr.onreadystatechange = function() {
			if (4 == xhr.readyState) {
				var response = ec.ba(xhr);
				// callback(response.responseText, response.status);
				// xhr.onreadystatechange = p
				var resArr = JSON.parse(this.responseText);
				var lat = resArr[0].lat;
				var lon = resArr[0].lon;
				var text = resArr[0].display_name;
				callback(lat, lon, text);
			}
		});

		c ? (xhr.open("POST", url, !0),
		(a = e) || (a = "application/x-www-form-urlencoded"), xhr.setRequestHeader("Content-Type", a),
		// xhr.open(method <"GET" | "POST">, URL, [async (false=asincrónica), user, password])
		xhr.send(c)) : ( xhr.open("GET", url, !0), xhr.send(null) );
		return !0
	},
	ba: function(xhr) {
		var b = -1, c = null;
		try { b = xhr.status, c = xhr.responseText }
		catch (e) {}
		return { status: b, responseText: c	}
	}
};

var ZD = "status", yE = "open";
/*
 * F:\apps\photos\ExifToolGUI\maps-api-v3_OK\api\js\18\5\intl\es_ALL\util-formatter.js
 *
 * DownloadUrl: PI(url, callback, method (false -> GET | true -> POST), ? -> "Content-Type");
 *	a: url
 *  b: callback
 *  c:
 *  d:
 */
//function PI(a, b, c, d) {
function PI(url, callback, c, d) {
	//var e = c || Jd(),
	var e = c,
		//xhr = new k.XMLHttpRequest;
		xhr = new XMLHttpRequest;
	/* Va(xhr, function() {
		e(0, null)
	}); */
	xhr.onreadystatechange = function() {
		if (4 == xhr.readyState)
			if (200 == xhr[ZD]) {
				var res;
				try {
					var c = xhr.responseText;
					// 0 != c[Mc](")]}\'\\n") || (c = c[ac](5));
					res = d ? eval(c) : JSON.parse(c)
				} catch (l) {
					e(1, l);
					return
				}
				// callback(res)
				callback(res[0].lat,res[0].lon)
			} else e(0, null)
	};
	xhr[yE]("GET", url, !0);
	xhr.send(null)
};

/*
 * file:///F:/apps/photos/ExifToolGUI/maps-api-v3/api/js/28/19/intl/es_ALL/util.js
 */
var VG = function(a, b) {
        var c = new window.XMLHttpRequest
          , d = b.$b || _.na();
        if ("withCredentials"in c)
            c.open(b.rg || "GET", a, !0);
        else if ("undefined" != typeof window.XDomainRequest)
            c = new window.XDomainRequest,
            c.open(b.rg || "GET", a);
        else {
            d(0, null);
            return
        }
        c.onload = function() {
            UG(c.responseText, b)
        };
        c.onerror = function() {
            d(0, null)
        };
        c.send(b.data || null)
    };

var WG = function(a, b) {
        var c = new window.XMLHttpRequest
          , d = b.$b || _.na();
        c.open(b.rg || "GET", a, !0);
        b.contentType && c.setRequestHeader("Content-Type", b.contentType);
        c.onreadystatechange = function() {
            4 != c.readyState || (200 == c.status ? UG(c.responseText, b) : d(0, null))
        }
        ;
        c.onerror = function() {
            d(0, null)
        }
        ;
        c.send(b.data || null)
    };

//--- /mgm ---------------------------------------------------------------------

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

[["https://mt0.google.com/vt/lyrs=s,h\u0026hl=en\u0026",
  "https://mt1.google.com/vt/lyrs=s,h\u0026hl=en\u0026"], null, null, null, 1, "158",

 ["https://mt0.google.com/vt/lyrs=s\u0026hl=en\u0026",
  "https://mt1.google.com/vt/lyrs=s\u0026hl=en\u0026"]],

[["https://mts0.googleapis.com/vt?lyrs=h@275000000\u0026src=api\u0026hl=es-ES\u0026",
  "https://mts1.googleapis.com/vt?lyrs=h@275000000\u0026src=api\u0026hl=es-ES\u0026"], null, null, null, null, "h@275000000",

["https://mts0.google.com/vt?lyrs=h@275000000\u0026src=api\u0026hl=es-ES\u0026",
 "https://mts1.google.com/vt?lyrs=h@275000000\u0026src=api\u0026hl=es-ES\u0026"]],

[["https://mts0.googleapis.com/vt?lyrs=t@132,r@275000000\u0026src=api\u0026hl=es-ES\u0026",
  "https://mts1.googleapis.com/vt?lyrs=t@132,r@275000000\u0026src=api\u0026hl=es-ES\u0026"], null, null, null, null, "t@132,r@275000000",

 ["https://mts0.google.com/vt?lyrs=t@132,r@275000000\u0026src=api\u0026hl=es-ES\u0026",
 "https://mts1.google.com/vt?lyrs=t@132,r@275000000\u0026src=api\u0026hl=es-ES\u0026"]], null, null,

[["https://cbks0.googleapis.com/cbk?", "https://cbks1.googleapis.com/cbk?"]],

[["https://mt0.google.com/vt/lyrs=s\u0026hl=en\u0026", "https://mt1.google.com/vt/lyrs=s\u0026hl=en\u0026"], null, null, null, null, "84",
 ["https://mt0.google.com/vt/lyrs=s\u0026hl=en\u0026", "https://mt1.google.com/vt/lyrs=s\u0026hl=en\u0026"]],

[["https://mts0.googleapis.com/mapslt?hl=es-ES\u0026", "https://mts1.googleapis.com/mapslt?hl=es-ES\u0026"]],

[["https://mts0.googleapis.com/mapslt/ft?hl=es-ES\u0026", "https://mts1.googleapis.com/mapslt/ft?hl=es-ES\u0026"]],

[["https://mts0.googleapis.com/vt?hl=es-ES\u0026", "https://mts1.googleapis.com/vt?hl=es-ES\u0026"]],

[["https://mts0.googleapis.com/mapslt/loom?hl=es-ES\u0026", "https://mts1.googleapis.com/mapslt/loom?hl=es-ES\u0026"]],

[["https://mts0.googleapis.com/mapslt?hl=es-ES\u0026", "https://mts1.googleapis.com/mapslt?hl=es-ES\u0026"]],

[["https://mts0.googleapis.com/mapslt/ft?hl=es-ES\u0026", "https://mts1.googleapis.com/mapslt/ft?hl=es-ES\u0026"]],

[["https://mts0.googleapis.com/mapslt/loom?hl=es-ES\u0026", "https://mts1.googleapis.com/mapslt/loom?hl=es-ES\u0026"]]],


["es-ES", "ES", null, 0, null, null, "maps-api-v3/mapfiles/", "https://csi.gstatic.com", null, null, null, "https://maps.google.com"],

["maps-api-v3/api/js/9/20/intl/es_ALL", "3.9.19"], [4290248692], 1, null, null, null, null, null, "", null, null, 1,

//"https://khms.googleapis.com/mz?v=158\u0026", null, "https://earthbuilder.googleapis.com", "https://earthbuilder.googleapis.com", null,
// "https://khms.googleapis.com/mz?v=158\u0026", "KEY",
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

// getScript("maps-api-v3/api/js/9/20/intl/es_ALL/jquery.min.js");

var Script="maps-api-v3/api/js/9/20/intl/es_ALL/main.js";
getScript(Script);

// getScript("maps-api-v3/api/js/9/20/intl/es_ALL/places.js");

// HOST not working with Navigator4.0 of ExifToolGUI v5.16.0.0
var HOST = unescape(window.location.href.substring(0,(window.location.href.lastIndexOf("/"))+1)); // file:///D:/apps...
if (HOST) {
	var URL=HOST+Script;
} else {
	var URL="file:///< C | D | E | ..>:/apps/photos/ExifToolGUI/"+Script;
}
alert('mgm: maps-api-v3/js.js -> '+URL);
})();
