//-----------------------Data Sources -----------------------------
var infoData = "http://127.0.0.1:5000/api/v1.0/motor_collision/" + zipcode;
var boxData = "http://127.0.0.1:5000/api/v1.0/weather_collision/" + zipcode;
var infojson;

//-----------------------Data Loading -----------------------------
d3.json(infoData).then(function (data) {
    infojson = data;

    document.getElementById("zipcode").innerHTML = zipcode;

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

    let severity = {};

    data.forEach(item => {
        injuredSum.cyclist += item.number_of_cyclist_injured;
        injuredSum.motorist += item.number_of_motorist_injured;
        injuredSum.pedestrian += item.number_of_pedestrians_injured;
        injuredSum.persons += item.number_of_persons_injured;

        killedSum.cyclist += item.number_of_cyclist_killed;
        killedSum.motorist += item.number_of_motorist_killed;
        killedSum.pedestrian += item.number_of_pedestrians_killed;
        killedSum.persons += item.number_of_persons_killed;

        if (item.contributing_factor in contributingFactor) {
            contributingFactor[item.contributing_factor] += 1;
        } else {
            contributingFactor[item.contributing_factor] = 1;
        }

        if (item.severity_of_accident in severity) {
            severity[item.severity_of_accident] += 1;
        } else {
            severity[item.severity_of_accident] = 1;
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
                'rgba(255, 159, 64, 0.9)', // Brighter Orange
                'rgba(75, 192, 192, 0.9)',  // Brighter Teal
                'rgba(153, 102, 255, 0.9)', // Brighter Purple
                'rgba(255, 99, 132, 0.9)'   // Brighter Pink
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
                        min: 0,
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
                    display: false,
                }
            }
        }
    });

    // Create the pie chart
    var contributingFactorPie = document.getElementById('contributingFactorPie').getContext('2d');
    var contributingFactorPieChart = new Chart(contributingFactorPie, {
        type: 'pie',
        data: {
            labels: Object.keys(contributingFactor).slice(0, 8),
            datasets: [{
                data: Object.values(contributingFactor).slice(0, 8),
                backgroundColor: [
                    'rgba(255, 159, 64, 0.9)', // Brighter Orange
                    'rgba(75, 192, 192, 0.9)',  // Brighter Teal
                    'rgba(153, 102, 255, 0.9)', // Brighter Purple
                    'rgba(255, 99, 132, 0.9)',  // Brighter Pink
                    'rgba(54, 162, 235, 0.9)',  // Brighter Blue
                    'rgba(255, 206, 86, 0.9)',  // Brighter Yellow
                    'rgba(231,233,237, 0.9)',   // Brighter Light Grey
                    'rgba(205, 220, 57, 0.9)'   // Bright Lime Green
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

    var severityTypePie = document.getElementById('severityTypePie').getContext('2d');
    var severityPieChart = new Chart(severityTypePie, {
        type: 'pie',
        data: {
            labels: Object.keys(severity),
            datasets: [{
                data: Object.values(severity),
                backgroundColor: [
                    'rgba(255, 159, 64, 0.9)', // Brighter Orange
                    'rgba(75, 192, 192, 0.9)',  // Brighter Teal
                    'rgba(153, 102, 255, 0.9)', // Brighter Purple
                    'rgba(255, 99, 132, 0.9)',  // Brighter Pink
                    'rgba(54, 162, 235, 0.9)',  // Brighter Blue
                    'rgba(255, 206, 86, 0.9)',  // Brighter Yellow
                    'rgba(231,233,237, 0.9)',   // Brighter Light Grey
                    'rgba(205, 220, 57, 0.9)'   // Bright Lime Green
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
        x: Object.keys(jsonData),
        y: Object.values(jsonData),
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

    if (aggregateTime === 'hour') {
        data = [{
            x: Object.keys(hour_json), // Assuming these are hours (0-23)
            y: Object.values(hour_json),
            type: "line"
        }];
    }
    else if (aggregateTime === 'weekday') {
        data = [{
            x: Object.keys(wekday_json).map(d => parseInt(d)), // Assuming these are weekday numbers (0-6)
            y: Object.values(wekday_json),
            type: "line"
        }];
    }
    else if (aggregateTime === 'month') {
        data = [{
            x: Object.keys(month_json).map(d => parseInt(d)), // Assuming these are month numbers (1-12)
            y: Object.values(month_json),
            type: "line"
        }];
    }

    if (data.length) {
        updatePlotly(data, aggregateTime);
    }
});

function updatePlotly(newData, aggregateTime) {
    let xAxisLabels;
    if (aggregateTime === 'weekday') {
        xAxisLabels = newData[0].x.map(x => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][x]);
    } else if (aggregateTime === 'month') {
        xAxisLabels = newData[0].x.map(x => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][x - 1]);
    } else {
        xAxisLabels = newData[0].x;
    }

    Plotly.restyle("lineChart", {
        x: [xAxisLabels],
        y: [newData[0].y],
        'text': newData[0].x.map((x, i) => {
            let label = aggregateTime === 'weekday' ? ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][x] :
                aggregateTime === 'month' ? ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][x - 1] :
                    x;
        })
    }, [0]);
}

// Call init function for hour data initially
d3.json(hour_data).then(function (data) {
    hour_json = data;
    if (Object.keys(hour_json).length === 0) {
        d3.select('#lineChart').html("No data available for this zipcode");
    } else {
        updatePlotly([{
            x: Object.keys(hour_json),
            y: Object.values(hour_json),
            type: "line"
        }], 'hour');
    }
});

d3.json(boxData).then(function (data) {
    var colors = ['rgba(255, 159, 64, 0.9)', 'rgba(75, 192, 192, 0.9)', 'rgba(153, 102, 255, 0.9)', 'rgba(255, 99, 132, 0.9)'];
    var boxplotData = Object.keys(data).map(function (key, index) {
        return {
            x: data[key],
            type: 'box',
            name: key,
            marker: {
                color: colors[index % colors.length]
            },
            line: {
                color: colors[index % colors.length]
            },
            width: 0.5
        };
    });

    var layout = {
        paper_bgcolor: 'black',
        plot_bgcolor: 'black',
        yaxis: {
            zeroline: false,
            color: 'white'
        },
        xaxis: {
            color: 'white'
        },
        boxmode: 'group',
        showlegend: false,
        margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 50,
            pad: 4
        }
    };

    Plotly.newPlot('boxplot', boxplotData, layout);
}).catch(function (error) {
    console.error('Error fetching data:', error);
});
