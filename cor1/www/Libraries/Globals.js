
num1 = "68558839016";//       
theUserType = "";

var local = false;  // בחרית שרת  השרת המקומי או רופין  
var WebServiceURL = "http://localhost:63926/UsersWS.asmx";
if (!local) {
    WebServiceURL = "http://ruppinmobile.ac.il.preview26.livedns.co.il/site09/UsersWS.asmx";
}
/// כתובת סטריג  למוביל    
// כתובת מספרית אתר  
var rgist = false;
var ifSleep = true;
var sleppTime = 2500;//זמן ;השהיה באלפיות


// בעיות התחברות 
//function formatErrorMessage(jqXHR, exception) {
//    $(".loader").css("display", "none");
//    if (jqXHR.status === 0) {
//        return ('Not connected.\nPleaseverify your network connection.');
//    } else if (jqXHR.status == 404) {
//        return ('The requested page not found. [404]');
//    } else if (jqXHR.status == 500) {
//        return ('Internal Server Error [500].');
//    } else if (exception === 'parsererror') {
//        return ('Requested JSON parse failed.');
//    } else if (exception === 'timeout') {
//        return ('Time out error.');
//    } else if (exception === 'abort') {
//        return ('Ajax request aborted.');
//    } else {
//        return ('Uncaught Error.\n' + jqXHR.responseText);
//    }


//}

//בעיות מפה - בעיות מיקום משתמש
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
        default:
            alert("An unknown error occurred.(default)");
            break;
    }
}


///// פונקציות  לדפים //////

// התחברות
function go_to_login(name, pss) {
    var UserJSObj =
        {
            name: name,
            password: pss
        };
    $.ajax({
        url: WebServiceURL + "/LoginUserUsingClass",
        dataType: "json",
        type: "POST",
        data: JSON.stringify(UserJSObj),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            alert(formatErrorMessage(jqXHR, exception));
        },
        async: false,
        success: function (data) {
            var UserObj = JSON.parse(data.d);
            if (UserObj != null) {
                theUserType = UserObj.UserType;
                if (UserObj.UserType == "Pension") {
                    localStorage.setItem("UserName", UserObj.UserName);
                    localStorage.setItem("UserPass", UserObj.Passward);
                    localStorage.setItem("ID_Pension", UserObj.ID);
                    localStorage.setItem("p_Name", UserObj.BusinessName);
                    localStorage.setItem("p_Description", UserObj.Description);
                    localStorage.setItem("p_Email", UserObj.Email);
                    localStorage.setItem("p_Possible", UserObj.Possible);
                    localStorage.setItem("p_Address", UserObj.Address);
                    //localStorage.setItem("p_LogoPic", UserObj.LogoPic);
                    localStorage.setItem("Login", "true");
                    localStorage.setItem("UserType", UserObj.UserType);
                    if (rgist)
                        RegistrationToPush();
                    else
                        location = "PensionPage.html";

                }
                else {
                    localStorage.setItem("UserName", UserObj.UserName);
                    localStorage.setItem("UserPass", UserObj.Passward);
                    localStorage.setItem("UserID", UserObj.UserID);
                    localStorage.setItem("UserMail", UserObj.Email);
                    localStorage.setItem("UserPhone", UserObj.Phone);
                    localStorage.setItem("WhenRegist", UserObj.RengDeat);
                    localStorage.setItem("Login", "true");
                    localStorage.setItem("UserType", UserObj.UserType);

                    CallAlldogWalk();
                    Searched("vet"); Searched("pension"); Searched("store") // עסקים על המפה 
                    myEveint(); // הודעות והתרעות 
                    GetAnimalUser()   // כול החיות   
                    GetPnsion(); //  פנסיונים רושומים וגם מעביר לדף ראשי  
                    if (rgist)
                        RegistrationToPush();// רישום לפוש ומעבר לדפים 

                }
            }
            else {
                $('#ErrorLogin').modal('toggle')
            }
        }
    });

}



// בתי עסק בדף החיפושים 
function Searched(S) {

    var Search =
        {
            SearchInfo: S
        };


    $.ajax({
        url: WebServiceURL + "/TheSearcher",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(Search),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            //alert(formatErrorMessage(jqXHR, exception));
        },
        async: false,
        success: function (data) {// מציג על המפה את העסק 
            var res = JSON.parse(data.d)
            sessionStorage.setItem('' + S + 'Res', JSON.stringify(res));
            //alert("ssuccess-" + S)

        }
    });
}

//   רשימת הפנסיונים הרשומים ונעבר לדף ראשי
function GetPnsion() {

    $.ajax({
        url: WebServiceURL + "/InfoPension",
        dataType: "json",
        type: "POST",
        data: "", //JSON.stringify(PensionName),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            //  alert(formatErrorMessage(jqXHR, exception));
        },        // async: false,
        async: false,
        success: function (data) {
            var res = JSON.parse(data.d)
            sessionStorage.setItem('PensionRes', JSON.stringify(res));
            if (!rgist)
                window.location = "MainPage.html";
        }
    });
}

// dogWalk
function CallAlldogWalk() {

    $.ajax({
        url: WebServiceURL + "/ReadAllDogWalk",
        dataType: "json",
        type: "POST",
        data: "", //JSON.stringify(PensionName),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            // alert(formatErrorMessage(jqXHR, exception));
        },
        async: false,
        success: function (data) {
            var res = JSON.parse(data.d)
            sessionStorage.setItem('dogWalk', JSON.stringify(res));
            //alert("ssuccess   dogWalk")

        }
    });
}

// ההודעות שלי
function myEveint() {
    var userID =
        {
            id: localStorage.getItem("UserID")
        }

    $.ajax({
        url: WebServiceURL + "/GetUserEventsUsingClass",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(userID),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            // alert(formatErrorMessage(jqXHR, exception));
        },
        async: false,
        success: function (data) {
            var res = data.d
            sessionStorage.setItem('myMsg', JSON.stringify(res));
            //  alert("ssuccess   myEveint")

        }
    });
}

// כול החיות 
function GetAnimalUser() {

    var GetUserAnimals =
        {
            userID: localStorage.getItem("UserID")
        }

    $.ajax({
        url: WebServiceURL + "/GetUserAnimalsUsingClass",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(GetUserAnimals),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            // alert(formatErrorMessage(jqXHR, exception));
        },
        async: false,
        success: function (data) {
            var res = JSON.parse(data.d)
            sessionStorage.setItem('AnimalsRes', JSON.stringify(res));
            //alert("ssuccess   AnimalsRes")
        }
    });
}

// מחיקת ארועה
function DeleteEvent(event_id) {
    var eventData =
        {
            id: event_id
        }

    $.ajax({
        url: WebServiceURL + "/DeleteEvent",
        dataType: "json",
        type: "POST",
        data: JSON.stringify(eventData),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            //  alert(formatErrorMessage(jqXHR, exception));
        },
        async: false,
        success: function (data) {
            //    alert("ssuccess   myEveint")
            myEveint(); // אחרי המחקיה עידכון  האירועים  

        }
    });

}

function RegistrationToPush() {
    var IconBadgeNumber = 0;
    var push = PushNotification.init({
        android: {
            senderID: "68558839016",
            icon: "../images/marker2/list.png"
        },
        browser: {
            //pushServiceURL: 'http://push.api.phonegap.com/v1/push'

        },
        ios: {
            alert: "true",
            badge: "true",
            sound: "true"
        },
        windows: {}
    });

    push.on('registration', function (data) {
        // alert(data.registrationId)
        UpdateRege(data.registrationId)
    });

    push.on('notification', function (data) {
        var message = '';
        message += data.message + ', ';
        message += data.title + ', ';
        message += data.count + ', ';
        //message += data.alert + ', ';
        //message += data.msgcnt + ', ';
        message += data.sound + ', ';
        message += data.image + ', ';
        message += data.additionalData + ', ';
        message += 'data.additionalData.foreground = ' + data.additionalData.foreground + ', ';
        message += 'data.additionalData.coldstart = ' + data.additionalData.coldstart + ', ';
        $('#resDiv').text(message);
        IconBadgeNumber = data.count;

        //if (data.additionalData.foreground == true) {
        //    var my_media3 = new Media("/android_asset/www/sound/beep3.mp3",
        //        // success callback
        //        function () { /*alert("playAudio():Audio Success");*/ },
        //        // error callback
        //        function (err) { alert("playAudio():Audio Error: " + err); }
        //    );
        //    my_media3.play();
        //}
    });

    push.setApplicationIconBadgeNumber(function () {
        console.log('success');
    }, function () {
        console.log('error');
    }, IconBadgeNumber);

    push.on('error', function (e) {
        alert(e.message);
    });
}

function UpdateRege(myReg) {
    if (theUserType == "Pension")
        var t_user = localStorage.getItem("ID_Pension")
    else
        var t_user = localStorage.getItem("UserID")


    var sendMyReg =
        {
            theReg: myReg,
            id: t_user,
            typeUser: theUserType
        }

    $.ajax({
        url: WebServiceURL + "/UpdateUserRege",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(sendMyReg),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            // alert(formatErrorMessage(jqXHR, exception));
        },
        async: false,
        success: function (data) {
            //  alert(data.d)
            sessionStorage.setItem('RegistrationToPush', true);
            if (theUserType == "Pension")
                location = "PensionPage.html";
            else
                window.location = "MainPage.html";

        }
    });


}

function SendMail_ToUser(sEmail, titel, Body) {
    var emilToSend =
        {
            UserEmail: sEmail,
            titelEmail: titel,
            BodyMsg: Body
        }

    $.ajax({
        url: WebServiceURL + "/SendMail",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(emilToSend),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            //alert(formatErrorMessage(jqXHR, exception));
        },
        async: false,
        success: function (data) {
            //alert(data.d);
        }
    });
}

$('#goOut').click(function () {
    //url_1 = "/android_asset/www/sound/beep3.mp3";
    //var my_media = new Media(url_1, null, null);
    //my_media.play();
    localStorage.removeItem('UserName');
    localStorage.removeItem("UserPass");
    localStorage.removeItem("UserID");
    localStorage.removeItem("UserMail");
    localStorage.removeItem("UserPhone");
    localStorage.removeItem("WhenRegist");
    localStorage.removeItem("Login");
    localStorage.removeItem("UserType")
    location = "EntrancePage.html";
});


//function RegistrationToPush2() { RegistrationToPush(); }


////function tetReg() {
//    var d = new Date();
//    var dataNow = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();// היום
//  //  alert(localStorage.getItem("WhenRegist"))//
//    var rgDeat = localStorage.getItem("WhenRegist"); // מתי הוא עדכן

//    var forTest = rgDeat.slice(0, 10);   // הצגת התאריך בלבד  

//    var res = dataNow.localeCompare(forTest); // בדיקה אם תאריך ההרשמה הוא היום 

//    if (res != 0)//אם הם שונים אז הוא צריך להירשם  
//    {
//        alert("צריך להירשם")
//        onDeviceReady();  // כאשר עובד על המחשב לבטל 
//    }
//    else
//        alert("לא צריך להירשם")
//}
