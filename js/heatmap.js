// Initialize the map
const map = L.map('map').setView([58.373523, 26.716045], 12);

// Define the OpenStreetMap tile layer
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: 'OpenStreetMap contributors'
});
osm.addTo(map);


// Asynchronously load and add GeoJSON layer for cell towers, using clustering
async function addCelltowersGeoJson(url) {
  const response = await fetch(url);
  const data = await response.json();
}
addCelltowersGeoJson('geojson/tartu_city_celltowers_edu.geojson');




// Function to reset the map to default settings
function defaultMapSettings() {
  map.setView([58.373523, 26.716045], 12);
}
