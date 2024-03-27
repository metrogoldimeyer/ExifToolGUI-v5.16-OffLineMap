# ExifToolGUI v5.16 with OffLine google API v3 & OnLine google maps
ExifToolGUI v5.16 - A Graphical User Interface for the ExifTool with OffLine google API v3 & OnLine google maps (rewrite March 2024).

Tested on Windows 7 Pro x64 Update August 2018 iso MSDL & Google Chrome Version 109.0.5414.120 (Official Build) (64-bit).

1.- Install Structure Dirs.

Install on any Drive Letter: < C | D | E | F | G | H | I | J | K | L | N | M | O | P | Q | R | S | T | U | V | W | X | Y | Z >  (Default G).
```
G
.
└──apps
   ├──photos
   |  └──ExifToolGUI
   |     └──maps-api-v3
   |        ├──api
   |        |  └──js
   |        |     └──9
   |        |        └──20
   |        |           └──intl
   |        |              └──es_ALL
   |        └──mapfiles
   |           ├──ms
   |           |  └──micons
   |           └──mv
   └──unix
      └──msys64
         └──usr
            └──bin
```

                
2.- Execute: ExifToolGUI-maps-api-v3-1g-Change-DriveLetter.cmd to change installation drive ( Not necessary for G drive installations ).

3.- Open ExifToolGUI-maps-api-v3-1g.html on Chrome ( Searches by lat,lon or adrres, Example: 40.734190,-1.617200 or Setiles ).

4.- Execute: ExifToolGUI-maps-api-v3-1g.exe ( Find: lat,lon - Example Find: 40.734190,-1.617200).

    Find: by adrres - Example Find: Setiles - Not working with Navigator4.0 of ExifToolGUI v5.16.0.0 ( window.XMLHttpRequest.name = undefined ).

    Alternative: search by address in ExifToolGUI-maps-api-v3-1g.html open with Chrome, copy lat,lon and paste into the Find field:

 5.- I request help: Does anyone know how to get lot,lon from an address in Navigator 4.0 of ExifToolGUI v5.16.0.0

 var url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + encodeURIComponent('Setiles');
 DownloadUrl (url, callback);

 /*
  * OK in Chrome
  * 
  * ERROR in Navigator 4.0 of ExifToolGUI v5.16.0.0 ( window.XMLHttpRequest.name = undefined )
  */
 function DownloadUrl (url, callback) {
	var xhr = (window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
	xhr.open("GET", url, true);
	xhr.responseType = 'json';
	xhr.addEventListener('load', function (event) {
		if (xhr.readyState === 4 && xhr.status === 200) {
		  if (xhr.response && xhr.response[0]) {
			  callback(xhr.response[0].lat, xhr.response[0].lon);
		  }
		}
	});
	xhr.send();
}

Enjoy,
 
Copyright © March 2024 maura3g, Setiles, Spain.                
