//-----------------------Data Sources -----------------------------
var geoData = "static/data/nyc_geojson_by_zip_with_counts.json";
var infoData = "http://127.0.0.1:5000/api/v1.0/motor_collision";
var geojson;
var statistics = "http://127.0.0.1:5000/api/v1.0/motor_statistics";

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
                    <img src="static/images/info_preview.png"> 
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

Promise.all([
    d3.json("http://127.0.0.1:5000/api/v1.0/motor_collision/by_month"),
    d3.json("http://127.0.0.1:5000/api/v1.0/motor_collision/monthly_average")
]).then(function (data) {
    // Process the monthly accidents data into the format Plotly expects
    const monthlyAccidentData = Object.keys(data[0]).map(month => ({
        x: month, // Month number as string
        y: data[0][month] // Number of accidents
    }));

    // Sort the data by month number
    monthlyAccidentData.sort((a, b) => parseInt(a.x) - parseInt(b.x));

    // Get the monthly average data
    const monthlyAverageData = data[1];

    // Prepare the trace for the monthly accident data
    const accidentTrace = {
        x: monthlyAccidentData.map(d => d.x), // Month numbers
        y: monthlyAccidentData.map(d => d.y), // Accident counts
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Monthly Accidents',
        marker: { color: 'white' }
    };

    // Prepare the trace for the average line
    const averageTrace = {
        x: ["1", "12"], // Start from month 1 to 12
        y: [monthlyAverageData, monthlyAverageData], // Same average value for all months
        type: 'scatter',
        mode: 'lines',
        name: 'Monthly Average',
        line: {
            color: 'red',
            dash: 'dash'
        }
    };

    // Combine the traces
    const dataTraces = [accidentTrace, averageTrace];

    // Define the layout with dark theme
    const layout = {
        title: {
            text: 'Crash Count Over Time',
            font: {
                color: 'white'
            }
        },
        xaxis: {
            title: 'Month',
            tickvals: monthlyAccidentData.map(d => d.x),
            ticktext: monthlyAccidentData.map(d => new Date(2000, d.x - 1).toLocaleString('default', { month: 'short' })), // Convert month number to short name
            showgrid: false,
            zeroline: false,
            color: 'white'
        },
        yaxis: {
            title: 'Number of Crashes',
            color: 'white',
            showgrid: false,
            zeroline: false
        },
        legend: {
            x: 1.2,
            y: 1,
            xanchor: 'right',
            yanchor: 'top',
            bgcolor: 'rgba(0,0,0,0)',
            bordercolor: 'white',
            font: {
                color: 'white'
            },
            font: {
                color: 'white'
            },
            title: {
                text: 'Legend',
                font: {
                    color: 'white'
                }
            }
        },
        paper_bgcolor: 'black', // Background color outside the plotting area
        plot_bgcolor: 'black', // Background color of the plotting area
        margin: { // Adjust margins to fit the container
            l: 70,
            r: 40,
            b: 150,
            t: 60,
            pad: 4
        }
    };

    const config = {
        displayModeBar: false,
        responsive: true
    };

    // Create the Plotly chart with the updated layout and configuration
    Plotly.newPlot('by_month_chart', dataTraces, layout, config);

});


//-----------------------Table Appending -----------------------------

d3.json(statistics).then(function (data) {
    const tableRow = d3.select("#info-table tbody").append("tr");
    tableRow.append("td").text(data[0].number_of_accidents);
    tableRow.append("td").text(data[0].number_of_injuries);
    tableRow.append("td").text(data[0].number_of_deaths);
});