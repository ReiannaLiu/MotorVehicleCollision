//-----------------------Data Sources -----------------------------
var infoData = "http://127.0.0.1:5000/api/v1.0/motor_collision/" + zipcode;
var infojson;

//-----------------------Data Loading -----------------------------
d3.json(infoData).then(function (data) {
    infojson = data;

    document.getElementById("zipcode").innerHTML = zipcode;
    document.getElementById("borough").innerHTML = infojson[0].borough;
    document.getElementById("county").innerHTML = infojson[0].county;

    // Process data to get the sums of each category
    let injuredSum = {
        "cyclist": 0,
        "motorist": 0,
        "pedestrian": 0,
        "persons": 0
    };

    let killedSum = {
        "cyclist": 0,
        "motorist": 0,
        "pedestrian": 0,
        "persons": 0
    };

    let contributingFactor = {};

    let vehicleType = {};

    data.forEach(item => {
        injuredSum.cyclist += item.number_of_cyclist_injured;
        injuredSum.motorist += item.number_of_motorist_injured;
        injuredSum.pedestrian += item.number_of_pedestrians_injured;
        injuredSum.persons += item.number_of_persons_injured;

        killedSum.cyclist += item.number_of_cyclist_killed;
        killedSum.motorist += item.number_of_motorist_killed;
        killedSum.pedestrian += item.number_of_pedestrians_killed;
        killedSum.persons += item.number_of_persons_killed;

        if (item.contributing_factor_vehicle_1 in contributingFactor) {
            contributingFactor[item.contributing_factor_vehicle_1] += 1;
        } else {
            contributingFactor[item.contributing_factor_vehicle_1] = 1;
        }

        if (item.vehicle_type_code_1 in vehicleType) {
            vehicleType[item.vehicle_type_code_1] += 1;
        } else {
            vehicleType[item.vehicle_type_code_1] = 1;
        }
    })

    //-----------------------Infographic Creation -----------------------------
    // Create the bar chart
    const chartData = {
        labels: ['Pedestrian', 'Cyclist', 'Motorist', 'Persons'],
        datasets: [{
            label: 'Injured',
            data: [injuredSum.pedestrian, injuredSum.cyclist, injuredSum.motorist, injuredSum.persons],
            backgroundColor: [
                'rgba(255, 159, 64, 0.9)', // Brighter Orange
                'rgba(75, 192, 192, 0.9)',  // Brighter Teal
                'rgba(153, 102, 255, 0.9)', // Brighter Purple
                'rgba(255, 99, 132, 0.9)'   // Brighter Pink
            ]
        }, {
            label: 'Killed',
            data: [killedSum.pedestrian, killedSum.cyclist, killedSum.motorist, killedSum.persons],
            backgroundColor: [
                'rgba(54, 162, 235, 0.9)',  // Brighter Blue
                'rgba(255, 206, 86, 0.9)',  // Brighter Yellow
                'rgba(231,233,237, 0.9)',   // Brighter Light Grey
                'rgba(255, 159, 64, 0.9)'   // Brighter Orange
            ]
        }]
    };

    var bar = document.getElementById('bar').getContext('2d');
    var barChart = new Chart(bar, {
        type: 'bar',
        data: chartData,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1,
                        color: 'rgba(211, 211, 211, 1)'
                    }
                },
                x: {
                    ticks: {
                        color: 'rgba(211, 211, 211, 1)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'rgba(211, 211, 211, 1)'
                    }
                }
            }
        }
    });

    // Create the pie chart
    var contributingFactorPie = document.getElementById('contributingFactorPie').getContext('2d');
    var contributingFactorPieChart = new Chart(contributingFactorPie, {
        type: 'pie',
        data: {
            labels: Object.keys(contributingFactor),
            datasets: [{
                data: Object.values(contributingFactor),
                backgroundColor: [
                    'rgba(255, 159, 64, 0.9)', // Brighter Orange
                    'rgba(75, 192, 192, 0.9)',  // Brighter Teal
                    'rgba(153, 102, 255, 0.9)', // Brighter Purple
                    'rgba(255, 99, 132, 0.9)',  // Brighter Pink
                    'rgba(54, 162, 235, 0.9)',  // Brighter Blue
                    'rgba(255, 206, 86, 0.9)',  // Brighter Yellow
                    'rgba(231,233,237, 0.9)',   // Brighter Light Grey
                    'rgba(255, 159, 64, 0.9)'   // Brighter Orange
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        title: function () {
                            // Return an empty string so no title is displayed
                            return '';
                        },
                        label: function (context) {
                            var label = context.label || '';
                            if (context.parsed !== null) {
                                label += ': ' + new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(context.parsed / context.dataset.data.reduce((a, b) => a + b, 0));
                            }
                            return label;
                        }
                    }
                },
                legend: {
                    display: false
                }
            }
        }
    });

    var vehicleTypePie = document.getElementById('vehicleTypePie').getContext('2d');
    var vehicleTypePieChart = new Chart(vehicleTypePie, {
        type: 'pie',
        data: {
            labels: Object.keys(vehicleType),
            datasets: [{
                data: Object.values(vehicleType),
                backgroundColor: [
                    'rgba(255, 159, 64, 0.9)', // Brighter Orange
                    'rgba(75, 192, 192, 0.9)',  // Brighter Teal
                    'rgba(153, 102, 255, 0.9)', // Brighter Purple
                    'rgba(255, 99, 132, 0.9)',  // Brighter Pink
                    'rgba(54, 162, 235, 0.9)',  // Brighter Blue
                    'rgba(255, 206, 86, 0.9)',  // Brighter Yellow
                    'rgba(231,233,237, 0.9)',   // Brighter Light Grey
                    'rgba(255, 159, 64, 0.9)'   // Brighter Orange
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                tooltip: {
                    callbacks: {
                        title: function () {
                            // Return an empty string so no title is displayed
                            return '';
                        },
                        label: function (context) {
                            var label = context.label || '';
                            if (context.parsed !== null) {
                                label += ': ' + new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2 }).format(context.parsed / context.dataset.data.reduce((a, b) => a + b, 0));
                            }
                            return label;
                        }
                    }
                },
                legend: {
                    display: false
                }
            }
        }
    });
});

// Create the line chart
var hour_data = "http://127.0.0.1:5000/api/v1.0/motor_collision/" + zipcode + "/by_hour";
var hour_json;

d3.json(hour_data).then(function (data) {
    hour_json = data;
    console.log(hour_json);
    if (Object.keys(hour_json).length == 0) {
        // no charts available
        d3.select('#lineChart').innerHTML = "No data available for this zipcode";
    }
    else {
        init(hour_json, 'hour');
    }
});

var wekday_data = "http://127.0.0.1:5000/api/v1.0/motor_collision/" + zipcode + "/by_weekday";
var wekday_json;

d3.json(wekday_data).then(function (data) {
    wekday_json = data;
    if (Object.keys(wekday_json).length === 0) {
        d3.select('#lineChart').innerHTML = "No data available for this zipcode";
    }
});

var month_data = "http://127.0.0.1:5000/api/v1.0/motor_collision/" + zipcode + "/by_month";
var month_json;

d3.json(month_data).then(function (data) {
    month_json = data;
    if (Object.keys(month_json).length === 0) {
        d3.select('#lineChart').innerHTML = "No data available for this zipcode";
    }
});

function init(jsonData, timeFrame) {
    let data = [{
        x: Object.keys(hour_json),
        y: Object.values(hour_json),
        type: "line"
    }];

    let layout = {
        autosize: true,
        margin: { t: 0 },
        paper_bgcolor: 'black',
        plot_bgcolor: 'black',
        font: {
            color: '#ffffff'
        },
        xaxis: {
            gridcolor: '#444',
            tickcolor: '#fff'
        },
        yaxis: {
            gridcolor: '#444',
            tickcolor: '#fff'
        }
    };

    Plotly.newPlot("lineChart", data, layout);
}

// On change to the DOM, call getData()
d3.selectAll('input[name="aggregateTime"]').on("change", function () {
    let aggregateTime = d3.select('input[name="aggregateTime"]:checked').property("value");
    let data = [];

    if (aggregateTime == 'hour') {
        data = [{
            x: Object.keys(hour_json),
            y: Object.values(hour_json),
            type: "line"
        }];
    }
    else if (aggregateTime == 'weekday') {
        data = [{
            x: Object.keys(wekday_json),
            y: Object.values(wekday_json),
            type: "line"
        }];
    }
    else if (aggregateTime == 'month') {
        data = [{
            x: Object.keys(month_json),
            y: Object.values(month_json),
            type: "line"
        }];
    }

    if (data) {
        updatePlotly(data);
    }
});

function updatePlotly(newData) {
    Plotly.restyle("lineChart", "x", [newData[0].x]);
    Plotly.restyle("lineChart", "y", [newData[0].y]);
}