

//$(document).ready(function () {
    // Mywait()  // השייה 

//}); 



async function Mywait() {
    if (ifSleep) {
        await sleep(sleppTime);
        if (sessionStorage.getItem("RegistrationToPush") == null) {
            RegistrationToPush();
        }
    }
    else
        if (sessionStorage.getItem("RegistrationToPush") == null) {
            RegistrationToPush();
        }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

        if (data.additionalData.foreground == true) {
            var my_media3 = new Media("/android_asset/www/sound/beep3.mp3",
                // success callback
                function () { /*alert("playAudio():Audio Success");*/ },
                // error callback
                function (err) { alert("playAudio():Audio Error: " + err); }
            );
            my_media3.play();
        }
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
        },
        async: false,
        success: function (data) {
            sessionStorage.setItem('RegistrationToPush', true);
        }
    });
}


document.addEventListener('deviceready', Mywait, true);




