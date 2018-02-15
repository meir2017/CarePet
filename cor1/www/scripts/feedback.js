

$(document).on("pagecreate", "#feedback-page", function () {

    $("#feedback").submit(function (event) {
       // $(".loader").css("display", "block");
        send_feedback()
        event.preventDefault();
    });

    function send_feedback() {
        var feedbackUser =
            {
                feed1: $('#feed1').val(),
                feed2: $('#feed2').val(),
                feed3: $('#feed3').val(),
                feed4: $('#feed4').val(),
                feed5: $('#feed5').val(),
                feed6: $('#feed6').val()
            };

        $.ajax({
            url: WebServiceURL + "/feedback",
            dataType: "json",
            type: "POST", //use only POST!
            data: JSON.stringify(feedbackUser),
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, exception) {
                $(".loader").css("display", "none");  // alert(formatErrorMessage(jqXHR, exception));
            },
            success: function (data) {
                $(".loader").css("display", "none");
                location = "MainPage.html";
                if (data.d != null) {
                    alert(data.d)
                }
                else {
                    $('#form_feed').modal('toggle')

                }
            }
        });
    }

    $('#back').click(function () {
        location = "MainPage.html";
    });
});


