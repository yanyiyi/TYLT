function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
};
var gmarkers = [];
var markers = [];
var gmarkersTop = [];
var markersTop = [];
var markersUrl = [];
var markersUrlTop = [];
var filterSwitch = [1, 1, 1, 1, 1, 1];

function initMap() {
    var LTs = [];
    var imgLTtype = ['', './img/icon_blue.png', './img/icon_lightblue.png', './img/icon_yellow.png', './img/icon_red.png', './img/icon_lime.png'];
    $.getJSON('https://spreadsheets.google.com/feeds/list/1RMtRyWF_2L6pRJNztr7TIgNMikpJtV13dPCtLWdu38g/1/public/values?alt=json', function (dataLog) {
            var ltype = GetURLParameter("LTType");

            //            console.log("gJson");
            var dataAmount = dataLog.feed.entry.length;
            console.log(dataAmount);
            for (var i = 0; i < dataAmount; i++) {
                if (i == dataAmount - 1) $(".LTsSet:first").remove();
                var aZ = dataLog.feed.entry[i].gsx$z.$t;
                var aName = dataLog.feed.entry[i].gsx$LTname.$t;
                var aLatitude = dataLog.feed.entry[i].gsx$lati.$t;
                var aLongtitude = dataLog.feed.entry[i].gsx$longi.$t;
                var aLTtype = dataLog.feed.entry[i].gsx$LTtype.$t;
                var aWhere = dataLog.feed.entry[i].gsx$wherecome.$t;
                var aWhen = dataLog.feed.entry[i].gsx$whencome.$t;
                var aI = i + 1;
                var avatarImg = "./img/avatar/" + aI + ".png";
                //                LTs[i] = [aName, aLatitude, aLongtitude, aLTtype, aZ];
                //                console.log(LTs[i]);

                if (ltype == aLTtype || ltype == null) {
                    $(".LTsSet:first").clone().appendTo("#LTList");
                    $(".LTsSet:last").attr("href", "./LT.html?LTID=" + aZ);
                    $(".LTsSet:last .liName").text(aName);
                    $(".LTsSet:last .liImg").attr("src", avatarImg);
                    $(".LTsSet:last .tagSet").html(aWhen + "  " + aWhere + "<br/>");
                    if (aLTtype == 1) $(".LTsSet:last .tagSet").append("<img src='./img/mark_1.png'/>清代時期");
                    if (aLTtype == 2) $(".LTsSet:last .tagSet").append("<img src='./img/mark_2.png'/>日治時期");
                    if (aLTtype == 3) $(".LTsSet:last .tagSet").append("<img src='./img/mark_3.png'/>國民政府來台");
                    if (aLTtype == 4) $(".LTsSet:last .tagSet").append("<img src='./img/mark_4.png'/>城市蓬勃發展");
                    if (aLTtype == 5) $(".LTsSet:last .tagSet").append("<img src='./img/mark_5.png'/>城市多元蛻變");
                }

                var marker = new google.maps.Marker({
                    url: './LT.html?LTID=' + aZ,
                    position: {
                        lat: parseFloat(aLatitude),
                        lng: parseFloat(aLongtitude)
                    },
                    map: map,
                    title: aName,
                    icon: {
                        url: imgLTtype[aLTtype],
                        //url: './img/avatar/' + aZ + '.png',
                        scaledSize: new google.maps.Size(70, 100)
                    },

                });
                var markerTop = new google.maps.Marker({
                    url: './LT.html?LTID=' + aZ,
                    position: {
                        lat: parseFloat(aLatitude),
                        lng: parseFloat(aLongtitude)
                    },
                    map: map,
                    title: aName,
                    icon: {
                        //url: imgLTtype[aLTtype],
                        url: './img/avatar_circle/' + aZ + '.png',
                        scaledSize: new google.maps.Size(52, 52),
                        anchor: new google.maps.Point(26, 95),
                    },

                });
                //                marker2.bindTo("position", marker);
                markers.push(aLTtype);
                gmarkers.push(marker);
                markersTop.push(aLTtype);
                gmarkersTop.push(markerTop);
                markersUrl.push(aZ);
                markersUrlTop.push(aZ);

                marker.addListener('click', function () {
                    location.href = this.url;
                });
                markerTop.addListener('click', function () {
                    location.href = this.url;
                });
            } //end for
            checkLTType();
        } //end function data
    ); //end get JSON

    var myLatLng = {
        lat: 24.9947383,
        lng: 121.1893604
    };
    //    var LTs = [
    //        ['肉圓', 24.9947383, 121.1893604, '../img/icon_lightblue.png'],
    //        ['肉圓2', 24.965992, 121.220625, '../img/icon_blue.png'],
    //        ['肉圓3', 24.960049, 121.225325, '../img/icon_lime.png'],
    //        ['肉圓4', 24.957740, 121.231640, '../img/icon_red.png'],
    //        ['肉圓5', 24.954472, 121.235953, '../img/icon_yellow.png']
    //    ];

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 24.8651006,
            lng: 121.2115186
        },
        zoom: 17,
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#0b4213"
      }
    ]
  },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#8ec3b9"
      }
    ]
  },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1a3646"
      }
    ]
  },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "off"
      }
    ]
  },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#4b6878"
      }
    ]
  },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#64779e"
      }
    ]
  },
            {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#4b6878"
      }
    ]
  },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#334e87"
      }
    ]
  },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#023e58"
      }
    ]
  },
            {
                "featureType": "poi",
                "stylers": [
                    {
                        "visibility": "off"
      }
    ]
  },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#283d6a"
      }
    ]
  },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#6f9ba5"
      }
    ]
  },
            {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1d2c4d"
      }
    ]
  },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#023e58"
      }
    ]
  },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#3C7680"
      }
    ]
  },
            {
                "featureType": "road",
                "stylers": [
                    {
                        "weight": 3.5
      }
    ]
  },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#24602b"
      }
    ]
  },
            {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
      }
    ]
  },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9bcea1"
      }
    ]
  },
            {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1d2c4d"
      },
                    {
                        "visibility": "off"
      }
    ]
  },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "weight": 2.5
      }
    ]
  },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#b0d5ce"
      }
    ]
  },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#023e58"
      }
    ]
  },
            {
                "featureType": "road.local",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "weight": 2
      }
    ]
  },
            {
                "featureType": "transit",
                "stylers": [
                    {
                        "visibility": "off"
      }
    ]
  },
            {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#98a5be"
      }
    ]
  },
            {
                "featureType": "transit",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1d2c4d"
      }
    ]
  },
            {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#283d6a"
      }
    ]
  },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#3a4762"
      }
    ]
  },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#4195bf"
      }
    ]
  },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#4e6d70"
      }
    ]
  }
]
    });
}

function switchFilter(ind) {
    filterSwitch[ind] *= -1;
    for (i = 0; i < markers.length; i++) {
        if (filterSwitch[ind] < 0) {
            if (markers[i] == ind) gmarkers[i].setVisible(false);
            if (markersTop[i] == ind) gmarkersTop[i].setVisible(false);
            $("#navBar a:nth-child(" + ind + ")").addClass("switchOff");
        } else {
            if (markers[i] == ind) gmarkers[i].setVisible(true);
            if (markersTop[i] == ind) gmarkersTop[i].setVisible(true);
            $("#navBar a:nth-child(" + ind + ")").removeClass("switchOff");
        }
    }
}

function checkLTType() {
    var litype = GetURLParameter("LTType");
    if (litype != null) {
        console.log(litype);
        for (var z = 1; z <= 5; z++) {
            if (z != litype) {
                switchFilter(z);
            }
        }
    }
}
