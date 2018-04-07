var map;

var centerCoord = {lat:33.4893, lng:-117.552};

function CenterControl(controlDiv, map) {

	// css for the control border
	var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
	controlUI.style.borderRadius = '3px';
	controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
	controlUI.style.cursor = 'pointer';
	controlUI.style.marginBottom = '22px';
	controlUI.style.textAlign = 'center';
	controlUI.title = 'Click to recenter the map';
	controlDiv.appendChild(controlUI);

	var controlText = document.createElement('div');
	controlText.style.color = 'rgb(25,25,25)';
	controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
	controlText.style.fontSize = '16px';
	controlText.style.lineHeight = '38px';
	controlText.style.paddingLeft = '5px';
	controlText.style.paddingRight = '5px';
	controlText.innerHTML = 'Recenter Map';
	controlUI.appendChild(controlText);
 


	controlUI.addEventListener('click', function(){
		map.setCenter(centerCoord);
		map.setZoom(9);
	});
}


function initMap() {

	var mapOptions = {
		zoom: 9,
		center: centerCoord,
		styles: [
		    {
		        "stylers": [
		            {
		                "hue": "#baf4c4"
		            },
		            {
		                "saturation": 10
		            }
		        ]
		    },
		    {
		        "featureType": "water",
		        "stylers": [
		            {
		                "color": "#effefd"
		            }
		        ]
		    },
		    {
		        "featureType": "all",
		        "elementType": "labels",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "administrative",
		        "elementType": "labels",
		        "stylers": [
		            {
		                "visibility": "on"
		            }
		        ]
		    },
		    {
		        "featureType": "road",
		        "elementType": "all",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    },
		    {
		        "featureType": "transit",
		        "elementType": "all",
		        "stylers": [
		            {
		                "visibility": "off"
		            }
		        ]
		    }
		]

	};

	var mapElement = document.getElementById('map');

	var map = new google.maps.Map(mapElement, mapOptions);

    var markerIcons = [
    	'crocodile.png', 'sloth.png', 'bee.png', 'turtle.png', 'plant.png', 'fox.png', 'leaves.png'
    ];



	for(var temp=0;temp<markerIcons.length;temp++){
    	markerIcons[temp]="./icons/"+markerIcons[temp];
	}



    var stressed = markerIcons[0];
    var happy = markerIcons[1];
    var busy = markerIcons[2];
    var slow = markerIcons[3];
    var growth = markerIcons[4];
    var frustrated = markerIcons[5];
    var thankful = markerIcons[6];


    // <h3></h3><h5></h5><p></p>

    var markerProps = [
    	{
			coords:{lat:34.071650, lng:-118.451650},
			content: '<h3>UCLA</h3>',
			iconImage: './icons/homeIcon.png'
		},
		{
			coords:{lat:32.9656, lng:-117.1883},
			content: '<h3>Home :)</h3>',
			iconImage: './icons/homeIcon.png'
		},
		{
			coords:{lat:32.83292,lng:-117.15995},
			content: '<h3>1-5-18</h3><h5>Tea N More</h5><p>Good chat with Amy</p>',
			iconImage: thankful,
		},
		{
			coords:{lat:33.192768,lng:-117.379433},
			content: '<h3>1-7-18</h3><h5>Train Station</h5><p>Winter break over..</p>',
			iconImage: frustrated,
		},
		{
			coords:{lat:34.0464, lng:-118.34574},
			content: '<h3>1-8-18</h3><h5>Leo\'s Taco Truck</h5><p>Richard\'s a babe. What\'s new?</p>',
			iconImage: thankful,
		},
		{
			coords:{lat:34.063724, lng:-118.297261},
			content: '<h3>1-9-18</h3><h5>Kang Ho Dong</h5><p>$_$</p><p>P sure I almost died three times..</p><p>Byebye Chan</p>',
			iconImage: happy,
		},
		{
			coords:{lat:34.107287, lng:-118.350239},
			content: '<h3>1-13-18</h3><h5>Runyon Canyon Park</h5><p>I am a bad boyfriend</p>',
			iconImage: growth,
		},
		{
			coords:{lat:34.009718, lng:-118.49694},
			content:'<h3>1-15-18</h3><h5>Santa Monica</h5><p>Cute Pics</p>',
			iconImage: happy,
		},
		{
			coords:{lat:34.069189, lng:-118.443175},
			content:'<h3>1-23-18</h3><h5>UCLA Radio!!!</h5><p>Ahhhh first intern class</p>',
			iconImage: growth,
		},
		{
			coords:{lat: 34.228041,lng: -118.449745},
			content:'<h3>1-26-18</h3><h5>Broomball</h5><p>Wonderful time of fellowship & fun</p>',
			iconImage: happy,
		},
    ];

    var markers = [];

    for (var i = 0; i < markerProps.length; i++) {
    	markers.push(addMarker(markerProps[i]));
    }

    var markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://raw.githubusercontent.com/googlemaps/js-marker-clusterer/gh-pages/images/m'});

	function addMarker(props) {
		var marker = new google.maps.Marker({
			position: props.coords,
			map: map,
		});

		if (props.iconImage) {
			marker.setIcon(props.iconImage);
		}

		if (props.title) {
			marker.setTitle(props.title);
		}
		else {
			marker.setTitle('Click to learn more');
		}

		if (props.content) {
			var infoWindow = new google.maps.InfoWindow({
				content: props.content
			});
			marker.addListener("click", function(){
				infoWindow.open(map, marker);
			});
		}

		google.maps.event.addListener(marker, 'dblclick', function(event){
			map = marker.getMap();    
			map.setCenter(marker.getPosition()); // set map center to marker position
			smoothZoom(map, 12, map.getZoom()); // call smoothZoom, parameters map, final zoomLevel, and starting zoom level
		});

		return marker;
	}

	var centerControlDiv = document.createElement('div');
	var centerControl = new CenterControl(centerControlDiv, map);

	centerControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(centerControlDiv);

	function smoothZoom (map, max, cnt) {
		if (cnt >= max) {
		    return;
		}
		else {
		    z = google.maps.event.addListener(map, 'zoom_changed', function(event){
		        google.maps.event.removeListener(z);
		        smoothZoom(map, max, cnt + 1);
		    });
		    setTimeout(function(){map.setZoom(cnt)}, 150); // 80ms is what I found to work well on my system -- it might not work well on all system
	    }
	}  


}

google.maps.event.addDomListener(window, 'load', initialize);

