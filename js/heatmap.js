// Initialize the map
const map = L.map('map').setView([58.373523, 26.716045], 12);

// Define the OpenStreetMap tile layer
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: 'OpenStreetMap contributors'
});
osm.addTo(map);


async function addCelltowersHeatmap(url) {
  const response = await fetch(url);
  const data = await response.json();
  const heatPoints = [];

  // Extract coordinates and optionally an intensity value from the GeoJSON features
  data.features.forEach(feature => {
      const coords = feature.geometry.coordinates;
      // Assuming the intensity is not provided, we default it to 1. Adjust as necessary.
      const intensity = 1; 
      // GeoJSON coordinates are [longitude, latitude]
      heatPoints.push([coords[1], coords[0], intensity]);
  });


  // Create and add the heatmap layer
  const heatLayer = L.heatLayer(heatPoints, {
    radius: 10,      // Set the radius of each "heat" point
    blur: 15,        // Set the blur size
    maxZoom: 17,     // Set the maximum zoom level for scaling the heat radius
    gradient: {0.4: 'blue', 0.6: 'lime', 0.8: 'yellow', 1: 'red'} // Customize color gradient
  }).addTo(map);
}

// Call the function with the URL to your GeoJSON file
addCelltowersHeatmap('geojson/tartu_city_celltowers_edu.geojson');








// Function to reset the map to default settings
function defaultMapSettings() {
  map.setView([58.373523, 26.716045], 12);
}
