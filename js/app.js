//Model Data

var initialMarkers = [
  {
    name: 'Union College',
    website: 'www.union.edu',
    latitude: 42.817765,
    longitude: -73.930548,
    marker: ''
  },
  {
    name: '20N Broadway Tavern',
    website: 'No website',
    latitude: 42.815768,
    longitude: -73.941403,
    marker: ''
  },
  {
    name: 'Proctors Theater',
    website: 'www.proctors.org',
    latitude: 42.812557,
    longitude: -73.941850,
    marker: ''
  },
  {
    name: 'Cornells Restaurant',
    website: 'www.cornellsrestaurant.com',
    latitude: 42.817836,
    longitude: -73.938326,
    marker: ''
  },
  {
    name: 'Bow Tie Cinemas',
    website: 'bowtiecinemas.com',
    latitude: 42.812920,
    longitude:  -73.942673,
    marker: ''
  },
  {
    name: 'Amtrak Train Station',
    website: 'amtrak.com',
    latitude: 42.814612,
    longitude: -73.942893,
    marker: ''
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
  var stringStartsWith = function (string, startsWith) {
    string = string || "";
    if (startsWith.length > string.length)
        return false;
    return string.substring(0, startsWith.length) === startsWith;
  };

  var self = this;

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
      map: map, //null
      title: placeItem.name
    });

    placeItem.marker = marker;

    //marker = null;

    var windowNames = placeItem.name

    infoWindow = new google.maps.InfoWindow();

    var contentString = '<div id="content">' + windowNames

    google.maps.event.addListener(placeItem.marker, 'click', function() {
      console.log("clicked");
      infoWindow.setContent(contentString);
      infoWindow.open(map, this);
    });
  });
///////////////////////////////////////////////////////////////////////
    self.initialMarkers= ko.observableArray(initialMarkers);
    self.query= ko.observable('');

    self.filteredPlaces = ko.computed(function(placeItem) {
      var filter = self.query().toLowerCase();
      if (!filter) {
        for (var i = 0; i < self.initialMarkers.length; i++){
          self.initialMarkers[i].marker.setVisible(true);
        }
        return self.initialMarkers();
      } else {
          return ko.utils.arrayFilter(self.initialMarkers(), function(placeItem) {
              for (var a = 0; a < self.initialMarkers.length; a++) {
                if (self.initialMarkers[a].name !== self.filteredPlaces()[i].name()) {
                self.initialMarkers[a].marker.setVisible(false);
                }
            };
            return stringStartsWith(placeItem.name.toLowerCase(), filter);
          });
      }
    }, self);

///////////////////////////////////////////////////////////////////


};

ko.applyBindings(new AppViewModel());

//https://developers.google.com/maps/documentation/javascript/reference referenced for map code
//https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple info window one
//http://you.arenot.me/2010/06/29/google-maps-api-v3-0-multiple-markers-multiple-infowindows/ infowindow marker to this
//http://opensoul.org/2011/06/23/live-search-with-knockoutjs/ list and filter list
//http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html filter list
//http://stackoverflow.com/questions/28042344/filter-using-knockoutjs stringStartsWith
