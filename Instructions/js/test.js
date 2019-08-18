var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
var map = L.map("map-id", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: streetmap
});

var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
});
var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
};

  
// L.control.layers(baseMaps, {
//     collapsed: false
// }).addTo(map);
L.control.layers(baseMaps).addTo(map);

// var geojsonMarkerOptions = {
// 	radius: 8,
// 	fillColor: "#ff7800",
// 	color: "#000",
// 	weight: 1,
// 	opacity: 1,
// 	fillOpacity: 0.8
// };
function styleinfo(feature){
    return {
        radius : 10000
    };
}
var myStyle = {
	"color": "#ff7800",
	"weight": 5,
	"opacity": 0.65
};
d3.json(queryUrl, function(data) {
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            var mag = feature.properties.mag;
            function colorer(mag){
                switch(true) {
   
                    case mag > 5: return "#FF1919";
                    case mag > 4: return "#FF884D";
                    case mag > 3: return "#FFA64D";
                    case mag > 2: return "#FFFF4D";
                    case mag > 1: return "#A6FF4D";
                    case mag > 0: return "#6AFF4D";
                   
                    
                }}
            return L.circle(latlng, {radius : mag*10000, color : colorer(mag), fillOpacity: 0.5});
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.place +
            "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
        
        }

        
    }).addTo(map);
    // Once we get a response, send the data.features object to the createFeatures function

    var mag = feature.properties.mag;
    function colorer(mag){
        switch(true) {

            case mag > 5: return "#FF1919";
            case mag > 4: return "#FF884D";
            case mag > 3: return "#FFA64D";
            case mag > 2: return "#FFFF4D";
            case mag > 1: return "#A6FF4D";
            case mag > 0: return "#6AFF4D";
           
            
        }}
        
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

	var div = L.DomUtil.create('div', 'info legend'),
		grades = [0, 1, 2, 3, 4, 5],
        labels = [],
        from, to;

	// loop through our density intervals and generate a label with a colored square for each interval
	for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
          '<i style="background:' + getColor(from /*+ 1*/) + '">[color]</i> ' +
          from + (to ? '&ndash;' + to : '+'));
      }

      div.innerHTML = labels.join('<br>');
      return div;
    };


legend.addTo(map);

});
