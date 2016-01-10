//Model Data
var markerLocation = function (data) {
  this.name = ko.observable(data.name);
  this.website = ko.observable(data.website);
  this.latitude = ko.observable(data.latitude);
  this.longitude = ko.observable(data.longitude);
};

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

//View Model
var AppViewModel = function () {
  var self = this;

  var map;
  var mapOptions = {
    zoom: 14,
    center: {lat: 42.812634, lng: -73.925237},
  };

  var map = new google.maps.Map(document.getElementById("map"),
      mapOptions);

  this.markerList = ko.observableArray([]);
  initialMarkers.forEach(function(markerItem){
    self.markerList.push(new markerLocation(markerItem));
  });
  this.currentMarker = ko.observable(this.markerList()[0]);

};

ko.applyBindings(new AppViewModel());
