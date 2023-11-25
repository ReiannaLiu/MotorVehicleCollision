//-----------------------Data Sources -----------------------------
var geoData = "static/data/nyc_geojson_by_zip_with_counts.json";
var geojson;

//-----------------------Map Creation -----------------------------
// Initialize the map to center on New York
var map = L.map('map').setView([40.7128, -74.0059], 11);

// Add a tile layer to the map
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors, © CARTO',
    maxZoom: 19
}).addTo(map);

//-----------------------Data Loading -----------------------------
/// Get the data with d3.
d3.json(geoData).then(function (data) {

    // Create a new choropleth layer.
    geojson = L.choropleth(data, {

        // Define which property in the features to use.
        valueProperty: "collision_count",

        // Set the color scale.
        scale: ["#ffffb2", "#b10026"],


        // The number of breaks in the step range
        steps: 8,

        // q for quartile, e for equidistant, k for k-means
        mode: "q",
        style: {
            // Border color
            color: "#fff",
            weight: 1,
            fillOpacity: 0.8
        },

        // Binding a popup to each layer
        onEachFeature: function (feature, layer) {
            var popupContent = `
            <div class="custom-popup">
                <h5>Zip Code: ${feature.properties.postalCode}</h5>
                <div>
                    <p>Number of Motor Collision Cases: ${feature.properties.collision_count}</p>
                </div> 
                <div class="popup-section">
                    <a href="/infographic/${feature.properties.postalCode}" stype="display:block;">
                    <img src="#"> 
                    </a>
                </div>
                <div class="popup-footer">
                    Click on the infographic to see more details. 
                </div>
            </div> 
            `;
            layer.bindPopup(popupContent, { className: 'black-popup' });
        }

    }).addTo(map);
});