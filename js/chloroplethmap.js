// Initialize the map
const map = L.map('map').setView([58.373523, 26.716045], 12);

// Define the OpenStreetMap tile layer
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: 'OpenStreetMap contributors'
});
osm.addTo(map);

addGeoJson('geojson/tartu_city_districts_edu.geojson')
// add geoJSON layer
async function addGeoJson(url) {
const response = await fetch(url)
const data = await response.json()
L.choropleth(data, {
valueProperty: 'TOWERS',
scale: ['#ccffff', '#003366'],
steps: 5,
mode: 'q', // q for quantile, e for equidistant
style: {
color: '#fff',
weight: 2,
fillOpacity: 0.8,
},
onEachFeature: function (feature, layer) {
layer.bindPopup('District: ' + feature.properties.NIMI + '<br>Cell Towers: ' + feature.properties.TOWERS)
},
}).addTo(map)
}
