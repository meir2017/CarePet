
$(document).ready(function () {

    var dog = ["בולדוג", "רוטווליר", "לורדור", "האסקי סיבירי", "פודל", "פיקינז", "רועה גרמני", "פיטבול", "דוברמן", "פינציר",   "צ'יוואווה ", "בוקסר", "בורדר קולי", "שיצו", "אחר/לא ידוע",];
    var cat = ["ברטי", "סיאמי", "פרסי ", "רגדול", "מיין קון ", "ספינקס", "אביסיני", "רוסי כחול", "ברומזי", "יערות נורבגי", "בירמן ", "קורניס ראק", "סיבירי", "סנגפורה", "סוקוק", "מנציקן", "מאו מצרי", "הוואנה", "ואן מצרי", "אחר"];

    dog.sort();
    cat.sort();

    $("#inNewType").change(function () {
        $("#inNewRace").empty();
        choiceSelected = $("#inNewType :selected")[0].value;
        $('<option  value="">').text("---  בחר גזע  ---").appendTo('#inNewRace')
        if (choiceSelected == "dog") 
            for (var i = 1; i < dog.length; i++) {
                $('<option>').text(dog[i]).appendTo('#inNewRace')
            }
        else 
            for (var i = 1; i < cat.length; i++) {
                $('<option>').text(cat[i]).appendTo('#inNewRace')
             }
 
        });


    $("#AddAnimalForm").submit(function (event) {
        checkDeat()
        event.preventDefault();
    });

    $('#back').click(function () {
        location = "MyAnimals.html";
    });
});

function checkDeat() {
    var d = new Date();
    var twoDigitMonth = ((d.getMonth().length + 1) === 1) ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
    var dataNow = d.getFullYear() + "-" + twoDigitMonth + "-" + d.getDate();// היום 

    if (dataNow <= $('#inNewDate').val())
        alert("תאריך לידה צריך להיות בעבר")
    else
        AddNewAnimal()

}

function AddNewAnimal()
{
    var inNewVaccines = "";
    var inNewDiseases = "";
    $('.inNewVaccines:checkbox:checked').each(function () {
        inNewVaccines += $(this).val() + ","

    })
    $('.inNewDiseases:checkbox:checked').each(function () {
        inNewDiseases += $(this).val() + ","

    })
    $(".loader").css("display", "block");

    var NewAnimal =
        {
            userID: localStorage.getItem("UserID"),
            name: $("#inNewName").val(),
            year: $("#inNewDate").val(),
            weight: $("#inNewWeight").val(),
            hieght: $("#inNewHeight").val(),
            type: $("#inNewType").val(),
            race: $("#inNewRace").val(),
            sex: $("#inNewSex").val(),
            description: $("#inNewDescript").val(),
            diseases: inNewDiseases,
            treatments:"",
            vaccines: inNewVaccines
        };

    $.ajax({
        url: WebServiceURL + "/AddNewAnimal",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(NewAnimal),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            $(".loader").css("display", "none");//  alert(formatErrorMessage(jqXHR, exception));
        },
        success: function (data) {
            GetAnimalUser()
            $('#Add_animal').modal('toggle')
            //alert(data.d)
            $(".loader").css("display", "none");
        }
    });
}

$('#ConfirmAnimal').click(function () {

    location = "MyAnimals.html";

})

