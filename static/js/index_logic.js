zipcodeData = "static/data/nyc_geojson_by_zip.geojson"

// Initialize the map to center on New York
var map = L.map('map').setView([40.7128, -74.0059], 13);

// Add a tile layer to the map
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors, © CARTO',
    maxZoom: 19
}).addTo(map);

L.geoJson(zipcodeData).addTo(map);