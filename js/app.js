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

  this.markerList = ko.observableArray([]);
  /*var schenectady = {lat: 42.812634, lng: -73.925237};

  var mapOptions = {
    zoom: 14,
    center: {lat: 42.812634, lng: -73.925237},
  };

  var map = new google.maps.Map(document.getElementById("map"),
      mapOptions);

  var contentString = '<div id="content">' + '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' + '</div';

  var infoWindow = new google.maps.InfoWindow({
     content: contentString
  });

  var marker = new google.maps.Marker({
    position: schenectady,
    map: map,
    title: 'Schenectady',
    //clickable: true //
  });

  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  }); THIS CODE IN THIS SHADOW OUT WORKS FOR ONE MARKER*/

  var mapOptions = {
    zoom: 14,
    center: {lat: 42.812634, lng: -73.925237},
  };

  var map = new google.maps.Map(document.getElementById("map"),
      mapOptions);

    /*function locationFinder() {
      var locations = [];
      locations.push(initialMarkers.name);

      return locations;
    }*/
  self.markerArray = ko.observableArray(initialMarkers);

  for (var i=0; i<initialMarkers.length; i++) {

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(initialMarkers[i].latitude, initialMarkers[i].longitude),
      map: map,
      title: initialMarkers[i].name,
      //clickable: true //
    });

    var windowNames = initialMarkers[i].name

    var contentString = '<div id="content">' + windowNames

    google.maps.event.addListener(marker, 'click', function() {
      console.log("clicked");
      //infoWindow.setContent(this.html);
      infoWindow.open(map, this);
    });

  };

  //initialMarkers.forEach(function(markerItem){
  //  self.markerList.push(new markerLocation(markerItem));
  //});
  //self.currentMarker = ko.observable(this.markerList()[0]);

  var infoWindow = new google.maps.InfoWindow({
     content: contentString
  });

  //for (var i=0; i<initialMarkers.length; i++) {
  //var contentString = initialMarkers[i].name;//'<div id="content">' + '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' + '</div';

////  var infoWindow = new google.maps.InfoWindow({
  //   content: initialMarkers[i].name
//  });
//};
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
  })
    self.markerArray = ko.observableArray(initialMarkers);

  for (var i=0; i<initialMarkers.length; i++) {

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

  };*/

  //self.markerArray.push(new Place(marker));

  //this.markerList = ko.observableArray([]);
  //initialMarkers.forEach(function(markerItem){
  //  self.markerList.push(new markerLocation(markerItem));
  //});
  //this.currentMarker = ko.observable(this.markerList()[0]);

};

ko.applyBindings(new AppViewModel());

//https://developers.google.com/maps/documentation/javascript/reference referenced for map code
//https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple info window one
//http://you.arenot.me/2010/06/29/google-maps-api-v3-0-multiple-markers-multiple-infowindows/ infowindow marker to this
