var template;
var thePic;
var picname;

var defaultPic = "../images/pic/propilAnimal.png";
$(document).ready(function () {
    //$(window).on("load", function () {

    if (ifSleep)
        Mywait();
    else
        PageRefresh();

    
    $('#open-menu').click(function () {

        $("#myPage").hide();
        $('#myMenu').show();

    });
    $('#close-menu').click(function () {

        $('#myMenu').hide();
        $("#myPage").show();
    });
})


function PageRefresh() {
    $(".loader").css("display", "block");

    $(".MyAnimals").empty();

    var getResAnimals = sessionStorage.getItem("AnimalsRes")

    var AnimalsRes = JSON.parse(getResAnimals);

    if (AnimalsRes.length == 0) {
        $("#div_MyAnimals").css("display", "none");
        $("#I_dont_have_Animals").css("display", "block");
    }
    for (var i = 0; i < AnimalsRes.length; i++) {
        template = ' <div class="col-lg-3 col-md-6 mb-r">'
        if (AnimalsRes[i].profile_pic == 'no_pic')
            AnimalsRes[i].profile_pic = defaultPic
        template += '<div class="avatar"> <img style="width:160px; height:160px" src="' + AnimalsRes[i].profile_pic + '" class="rounded-circle z-depth-1" alt="תמונה של החיה "></div>'
        //else
        //    template += '<div class="avatar"> <img style="width:160px; height:160px" src="' + defaultPic + '" class="rounded-circle z-depth-1" alt="אין לך תמונה חית המחמד שלך></div>'
        template += '<h4 class="font-bold blue-text">' + AnimalsRes[i].Name + '</h4>'
        template += '<a Id=" ' + AnimalsRes[i].AnimalID + '"title="תמונה" class="fa fa-camera lcon_Animals"> </a>'
        template += '<i Id=" ' + AnimalsRes[i].AnimalID + '"title="פרטים" class="fa fa-info-circle lcon_Animals"> </i> </div>'
        $('.MyAnimals').append(template);

    }
    $(".loader").css("display", "none");

}


$(".MyAnimals").click(function (event) {

    if (event.target.title == "פרטים")
        getInfo(event.target.id)

    if (event.target.title == "תמונה")
        getPic(event.target.id)
});

function getInfo(AnimaID) {
    $(".loader").css("display", "block");
    sessionStorage.setItem("AnimalID", AnimaID)
    var AnimalID =
        {
            animalID: sessionStorage.getItem('AnimalID')
        }

    $.ajax({
        url: WebServiceURL + "/GetAnimalDetailsUsingClass",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(AnimalID),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            alert(formatErrorMessage(jqXHR, exception));
        },
        success: function (data) {
            var AnimalObj = JSON.parse(data.d)
            sessionStorage.setItem("Name", AnimalObj.Name)
            sessionStorage.setItem("Date", AnimalObj.Date)
            sessionStorage.setItem("Height", AnimalObj.Height)
            sessionStorage.setItem("Weight", AnimalObj.Weight)
            sessionStorage.setItem("Sex", AnimalObj.Sex)
            sessionStorage.setItem("Type", AnimalObj.Type)
            sessionStorage.setItem("Race", AnimalObj.Race)
            sessionStorage.setItem("Description", AnimalObj.Description)
            sessionStorage.setItem("Vaccines", AnimalObj.Vaccines)
            //sessionStorage.setItem("Treatments", AnimalObj.Treatments)
            sessionStorage.setItem("Diseases", AnimalObj.Diseases)
            $(".loader").css("display", "none");
            location = "AnimalDetails.html";

        }
    });

}

function getPic(AnimaID) {
    sessionStorage.setItem("AnimalID", AnimaID)
    picname = "AnimalID-" + sessionStorage.getItem('AnimalID');
    navigator.camera.getPicture(onCameraSuccess, onCameraFail, {
        quality: 15,
        destinationType: Camera.DestinationType.FILE_URI
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
        thePic = "http://ruppinmobile.ac.il.preview26.livedns.co.il/site09/WebServerImages/" + picname + ".jpg"//  בטבלה נשמר השם הזה

        newMessage()
    }


    function fail(error) {
        alert("An error has occurred: Code = " + error.code);

    }

    function onCameraFail(message) {
        alert('Failed because: ' + message);
    }

    function newMessage() {
        $(".loader").css("display", "block");
        var add_photo =
            {
                WhoSend: "Animal",
                idUser: sessionStorage.getItem('AnimalID'),
                photo_path: thePic
            }
        //alert("thePic  =" + thePic)

        $.ajax({
            url: WebServiceURL + "/Add_photo_path",
            dataType: "json",
            type: "POST",
            data: JSON.stringify(add_photo),
            contentType: "application/json; charset=utf-8",
            error:
            function (jqXHR, exception) {
                Alert_msg(formatErrorMessage(jqXHR, exception));
            },
            success: function (data) {
                GetAnimalUser()
                alert("תמונה חדשה")
                $(".loader").css("display", "none");
                location.reload();
            }
        });

    }
    //סוף--צילום תמונה--

}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function Mywait() {
    $(".loader").css("display", "block");

    await sleep(sleppTime);
    PageRefresh();
}
