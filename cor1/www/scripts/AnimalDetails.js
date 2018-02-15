

$(document).ready(function () {

    var dog = ["בולדוג", "רוטווליר", "לורדור", "האסקי סיבירי", "פודל", "פיקינז", "רועה גרמני", "פיטבול", "דוברמן", "פינציר", "צ'יוואווה ", "בוקסר", "בורדר קולי", "שיצו", "אחר",];
    var cat = ["ברטי", "סיאמי", "פרסי ", "רגדול", "מיין קון ", "ספינקס", "אביסיני", "רוסי כחול", "ברומזי", "יערות נורבגי", "בירמן ", "קורניס ראק", "סיבירי", "סנגפורה", "סוקוק", "מנציקן", "מאו מצרי", "הוואנה", "ואן מצרי", "אחר"];

    dog.sort();
    cat.sort();
    $("#Type").change(function () {
        $("#Race").empty();
        choiceSelected = $("#Type :selected")[0].value;
        if (choiceSelected == "dog")
            for (var i = 1; i < dog.length; i++) {
                $('<option>').text(dog[i]).appendTo('#Race')
            }
        else
            for (var i = 1; i < cat.length; i++) {
                $('<option>').text(cat[i]).appendTo('#Race')
            }

    });


    if (sessionStorage.getItem('Type') == "dog")
        for (var i = 1; i < dog.length; i++) {
            $('<option>').text(dog[i]).appendTo('#Race')
        }
    else
        for (var i = 1; i < dog.length; i++) {
            $('<option>').text(cat[i]).appendTo('#Race')
        }


    $("#Name").val(sessionStorage.getItem('Name'))
    $("#Date").val(sessionStorage.getItem('Date'))
    $("#Height").val(sessionStorage.getItem('Height'))
    $("#Weight").val(sessionStorage.getItem('Weight'))
    $("#Sex").val(sessionStorage.getItem('Sex'))
    $("#Type").val(sessionStorage.getItem('Type'))
    $("#Race").val(sessionStorage.getItem('Race'))
    $("#Description").val(sessionStorage.getItem('Description'))

    //$("#Type").select()

    var Vaccines = sessionStorage.getItem('Vaccines')
    var resVaccines = Vaccines.split(",");
    var Diseases = sessionStorage.getItem('Diseases')
    var resDiseases = Diseases.split(",");
    $('.Vaccines:checkbox').each(function () {
        
        for (var i = 0; i < Vaccines.length; ++i) {
            if ($(this).val() == resVaccines[i])
                $(this).prop('checked',true) 
            }
    })

    $('.Diseases:checkbox').each(function () {
        for (var i = 0; i < Diseases.length; ++i) {
            if ($(this).val() == resDiseases[i]) {
                $(this).prop('checked', true)
            }
        }
    })


    $('#back').click(function () {
        location = "MyAnimals.html";
    });

    $("#EditAnimalform").submit(function (event) {
        checkDeat()
        event.preventDefault();
    });
    function checkDeat() {
        var d = new Date();
        var twoDigitMonth = ((d.getMonth().length + 1) === 1) ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
        var dataNow = d.getFullYear() + "-" + twoDigitMonth + "-" + d.getDate();// היום 

        if (dataNow <= $('#Date').val())
            alert("תאריך לידה צריך להיות בעבר")
        else
            saveTheChange()

    }

    function saveTheChange() {
        $(".loader").css("display", "block");

        var editVaccines = "";
        var editDiseases = "";
        $('.Vaccines:checkbox:checked').each(function () {
            editVaccines += $(this).val() + ","

        })
        $('.Diseases:checkbox:checked').each(function () {
            editDiseases += $(this).val() + ","

        })
        var saveAnimal =
            {
                animalID: sessionStorage.getItem('AnimalID'),
                name: $("#Name").val(),
                year: $("#Date").val(),
                weight: $("#Weight").val(),
                hieght: $("#Height").val(),
                type: $("#Type").val(),
                race: $("#Race").val(),
                sex: $("#Sex").val(),
                description: $("#Description").val(),
                diseases: editDiseases,
                treatments: "",
                vaccines:editVaccines
            }

        $.ajax({
            url: WebServiceURL + "/SaveChangesAnimal",
            dataType: "json",
            type: "POST", //use only POST!
            data: JSON.stringify(saveAnimal),
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, exception) {
                $(".loader").css("display", "none");//  alert(formatErrorMessage(jqXHR, exception));
            },

            success: function (data) {
    
                GetAnimalUser()
                $(".loader").css("display", "none");
                $('#FormConfirmSeve').modal('toggle')
                //alert(data.d)

            }
        });

    }
    $('#ConfirmSeve').click(function () {

        location = "MyAnimals.html";

    })

    $('#btnDelete').click(function () {
        $('#FormConfirmDelete').modal('toggle')
        $('#btnYes').click(function () {
            
            btnDelete()
        })
    })

    function btnDelete() {
        $(".loader").css("display", "block");

        $("#FormConfirm").hide();

        var AnimalID =
            {
                animalID: sessionStorage.getItem('AnimalID')
            }

        $.ajax({
            url: WebServiceURL + "/DeleteAnimal",
            dataType: "json",
            type: "POST",
            data: JSON.stringify(AnimalID),
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, exception) {

                $(".loader").css("display", "none");  //   alert(formatErrorMessage(jqXHR, exception));
            },
            success: function (data) {
                $(".loader").css("display", "none");

               // alert("המחיקה בוצע בהצלחה ")
                GetAnimalUser()

                location = "MyAnimals.html";

            }
        });
        $(".loader").css("display", "none");

    }
})




