
var if_same = "";
$(document).ready(function () {
    isPic = false

    //----סידור התאריך---
    var my_date = sessionStorage.getItem("p_Check_in")
    n_Year = my_date.slice(0, 4)
    n_Month = my_date.slice(5, 7)
    n_Day = my_date.slice(8, 10)
    new_date = n_Day + "-" + n_Month + "-" + n_Year

    var my_date2 = sessionStorage.getItem("p_Check_out")
    n_Year2 = my_date2.slice(0, 4)
    n_Month2 = my_date2.slice(5, 7)
    n_Day2 = my_date2.slice(8, 10)
    new_date2 = n_Day2 + "-" + n_Month2 + "-" + n_Year2
    //קראית נתנוים לכפתור המידע
    $('#myText').text(sessionStorage.getItem("p_animalName"))
    $('#Puser_Name').text(sessionStorage.getItem("p_userName"))
    $('#Puser_animal').text(sessionStorage.getItem("p_animalName"))
    $("#Puser_phone").text(sessionStorage.getItem('p_phone'))
    $('#Puser_type').text(sessionStorage.getItem("p_type"))
    $('#Puser_in').text(new_date)
    $('#Puser_out').text(new_date2)
    $('#CustomerNumber').text(sessionStorage.getItem("p_CustomerNumber"))

    var is_Exist = parseInt(sessionStorage.getItem("p_Exist"))
    if (is_Exist == 1) {
        $(".myChat").css("display", 'block');
        $('#footer').css("display", 'block');
                if (ifSleep)
                    Mywait(); 
                else
                    get_All_Msg()
    }
    else {
        $('#Exist_class').css("display", 'block');
    }


    $('#back').click(function () {
        location = "PensionPage.html";
    });


})

$('#info').click(function () {
    alert("meir")
    $('#info_dialog').modal('toggle');
});

$('#Exist').click(function () {// הדף הראשון רשימת ההמתנה 
    
    insert_Update(0, 0, 0, 'ברוך הבא לפנסיון מעכשיו את יכול ליצור קשר דרך האפליקציה')
});


function insert_Update(varibleSand, t_user, t_msg, my_msg) {
    
    var d = new Date();
    var ExistsAnimal = 
        {

            varible: varibleSand,
            Cust: $('#CustomerNumber').text(),
            typeUser: t_user,
            msg_type: t_msg,
            the_msg: my_msg,
            msg_date: d.toDateString(),
               UserID: sessionStorage.getItem("p_CustomerID"),
            pensionID: localStorage.getItem("ID_Pension"),
             animalID: sessionStorage.getItem("p_idAnimal")

        }

   // alert(ExistsAnimal.animalID + "    " + ExistsAnimal.UserID + "    " + ExistsAnimal.pensionID)

    
    $.ajax({
        url: WebServiceURL + "/Start_a_call",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(ExistsAnimal),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
           // alert(formatErrorMessage(jqXHR, exception));
        },
        success: function (data) {

            if (data.d != null) {
                senPush()
                $('#Exist_class').css("display", 'none');
                $(".myChat").css("display", 'block');
                $('#footer').css("display", 'block');
            }
        }
    });
}
function get_All_Msg() {



    var Customer =//מושך את כול הצ'אט'
        {
            Cust: $('#CustomerNumber').text(),
        }
    $.ajax({
        url: WebServiceURL + "/get_All_Msg",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(Customer),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
           // alert(formatErrorMessage(jqXHR, exception));
        },
        success: function (data) {
            if (data.d != null) {
                var chat = JSON.parse(data.d);

                if (if_same.length != chat.length) {

                    $(".myChat").empty();
                    var num_of_pics = 0;
                    for (var i = 0; i < chat.length; i++) { /* bubble bubble-alt white*/
                        // alert(chat[i].msg)
                        if (chat[i].type_user == 0)
                            line = '<div class="bubble">';
                        else
                            line = '<div class="bubble bubble-alt white">';
                        if (chat[i].type_msg == 1) {
                            line += ' <img style="max-height: 150px; max-width: 200px;" src="' + chat[i].msg + '"/>';
                            num_of_pics++;
                        }
                        else
                            line += ' <p>' + chat[i].msg + '</p>';
                        line += '</div>';
                        $('.myChat').append(line);

                    }

                    $(".myChat").animate({ scrollTop: $(document).height() }, "fast");

                    picname = "CustNum-" + sessionStorage.getItem("p_CustomerNumber") + "PicNum-" + ++num_of_pics

                    if_same = JSON.parse(data.d);

                    $("img").click(function () {
                        $("#picNow").empty();
                        var pic1 = $(this).attr('src');
                        myPic = ' <img style="width:100%;height:300px;" src="' + pic1 + '"/>';
                        $('#picNow').append(myPic);
                        $('#ModalPic').modal('toggle')
                    });
                }
            }
        }
    });
}

$(".myChat").animate({ scrollTop: $(document).height() }, "fast");


function newMessage() {
    if (isPic) {
        message = "http://ruppinmobile.ac.il.preview26.livedns.co.il/site09/WebServerImages/" + picname + ".jpg"
        insert_Update(1, 0, 1, message)
        isPic = false;
      //  $('<div class="bubble"> <img style="max-height: 200px; max-width: 200px;" src="http://ruppinmobile.ac.il.preview26.livedns.co.il/site09/WebServerImages/"' + picname + '".jpg"> </div>').appendTo($('.myChat'));
      //  $(".myChat").animate({ scrollTop: $(document).height() }, "fast");
    }
    else {
        message = $("#message").val();
        if ($.trim(message) == '') {
            return false;
        }
        $('<div class="bubble"><p>' + message + '</p></div>').appendTo($('.myChat'));
        insert_Update(1, 0, 0, message)
        $(".myChat").animate({ scrollTop: $(document).height() }, "fast");
    }
    $('#message').val(null);
    $('#camera').removeClass('animated fadeOut').addClass('animated fadeIn');//$('#cm2').show();

};

$('#sendMsg').click(function () {
    newMessage();
});





//התחלה--צילום תמונה--
$('#camera').click(function () {

    navigator.camera.getPicture(onCameraSuccess, onCameraFail, {
        quality: 15,
        destinationType: Camera.DestinationType.FILE_URI
    });
});


function onCameraSuccess(imageURI) {

    uploadPhoto(imageURI);

}




function uploadPhoto(imageURI) {
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = picname;



    options.mimeType = "image/jpeg";
    var params = {};
    params.value1 = "test";
    params.value2 = "param";
    options.params = params;

    var ft = new FileTransfer();

    ft.upload(imageURI, encodeURI("http://ruppinmobile.ac.il.preview26.livedns.co.il/site09/WebServerImages/ReturnValue.ashx"), win, fail, options); // Upload   // שומר את התמונה בכתובת הזו 
}

function win(r) {
    var path = r.response;
    isPic = true
    newMessage()
}


function fail(error) {
    ///Alert_msg("An error has occurred: Code = " + error.code);
    alert("An error has occurred: Code = " + error.code);

}

function onCameraFail(message) {
    alert('Failed because: ' + message);
}

//סוף--צילום תמונה--



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function Mywait() {

    await sleep(sleppTime);
    get_All_Msg();
}

var Interval = setInterval(function () { get_All_Msg() }, 3000);  // עדכון של השיחה כול 3 שניות 


function senPush()
{

    var info_Notification = 
        {

            UserIdGet: sessionStorage.getItem('p_CustomerID'),
            userNameSend: localStorage.getItem("p_Name")
   
        }

    $.ajax({
        url: WebServiceURL + "/NotificationToCustomer",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(info_Notification),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            //alert(formatErrorMessage(jqXHR, exception));
        },
        success: function (data) {

            if (data.d != null) {
                $('#Exist_class').css("display", 'none');
                $(".myChat").css("display", 'block');
                $('#footer').css("display", 'block');
            }
        }
    });
}