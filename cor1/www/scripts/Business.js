type = " ";
$(document).ready(function () { //anonymous function

    $('#btnSend').click(function () {

        Bname = $('#Bname').val();
        Cname = $('#Cname').val();
        Address = $('#Address').val();
        Bphon = $('#Bphon').val();
        var lat, lng;
        num = $("#Type :selected")[0].value;

        if (num == 1) {
            type = "vet"
        }
        if (num == 2) {
            type = "pension"
        }
        if (num == 3) {
            type = "store"
        }

        if (Bname == "" || Cname == "" || Address == "" || Bphon == "" || type == 0) {
            alert("אחד מהשדות ריק אנא מלא אותם ")
        }
        else {
           alert("2")
                var address = Address +" ,  "+ Cname;
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
                  AddBusiness(Bname, type, address, Bphon, lat.toString(), lng.toString())
                 }
                 else {
                    alert('Geocode was not successful for the following reason: ' + status);
                      }
                });
                 //AddBusiness(Bname, type, Address, Bphon, lat, lng)
             }
    });
});


function AddBusiness(Bname, type, address, Bphon, lat, lng) { 

var sendInfo =
    {
        Bname: Bname,
        type: type,
        Address: address,
        Bphon: Bphon,
        lat: lat,
        lng: lng
    };

    //alert(Bname + " ,   " + type + " ,  " + address + "     ,   " + Bphon + "     ,   " + lat + "     ,   " + lng)
    $.ajax({
        url: WebServiceURL + "/AddBusiness",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(sendInfo),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            alert(formatErrorMessage(jqXHR, exception));
        },
        success: function (data) {// מציג על המפה את העסק 
           // var myS = JSON.parse(data.d)
            alert(data.d)
            
            if (data.d = 1)
                alert("ההרשמה הצליחה ")
            else
                alert("ההרשמה לא הצליחה  ")
           
        
             //window.open("http://localhost:4400/pages/page1.html");
             // window.location.href='http://localhost:4400/pages/page1.html'

        }
    });
}






//var address = c;
//geocoder.geocode({ 'address': address }, function (results, status) {
//    if (status == google.maps.GeocoderStatus.OK) {
//        map.setCenter(results[0].geometry.location);
//        var marker = new google.maps.Marker({
//            map: map,
//            position: results[0].geometry.location
//        });
//        marker.addListener('click', function (e) {
//            // debugger
//            infoWindow.setContent(infowincontent);
//            infoWindow.open(map, marker);
//            // alert(e.latLng);
//        });
//    } else {
//        alert('Geocode was not successful for the following reason: ' + status);
//    }
//});

//$("#Area").change(function () {
    //    num = $("#Area :selected")[0].value;
    //    if (num == 1) {
    //        alert("וטרינרים")
    //       // Searched("vet")
    //    }
    //    if (num == 2) {
    //        alert("פנסיון")
    //       // Searched("pension")
    //    }
    //    if (num == 3) {
    //        alert("חניות ")
    //        //Searched("store") /// מה שרוצים לחפש ישלח 
    //    }

    //});

//var sendInfo =
//    {
//        Bname: Bname,
//        Cname: Cname,
//        Bphon: Bphon,
//        type: type,
//        Address: Address
//    };