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
};

//View Model
var map;
var infoWindow;

var AppViewModel = function () {
  var self = this;

  //this.markerList = ko.observableArray([]);

  var mapOptions = {
    zoom: 14,
    center: {lat: 42.812634, lng: -73.925237},
  };

  self.googleMap = new google.maps.Map(document.getElementById("map"),
      mapOptions);

  self.infoWindow = new google.maps.InfoWindow({
     content: initialMarkers.name
  })

/*  self.markerArray = ko.observableArray(initialMarkers);
  initialMarkers.forEach(function(place){
    self.markerArray.push(new Place(place));
  });

  self.markerArray.forEach(function(place){
    var markerSettings = {
      position: new google.maps.LatLng(initialMarkers.latitude, initialMarkers.longitude),
      map: self.googleMap,
      title: initialMarkers.name,
      clickable: true //
    }
    Place.marker = new google.maps.Marker(markerSettings);
  }) */


  for (var i=0; i<initialMarkers.length; i++) {
    self.markerArray = ko.observableArray(initialMarkers);

      //self.markerArray.push(new Place(Place));

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(initialMarkers[i].latitude, initialMarkers[i].longitude),
      map: self.googleMap,
      title: initialMarkers[i].name,
      clickable: true //
    })

    self.infoWindow = new google.maps.InfoWindow({
       content: initialMarkers[i].name
    })

    google.maps.event.addListener(marker, 'click', (function() {
      console.log("clicked");
      self.infoWindow.open(map, marker);
    }));

  };

  //self.markerArray.push(new Place(marker));

  //this.markerList = ko.observableArray([]);
  //initialMarkers.forEach(function(markerItem){
  //  self.markerList.push(new markerLocation(markerItem));
  //});
  //this.currentMarker = ko.observable(this.markerList()[0]);

};

ko.applyBindings(new AppViewModel());

//https://developers.google.com/maps/documentation/javascript/reference referenced for map code
