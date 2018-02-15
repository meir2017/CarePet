
userPas = localStorage.getItem("UserPass")
$(document).ready(function () {

    $("#editMail").val(localStorage.getItem("UserMail"))
    $("#editPhone").val(localStorage.getItem("UserPhone"))

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

    $("#myEmail").submit(function (event) {
    
        if (!validateEmail())
            $('#editMail').tooltip('toggle')   
        else
        EditProfileUser("UserMail", $("#editMail").val())
        event.preventDefault(); editPhone
    });

    $("#myPhone").submit(function (event) {
        if (!validatePhone())
            $('#editPhone').tooltip('toggle')
        else
        EditProfileUser("UserPhone", $("#editPhone").val())
        event.preventDefault();
    });

    $("#myPass").submit(function (event) {
        if ($("#pass1").val() == userPas &  $("#pass2").val() == $("#pass3").val() )
        {
            EditProfileUser("UserPass", $("#pass2").val())
            event.preventDefault();
        }
        else {
            alert("בדוק את הנתונים שלך: אימות סיסמה או הסיסמה הישנה לא נכונה  ")
}     
    });

});

$('#back').click(function () {
    location = "MainPage.html";
});
function validateEmail() {
    var email = document.getElementById('editMail');
    var mailFormat = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (email.value == "" || !mailFormat.test(email.value))
        return false;
        return true
 
}
function validatePhone() {
    var phone = document.getElementById('editPhone');
  //  var mailPhone = /^0[2 - 9]-\d{7}|05[0 - 9]-\d{7}$/;
      //var mailPhone = /^\d0{0-9}-\d{7}$/;
    var mailPhone = /^0[1-9]-\d{7}|05[0-9]-\d{7}$/;
    if (phone.value == "" || !mailPhone.test(phone.value))
        return false;
    return true
}


function EditProfileUser(WhatToChange, valToChange) {

        var editUser =
            {
                userID: localStorage.getItem("UserID"),
                ToChange: WhatToChange,
                NewVal: valToChange
            }


        $.ajax({
            url: WebServiceURL + "/EditProfile",
            dataType: "json",
            type: "POST", //use only POST!
            data: JSON.stringify(editUser),
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, exception) {
               // alert(formatErrorMessage(jqXHR, exception));
            },
            success: function (data) {
          
                localStorage.setItem(WhatToChange, valToChange);
                $('#FormConfirm').modal('toggle')
               
            }
        });
}
$('#btnYes').click(function () {

    location = "MainPage.html";
})
             ////   localStorage.setItem(WhatToChange, valToChange);
//$.ajax({
//    url: WebServiceURL + "/EditProfile",
//    dataType: "json",
//    type: "POST",
//    data: JSON.stringify(editUser),
//    contentType: "application/json; charset=utf-8",
//    error: function (jqXHR, exception) {
//        alert(formatErrorMessage(jqXHR, exception));
//    },
//    success: function (data) {
//        var UserObj = JSON.parse(data.d)
//        alert("השינוי בוצע בהצלחה")

//    }
//});