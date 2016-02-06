//Model Data

var initialMarkers = [
  {
    name: 'Union College',
    address: '807 Union St, Schenectady, NY 12308',
    website: 'www.union.edu',
    latitude: 42.817765,
    longitude: -73.930548,
    marker: ''
  },
  {
    name: '20N Broadway Tavern',
    address: '20 Broadway Schenectady, NY 12305',
    website: 'No website',
    latitude: 42.815768,
    longitude: -73.941403,
    marker: ''
  },
  {
    name: 'Proctors',
    address: '432 State St, Schenectady, NY 12305',
    website: 'www.proctors.org',
    latitude: 42.812557,
    longitude: -73.941850,
    marker: ''
  },
  {
    name: 'Cornells Restaurant',
    address: '39 N Jay St, Schenectady, NY 12305',
    website: 'www.cornellsrestaurant.com',
    latitude: 42.817836,
    longitude: -73.938326,
    marker: ''
  },
  {
    name: 'Bow Tie Cinemas',
    address: '400 State St, Schenectady, NY 12305',
    website: 'bowtiecinemas.com',
    latitude: 42.812920,
    longitude:  -73.942673,
    marker: ''
  },
  {
    name: 'Amtrak Train Station',
    address: '332 Erie Blvd, Schenectady, NY 12305',
    website: 'amtrak.com',
    latitude: 42.814612,
    longitude: -73.942893,
    marker: ''
  }
];

var Place = function (data) {
  this.name = ko.observable(data.name);
  this.address = ko.observable(data.address);
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
    center: {lat: 42.814113, lng: -73.939643},
  };

  map = new google.maps.Map(document.getElementById("map"),
      mapOptions);

  google.maps.event.addDomListener(window, "resize", function() {
			var center = map.getCenter();
			google.maps.event.trigger(map, "resize");
			map.setCenter(center);
  });

  self.markerArray = ko.observableArray(initialMarkers);

  self.markerArray().forEach(function(placeItem) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(placeItem.latitude, placeItem.longitude),
      map: map,
      title: placeItem.name,
      animation: google.maps.Animation.DROP
    });

    placeItem.marker = marker;

    placeItem.marker.addListener('click', toggleBounce);

    function toggleBounce() {
      if (placeItem.marker.getAnimation() !== null) {
        placeItem.marker.setAnimation(null);
      } else {
        placeItem.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){ placeItem.marker.setAnimation(null); }, 2100);
      }
    }

    var windowNames = placeItem.name
    var windowAddresses = placeItem.address

    infoWindow = new google.maps.InfoWindow();



    google.maps.event.addListener(placeItem.marker, 'click', function() {
      ///////////////////////////////////////////////////////////////////


          var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + placeItem.name + 'format=json&callback=wikiCallback';

          $.ajax ({
            url: wikiUrl,
            dataType: "jsonp",
            success: function ( response ){
              var articleList = response[1];
              if (articleList > 0) {
                for (var i=0; i<articleList.length; i++) {
                  articleStr = articleList[i];
                  var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                  placeItem.marker.push('<li><a href="' + url + '">' + articleStr + '</a></li>');
                };

              } else {
                placeItem.marker.push('<p>No articles</p>');
              }
              var wikiRequestTimeout = setTimeout(function() {
                placeItem.marker.push("Failed to get Wikipedia response");
              }, 8000);
            }
          });

      ///////////////////////////////////////////////////////////////////////
      var contentString = '<div id="content">' + windowNames + '<p>' + windowAddresses + '</p>' + '</div>'

      console.log("clicked");
      infoWindow.setContent(contentString);
      infoWindow.open(map, this);
    });
  });

  self.markerTrigger = function(marker) {
        google.maps.event.trigger(this.marker, 'click');
  };

  self.query= ko.observable('');

  self.filteredPlaces = ko.computed(function(placeItem) {
    var filter = self.query().toLowerCase();
    if (!filter) {
      self.markerArray().forEach(function(placeItem) {
          placeItem.marker.setVisible(true);
        });
      return self.markerArray();
    } else {
        return ko.utils.arrayFilter(self.markerArray(), function(placeItem) {
          is_filtered = stringStartsWith(placeItem.name.toLowerCase(), filter);
           if (is_filtered) {
              placeItem.marker.setVisible(true);
              console.log("clicked");
              return is_filtered
            }
           else {
              placeItem.marker.setVisible(false);
              return is_filtered
            }
        });
      }
  }, self);

};

ko.applyBindings(new AppViewModel());

//https://developers.google.com/maps/documentation/javascript/reference referenced for map code
//https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple info window one
//http://you.arenot.me/2010/06/29/google-maps-api-v3-0-multiple-markers-multiple-infowindows/ infowindow marker to this
//http://opensoul.org/2011/06/23/live-search-with-knockoutjs/ list and filter list
//http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html filter list
//http://stackoverflow.com/questions/28042344/filter-using-knockoutjs stringStartsWith
//http://codepen.io/hubpork/pen/xriIz resize map
