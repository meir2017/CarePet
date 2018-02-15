
var myLat; 
var myLon;
var infowincontent;
var template;
var x = 0;
var toSearche ="";
//"../images/marker2/blue2-pin.png"
var imgicon = "../images/icons/Mylocation.png";
var provIcon = "";
num = "";

//if (sessionStorage.getItem('vetRes') == null) {
//    alert("go to vetRes")
//    Searched("vet");
//}

$(document).ready(function () { 

   

    if (navigator.geolocation) {  // מיקום

        navigator.geolocation.getCurrentPosition(showPosition, showError);
    }
    else { alert("Geolocation is not supported by this browser."); }

    $('#listMAap').hide();
    $("#mapholder").show();

    $('#picMap2').click(function () {//מציג מפה 
        $('#listMAap').hide();
        $("#mapholder").show();
        $('#picMap1').attr("src","../images/icons/List-black.png")
        $('#picMap2').attr("src", "../images/icons/map-color.png")
        if (num != "")
            SearchedProvider(toSearche)


    });
    $('#picMap1').click(function () {//רשימה
        $("#mapholder").hide();
        $('#listMAap').show();
        $('#picMap2').attr("src","../images/icons/map-black.png")
        $('#picMap1').attr("src","../images/icons/List-color.png")
        if (num != "")
            SearchedProvider(toSearche)

    });

    $("#Area").change(function () {
        var Search;
        num = $("#Area :selected")[0].value;
        if (num == 1) {
            toSearche = "vet"
            provIcon = "../images/icons/vet.png";
        }

        if (num == 2) {
            toSearche = "pension"
            provIcon = "../images/icons/pension.png";
        }

        if (num == 3) {
            toSearche = "store"
            provIcon = "../images/icons/store.png";
        }

        
        SearchedProvider(toSearche)
    });
});
 // לפי  ספק

$('#open-menu').click(function () {

    $("#myPage").hide();
    $('#myMenu').show();

});
$('#close-menu').click(function () {

    $('#myMenu').hide();
    $("#myPage").show();
});
function SearchedProvider(S) {  // לפי  ספק
    if (sessionStorage.getItem('' + S + 'Res') == null) {// אם לא קיים בסטורג
        Searched(S)
        SearchedProvider(S)
    }
    var getRes = sessionStorage.getItem('' + S + 'Res')
    
    var Search = JSON.parse(getRes);

    var myPos = { lat: myLat, lng: myLon };
    var map = new google.maps.Map(document.getElementById('mapholder'), {  // אם יהיה בעיה כנראה בגלל שינוי sql
        zoom: 12,
        center: myPos
    });
    var marker = new google.maps.Marker({ position: latlon, map: map, icon: imgicon, title: "You are here!" });
    
    if (x > 2)
        $('#listMAap').empty();
         x = 0;
    Search.forEach(function (item) {// המערכים במטריצה מתפרקים למתשני הבאים וכול אחד הוא נקודה
        //רשימה 

        var test = x % 2;
        if (test)
            template = '<div class="card info-color text-center z-depth-2"> '
        else
            template = '<div class="card mdb-color lighten-2 text-center z-depth-2">'
        x++;
        template += '<div class="card-body">'
        template += '<span class="name-Provider "> ' + item.Name + '</span>'
        template += ' <p class="white-text mb-0">' + item.Name + '' + '-' + item.Adderss + '<br> טלפון:<a href="tel:'+item.PhoneNumber+'" >' + item.PhoneNumber+'</a></p>'

        $('#listMAap').append(template);
        var image = {
            url: provIcon,
            size: new google.maps.Size(70, 70),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(40, 40)
        };

        var marker;
        posMarker = new google.maps.LatLng(item.latitude, item.longitude),
            marker = new google.maps.Marker({
                position: posMarker,
                map: map,
                icon: image,
                //animation: google.maps.Animation.DROP,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

        var infowincontent = document.createElement('div');
        var strong = document.createElement('h6');
        strong.textContent = item.Name //
        infowincontent.appendChild(strong);
        //infowincontent.appendChild(document.createElement('br'));
        var text = document.createElement('text');
        text.textContent = item.Adderss;
        infowincontent.appendChild(text)

        var br = document.createElement('br');
        infowincontent.appendChild(br)

        var text2 = document.createElement('a');
        text2.href = "tel:'" + item.PhoneNumber+"'";
        text2.textContent = item.PhoneNumber;
        infowincontent.appendChild(text2)


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
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        navigationControlOptions: { style: google.maps.NavigationControlStyle.SMALL }
    };
    var map = new google.maps.Map(document.getElementById("mapholder"), myOptions);
    var marker = new google.maps.Marker({ position: latlon, map: map, icon: imgicon, title: "You are here!" });
}// מיקום משתמש 


