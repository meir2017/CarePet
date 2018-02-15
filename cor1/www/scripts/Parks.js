

          $('#open-menu').click(function () {

                $("#myPage").hide();
                $('#myMenu').show();

            });
            $('#close-menu').click(function () {

                $('#myMenu').hide();
                $("#myPage").show();
            });

         var map;
         var pyrmont = { lat: 31.2751, lng: 34.84432 };

            var imgicon = "../images/icons/park.png";
    

         function initMap() {
             //  gogo()
             if (navigator.geolocation) {  // מיקום
                 navigator.geolocation.getCurrentPosition(showPosition, gogo);
             }


         }
         function gogo() {
             map = new google.maps.Map(document.getElementById('map'), {
                 center: pyrmont,
                 zoom: 11
             });
             //  var marker = new google.maps.Marker({ position: latlon, map: map, icon: imgicon, title: "You are here!" });// המיקום שלי

             var request = {
                 location: pyrmont,
                 radius: 500000,
                 types: ['park']
             };
             infowindow = new google.maps.InfoWindow();
             service = new google.maps.places.PlacesService(map);
             service.search(request, callback);

         }
         function processResults(results, status, pagination) {
             if (status !== google.maps.places.PlacesServiceStatus.OK) {
                 return;
             } else {
                 createMarkers(results);
                 pagination.nextPage();
                 if (pagination.hasNextPage) {
                     var moreButton = document.getElementById('more');

                     // moreButton.disabled = false;
                     moreButton.disabled = true;
                     pagination.nextPage();
                     moreButton.addEventListener('click', function () {
                         moreButton.disabled = true;
                         pagination.nextPage();
                     });
                 }
             }
         }
         function callback(results, status) {
             if (status === google.maps.places.PlacesServiceStatus.OK) {
                 for (var i = 0; i < results.length; i++) {
                     createMarker(results[i]);
                 }
             }
         }
            function createMarker(place) {
       
                var placeLoc = place.geometry.location;
                var myiconc = {
                    url: imgicon,
                    size: new google.maps.Size(70, 70),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(40, 40)
                };
             var marker = new google.maps.Marker({
                 map: map,
                 icon: myiconc,
                 position: place.geometry.location
             });

             google.maps.event.addListener(marker, 'click', function () {
                 infowindow.setContent(place.name + '<br>' + place.vicinity);
                 infowindow.open(map, this);
             });
         }
         //

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

             pyrmont = { lat: myLat, lng: myLon };
             var map = new google.maps.Map(document.getElementById("map"), myOptions);
             var marker = new google.maps.Marker({ position: latlon, map: map, icon: imgicon, title: "You are here!" });
             gogo()
         }// מיקום משתמש


