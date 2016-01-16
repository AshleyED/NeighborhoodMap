//Model Data

var initialMarkers = [
  {
    name: 'Union College',
    website: 'www.union.edu',
    latitude: 42.817765,
    longitude: -73.930548
  },
  {
    name: '20N Broadway Tavern',
    website: 'No website',
    latitude: 42.815768,
    longitude: -73.941403
  },
  {
    name: 'Proctors Theater',
    website: 'www.proctors.org',
    latitude: 42.812557,
    longitude: -73.941850
  },
  {
    name: 'Cornells Restaurant',
    website: 'www.cornellsrestaurant.com',
    latitude: 42.817836,
    longitude: -73.938326
  },
  {
    name: 'Bow Tie Cinemas',
    website: 'bowtiecinemas.com',
    latitude: 42.812920,
    longitude:  -73.942673
  },
  {
    name: 'Amtrak Train Station',
    website: 'amtrak.com',
    latitude: 42.814612,
    longitude: -73.942893
  }
];

var Place = function (data) {
  this.name = ko.observable(data.name);
  this.website = ko.observable(data.website);
  this.latitude = ko.observable(data.latitude);
  this.longitude = ko.observable(data.longitude);
  this.marker = '';
};

//View Model
var map;
var infoWindow;
var marker;

var AppViewModel = function () {
  var self = this;

  this.markerList = ko.observableArray([]);

  var mapOptions = {
    zoom: 14,
    center: {lat: 42.812634, lng: -73.925237},
  };

  map = new google.maps.Map(document.getElementById("map"),
      mapOptions);

  self.markerArray = ko.observableArray(initialMarkers);

  self.markerArray().forEach(function(placeItem) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(placeItem.latitude, placeItem.longitude),
      map: map,
      title: placeItem.name
    });

    placeItem.marker = marker;

    var windowNames = placeItem.name

    infoWindow = new google.maps.InfoWindow();

    var contentString = '<div id="content">' + windowNames

    google.maps.event.addListener(placeItem.marker, 'click', function() {
      console.log("clicked");
      infoWindow.setContent(contentString);
      infoWindow.open(map, this);
    });
  });
};

ko.applyBindings(new AppViewModel());

//https://developers.google.com/maps/documentation/javascript/reference referenced for map code
//https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple info window one
//http://you.arenot.me/2010/06/29/google-maps-api-v3-0-multiple-markers-multiple-infowindows/ infowindow marker to this
