
function formatData(dataToParse) {
    //console.log(dataToParse);
    var tabIntermediate = [];
    dataToParse.forEach(function (dateObject)
    {
        var date = dateObject["time"];
        //use library moment.js for data format
        var formattedDate = moment(date).format('YYYY MM DD');
        if (formattedDate !== 'Invalid date') {
            if (tabIntermediate[formattedDate] == null) {
                tabIntermediate[formattedDate] = 1;
            } else {
                tabIntermediate[formattedDate]++;
            }
        }
    }
    );
    var dataToReturn = [];

    for (var key in tabIntermediate) {
        //console.log("key " + key + " has value " + tabIntermediate[key]);
        dataToReturn.push({
            "x": key,
            "y": tabIntermediate[key]
        });
    }
    // console.log(JSON.parse(dataToReturn))
    return dataToReturn;

}

function loadGraph() {
    var jqxhr = $.getJSON("http://localhost/iot_back/index.php/api/messages", function (data) {

        //get date from HTTP GET Request
        var parsedData = formatData(data);

        //create a config for a chart
        var config = {
            type: 'line',
            data: {
                datasets: [{
                        label: "Number of messages for this day: ",
                        data: parsedData,
                        fill: false
                    }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                title: {
                    display: true,
                    text: "Messages by days",
                    unitStepSize: 1
                },
                scales: {
                    xAxes: [{
                            type: "time",
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Date'
                            }
                        }],
                    yAxes: [{
                            display: true,
                            scaleLabel: {
                                display: true,
                                labelString: 'Messages'
                            }, ticks: {
                                beginAtZero: true
                            }
                        }]
                }
            }
        };
        var ctx = document.getElementById('myChart');
        //create chart by using library Chart.js
        var myChart = new Chart(ctx, config);

        $("#myChart").onclick = function (evt) {
            var activePoints = myChart.getElementsAtEvent(evt);
            console.log("Canvas onclick ".activePoints);
            // => activePoints is an array of points on the canvas that are at the same position as the click event.
        };
    })
            .done(function () {
            })
            .fail(function () {
            })
            .always(function () {
                $("#gif_loading").hide();
            });


    // Set another completion function for the request above
    jqxhr.complete(function () {
    });
}
