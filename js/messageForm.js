$("#button_send").click(function () {

    //get value for text field
    var messageToSend = $('#message_text').val();
    //prepare date to JSON format
    var jsonDataToSend = {message: messageToSend};

    //make POST request 
    var jqxhr = $.post("http://localhost/iot_back/index.php/api/message", jsonDataToSend, function () {
    })
            .done(function (data) {

                $("p").text(data);

            })
            .fail(function () {
                $("p").text("An error was occured");
            })
            .always(function () {
            });
});
