// Initialize the map and set its view to the specified coordinates and zoom level
const map = L.map('map').setView([58.373523, 26.716045], 12);

// Define the OpenStreetMap tile layer and add it to the map
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
});
osm.addTo(map);

// Function to add GeoJSON data to the map as a choropleth layer
async function addGeoJson(url) {
  try {
    const response = await fetch(url); // Fetch the GeoJSON data from the specified URL
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json(); // Parse the JSON response

    // Add the GeoJSON data as a choropleth layer
    L.choropleth(data, {
      valueProperty: 'TOWERS', // Property to use for choropleth
      scale: ['#ffffff', '#ff9900'], // Color scale for the choropleth
      steps: 5, // Number of breaks or steps in the color scale
      mode: 'q', // q for quantile, e for equidistant
      style: {
        color: '#fff', // Border color of the polygons
        weight: 2, // Border weight of the polygons
        fillOpacity: 0.8, // Opacity of the fill color
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup('Value: ' + feature.properties.TOWERS); // Bind a popup showing the value of TOWERS
      },
    }).addTo(map); // Add the choropleth layer to the map
  } catch (error) {
    console.error('Error fetching or parsing GeoJSON data:', error); // Log any errors
  }
}

// Call the function to add GeoJSON data to the map
addGeoJson('geojson/tartu_city_districts_edu.geojson');
