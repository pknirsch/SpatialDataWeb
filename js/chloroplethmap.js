// Initialize the map
const map = L.map('map').setView([58.373523, 26.716045], 12);

// Define the OpenStreetMap tile layer
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: 'OpenStreetMap contributors'
});
osm.addTo(map);

// Add geoJSON layer
async function addGeoJson(url) {
  const response = await fetch(url);
  const data = await response.json();

  L.choropleth(data, {
    valueProperty: 'TOWERS', // Feature attribute with quantity of cell towers
    scale: ['#f7fcf0', '#00441b'], // Colors of the scale (CSS color picker used here)
    steps: 5, // Quantity of ranges
    mode: 'q', // q for quantile, e for equidistant
    style: {
      color: '#fff',
      weight: 2,
      fillOpacity: 0.8
    },
    onEachFeature: function (feature, layer) {
      const districtName = feature.properties.NIMI; // Access the district name
      const towerCount = feature.properties.TOWERS; // Access the number of towers
      layer.bindPopup(`District: ${districtName}<br>Towers: ${towerCount}`);
    },
  }).addTo(map);
}

// Call the function to add GeoJSON data to the map
addGeoJson('geojson/tartu_city_districts_edu.geojson');
