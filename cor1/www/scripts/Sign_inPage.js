
MyTitel="Care Pet הרשמה ל"
myMsg = "<div style='background-color:lightskyblue;font-size:20px;font-family: David;color:coral;text-align:center' >תודה שנרשמתה לאפליקציה שלנו <br> CarePet</dv>";

$(document).ready(function () {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    $("#FormRegister").submit(function (event) {

        if ($('#StxtName').val().length <= 5)
        {
            $('#StxtName').attr('title', 'לפחות 6 תוים')
            $('#StxtName').tooltip('toggle')
        }
        else if (!validateEmail())
            $('#SֹtxtMail').tooltip('toggle')
        else if (!validatePhone())
            $('#SֹtxtPhone').tooltip('toggle')
        else if ($('#SֹtxtPass').val().length <= 5)
            $('#SֹtxtPass').tooltip('toggle')
        else if ($('#SֹtxtPass').val() != $('#SֹtxtConfirm').val())
            $('#SֹtxtConfirm').tooltip('toggle')
        else
            SiginUser()
        event.preventDefault();
    }); 


});


function validateEmail() {
    var email = document.getElementById('SֹtxtMail');
    var mailFormat = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (email.value == "" || !mailFormat.test(email.value))
        return false;
        return true
 
}

function validatePhone() {
    var phone = document.getElementById('SֹtxtPhone');
    var mailPhone = /^\d{2,3}-\d{6,7}$/;
    if (phone.value == "" || !mailPhone.test(phone.value))
       return false;  
       return true   
}


function SiginUser()
{
    $(".loader").css("display", "block");

    var UserSignIn =
        {
            name: $('#StxtName').val(),
            password: $('#SֹtxtPass').val(),
            mail: $('#SֹtxtMail').val(),
            phone: $('#SֹtxtPhone').val(),
            UserType: "User"
        };

    $.ajax({
        url: WebServiceURL + "/SignInUserUsingClass",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(UserSignIn),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            $(".loader").css("display", "none");// alert(formatErrorMessage(jqXHR, exception));
        },
        success: function (data) {
            if (data.d != null) {

                if (data.d!="2627")
                {
                    SendMail_ToUser($('#SֹtxtMail').val(), MyTitel, myMsg)
                    $(".loader").css("display", "none");
                    go_to_login($('#StxtName').val(), $('#SֹtxtPass').val()) // location = "MainPage.html";
                }
                else {
                    //$('#StxtName').attr('title', 'שם המשתמש כבר קיים ')
                    //$('#StxtName').tooltip('toggle')
                    $('#ErrorSignIn').modal('toggle')
                }
            }
            else {
                alert("ההרשמה נכשלה ")
            }
            $(".loader").css("display", "none");

        }
    });
}

//       var a = parseInt(data.d)
//if (data.d != null) {
//    var str2 = "2617";
//    var n = data.d.localeCompare(str2);
//    if (n == 0) {
//        SendMail_ToUser($('#SֹtxtMail').val(), MyTitel, myMsg)
//        $(".loader").css("display", "none");
//        go_to_login($('#StxtName').val(), $('#SֹtxtPass').val()) // location = "MainPage.html";
//    }
//    else {
//        $('#StxtName').attr('title', 'שם המשתמש כבר קיים ')
//        $('#StxtName').tooltip('toggle')

//    }
//}
//else {
//    $(".loader").css("display", "none");
//    $('#ErrorSignIn').modal('toggle')
//}





