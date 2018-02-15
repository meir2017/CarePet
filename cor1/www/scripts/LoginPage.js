


$(document).ready(function () { 
    $('#btn1').click(function () {  // לא בשימוש כרגע צריך להחליף ה  אידי

        if (localStorage.getItem("UserName") != null & localStorage.getItem("UserPass") != null)
        {
             $(".loader").css("display", "block");
            go_to_login(localStorage.getItem("UserName"), localStorage.getItem("UserPass"));
            $(".loader").css("display", "none");
        }
        //else
        //    $('#modalLogin').modal('toggle');

    })


    $("#FormSendEmail").submit(function (event) {
        $(".loader").css("display", "block");
        SendMail_ToUser($('#txtEmail').val(), "שחזור סיסמה", "test")
        $('#Forgot_modal').modal('hide')

        $(".loader").css("display", "none");

                    event.preventDefault();
                });
  
    $("#FormLogin").submit(function (event) {
            $(".loader").css("display", "block");
            go_to_login($('#txtName').val(), $('#txtPass').val())
            $(".loader").css("display", "none");
                    event.preventDefault();
                });



});