
var myLat;
var myLon;
var lat, lng;
var infowincontent;
var template;
var x = 0;
var imgicon = "../images/icons/Mylocation.png";
var provIcon = "../images/icons/a5.png";

$(document).ready(function () {
    $('#Name_D').val(localStorage.getItem("UserName"));
    $('#tal_D').val(localStorage.getItem("UserPhone"));
    $('#email_D').val(localStorage.getItem("UserMail"));

    if (navigator.geolocation) {  // מיקום
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
    else { alert("Geolocation is not supported by this browser."); }
    //dogWalk();  // מתוף המיקום 
});

$('#open-menu').click(function () {

    $("#myPage").hide();
    $('#myMenu').show();

});
$('#close-menu').click(function () {

    $('#myMenu').hide();
    $("#myPage").show();
});
function dogWalk() {

    var getRes = sessionStorage.getItem('dogWalk')


    var dogWalkitem = JSON.parse(getRes);

    var myPos = { lat: myLat, lng: myLon };
    var map = new google.maps.Map(document.getElementById('DogWalkMap'), {  
        zoom: 11,
        center: myPos
    });
    var marker = new google.maps.Marker({ position: latlon, map: map, icon: imgicon, title: "You are here!" });
    
    dogWalkitem.forEach(function (item) {// המערכים במטריצה מתפרקים למתשני הבאים וכול אחד הוא נקודה
        var image = {
            url: provIcon,
            size: new google.maps.Size(50, 50),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(50, 50)
        };

        var marker;
        posMarker = new google.maps.LatLng(item.latitude, item.longitude),
            marker = new google.maps.Marker({
                position: posMarker,
                map: map,
                icon: image,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

        var infowincontent = document.createElement('div');
        var strong = document.createElement('h6');
        strong.textContent = item.Name //
        infowincontent.appendChild(strong);

        var text = document.createElement('text');
        text.textContent = item.Address;
        infowincontent.appendChild(text)

        var br = document.createElement('br');
        infowincontent.appendChild(br)

        var text2 = document.createElement('a');
        text2.href = "tel:'" + item.Tal+"'";
        text2.textContent = item.Tal;
        infowincontent.appendChild(text2)
       

        var br2 = document.createElement('br');
        infowincontent.appendChild(br2)

        var text3 = document.createElement('text');
        text3.textContent = "הערות:  " + item.Remarks ;
        infowincontent.appendChild(text3)

        infoWindow = new google.maps.InfoWindow();
        marker.addListener('click', function (e) {
            infoWindow.setContent(infowincontent);
            infoWindow.open(map, marker);
        });


    });
}

function showPosition(position) { // מיקום משתמש 
    myLat = position.coords.latitude;
    myLon = position.coords.longitude;
    latlon = new google.maps.LatLng(myLat, myLon)
    var myOptions = {
        center: latlon,
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL }
    };
    var map = new google.maps.Map(document.getElementById("DogWalkMap"), myOptions);
    var marker = new google.maps.Marker({ position: latlon, map: map, icon: imgicon, title: "You are here!" });
      dogWalk();

}// מיקום משתמש 


// רישום 

$("#myform").submit(function (event) {
    $(".loader").css("display", "block");
    toChange()
    $(".loader").css("display", "none");

    event.preventDefault();
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
function Register() {// להוסיף אורך ורוחב
    myMsg = "<br> <div style='background-color:lightskyblue;font-size:16px;font-family: David;color:blue;text-align:center' ><p style='font-size:20px; color:coral'><br>Dog Walk מזל טוב נרשמתה לשרות <p> מעכשיו את מופיע  על המפה שלנו ולקוחת  יוכלו ליצור איתך קשר <br></div> "
    var TheUserInfo =
        {
            Name_d: $('#Name_D').val(),
            Tal_d: $('#tal_D').val(),
            Email__D: $('#email_D').val(),
            Address_d: $('#address_D').val(),
            Remarks_d: $('#info_D').val(),
            lat_d: lat.toString(),
            lang_d: lng.toString() 
        }
    $.ajax({
        url: WebServiceURL + "/DogWalkRegister",
        dataType: "json",
        type: "POST",
        data: JSON.stringify(TheUserInfo),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            alert(formatErrorMessage(jqXHR, exception));
        },
        success: function (data) {
            CallAlldogWalk()
            $('#Add_DogWalker').modal('toggle')
            $(".loader").css("display", "none");

            SendMail_ToUser($('#email_D').val(), " Dog Walk הרשמה  לשרות ", myMsg)
        }
    });
}
$('#ConfirmAdd').click(function () {

    location.reload();

})

function toChange() // עיר וכתובת 
{
    var address = $('#address_D').val() + " ,  " + $('#City_D').val();
    var map = new google.maps.Map("");
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            lat = map.center.lat()
            lng = map.center.lng()
            Register();
        }
        else {
            //alert('Geocode was not successful for the following reason: ' + status);
            $(".loader").css("display", "none");
                   $('#error_Add_DogWalker').modal('toggle')


        }
    });
}


