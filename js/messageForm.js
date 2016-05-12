$(document).ready(function () {
    $("#button_send").click(function () {

        //get value for text field
        var messageToSend = $('#message_text').val();

        console.log(messageToSend);
        //prepare date to JSON format
        var jsonDataToSend = {message: messageToSend};

        //make POST request 
        var jqxhr = $.post("http://localhost/iot_back/index.php/api/message", jsonDataToSend, function () {
        })
                .done(function (data) {
                    console.log(data);
                    var status = data.status;

                    if (status === true) {
                        $("p").text("Message created and sent to Arduino").css('color', 'green');
                    } else {
                        $("p").text("Message created but no sent to Arduino").css('color', 'orange');;
                    }

                    //reload graph
                    loadGraph();
                })
                .fail(function () {
                    $("p").text("An error was occured");
                })
                .always(function () {
                });
    });
});