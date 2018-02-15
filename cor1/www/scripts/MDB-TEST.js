
$(document).ready(function () {

    if (ifSleep)
        Mywait();
    else
        alert("page rady")

    alert("page rady1")

  //  send()


    /////


});
$('#btn1').click(function () {
    send();
});
$('#btn2').click(function () {
    send2();
});
function send() {
    alert("send")
    var emilToSend = {
        _email: "r200"
    }

    alert(emilToSend._email)

    $.ajax({
        url: WebServiceURL + "/ForgotPassword2",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(emilToSend),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            alert(formatErrorMessage(jqXHR, exception));
        },
        success: function (data) {// מציג על המפה את העסק 
            alert(data.d);
            alert("send    success")
            //alert("ssuccess-" + S)

        }
    });
}


function send2() {
    alert("send2")

    var emilToSend =
        {
            _email: "connieks1417@gmail.com"
        }

    $.ajax({
        url: WebServiceURL + "/SendMail",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(emilToSend),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            alert(formatErrorMessage(jqXHR, exception));
        },
        async: false,
        success: function (data) {
            alert("send2    success")

            alert(data.d);

        }
    });
}

$('#btn4').click(function () {
    var _email = window.prompt("Write Your Email Here", "");
    var emilToSend =
        {
            _email: _email
        }
    //alert(_email)
   
    //_email = "";
    //alert(emilToSend._email)
    $.ajax({
        url: WebServiceURL + "/SendMail",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(emilToSend),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            alert(formatErrorMessage(jqXHR, exception));
        },
        success: function (data) {

            alert(data.d);

        }
    });
});

$('#btn3').unbind('click').click(function () {
    alert("send3")
    var emilToSend =
        {
            _email: "meirsibhat@gmail.com"
        }

    $.ajax({
        url: WebServiceURL + "/SendMail",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(emilToSend),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            alert(formatErrorMessage(jqXHR, exception));
        },
        async: false,
        success: function (data) {
            alert("send3    success")

            alert(data.d);

        }
    });
})



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function Mywait() {

    await sleep(sleppTime);
    // send();
}
