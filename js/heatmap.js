// Initialize the map
const map = L.map('map').setView([58.373523, 26.716045], 12);

// Define the OpenStreetMap tile layer
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: 'OpenStreetMap contributors'
});
osm.addTo(map);

// Asynchronously load and add GeoJSON layer for cell towers, using heatmap
async function addCelltowersHeatmap(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const heatPoints = [];

    // Extract coordinates and use the 'range' property as the intensity value from the GeoJSON features
    data.features.forEach(feature => {
      const coords = feature.geometry.coordinates;
      const intensity = feature.properties.range; // Using 'range' as the intensity
      // GeoJSON coordinates are [longitude, latitude]
      heatPoints.push([coords[1], coords[0], intensity]);
    });

    // Create and add the heatmap layer
    const heatLayer = L.heatLayer(heatPoints, {
      radius: 10,      // Adjust the radius of each "heat" point
      blur: 15,        // Adjust the blur size
      maxZoom: 17,     // Set the maximum zoom level for scaling the heat radius
      gradient: {0.4: 'blue', 0.6: 'lime', 0.8: 'yellow', 1: 'red'} // Customize color gradient
    }).addTo(map);
  } catch (error) {
    console.error("Failed to load or process GeoJSON data:", error);
  }
}

// Call the function with the URL to your GeoJSON file
addCelltowersHeatmap('geojson/tartu_city_celltowers_edu.geojson');






// Function to reset the map to default settings
function defaultMapSettings() {
  map.setView([58.373523, 26.716045], 12);
}
