
//tetRegister = false

MyAnimal = 0;
MyPension = 0;
var res = "";
$(document).ready(function () {
    myList()
    ApprovaList()

    $('#open-menu').click(function () {

        $("#myPage").hide();
        $('#myMenu').show();

    });
    $('#close-menu').click(function () {

        $('#myMenu').hide();
        $("#myPage").show();
    });

    // חיה מתוך הסטרג   
    var getResAnimals = sessionStorage.getItem("AnimalsRes")
    //arrAnimals = new Array();
    var AnimalsRes = JSON.parse(getResAnimals);
    for (var i = 0; i < AnimalsRes.length; i++) {
        //arrAnimals[i] = JSON.parse(AnimalsRes[i]);
        var adItem = '<option value="' + AnimalsRes[i].AnimalID + '"> ' + AnimalsRes[i].Name + ' </option> ';
        $('#choice_a').append(adItem);
    }
    // פנסיונים מתוך הסטורג
    var getResPension = sessionStorage.getItem("PensionRes")
    var PensionRes = JSON.parse(getResPension);

    for (var i = 0; i < PensionRes.length; i++) {
        var PensionItem = '<option value="' + PensionRes[i].ID_Pension + '"> ' + PensionRes[i].NamePension + ' </option> ';
        $('#choice_p').append(PensionItem);

    }

    $("#choice_p").change(function () {
        MyPension = $("#choice_p :selected")[0].value;
        for (var i = 0; i < PensionRes.length; i++) {
            if (MyPension == PensionRes[i].ID_Pension) {
                $('#info_pension').empty();
                line = ' <img src="' + PensionRes[i].Description + '"/>';
                $('#info_pension').append(line)
            }
           /// p_LogoPic
        }
    });

    $("#choice_a").change(function () {
        MyAnimal = $("#choice_a :selected")[0].value;

    });

    $("#sendInfoRegister").click(function () {
   checkDeat()
    });

});
function checkDeat() {

    var d = new Date();
    var twoDigitMonth = ((d.getMonth().length + 1) === 1) ? (d.getMonth() + 1) : '0' + (d.getMonth() + 1);
    var dataNow = d.getFullYear() + "-" + twoDigitMonth + "-" + d.getDate();// היום 

    $("#erorrMsg1").css("display", "none");
    $("#erorrMsg2").css("display", "none");
    $("#erorrMsg3").css("display", "none");
    $("#erorrMsg4").css("display", "none");
    $("#erorrMsg5").css("display", "none");
    $("#erorrMsg6").css("display", "none");
    if (dataNow >= $('#DateStart').val()) 
    {
        $("#erorrMsg1").css("display", "block");
        $('#formError').modal('toggle')
    }  
    else if ($('#DateStart').val() == $('#DateEnd').val())
    {
        $("#erorrMsg2").css("display", "block");
        $('#formError').modal('toggle')
    }
        else if ($('#DateStart').val() >= $('#DateEnd').val())
    {
        $("#erorrMsg3").css("display", "block");
        $('#formError').modal('toggle')
        }
        else
        Register();
 
}



function Register() {

    if ($('#DateEnd').val() == "" || $('#DateStart').val() == "" || MyPension == 0 || MyAnimal == 0)
    {
        $("#erorrMsg6").css("display", "block");
        $('#formError').modal('toggle')
    }
     else {
        $(".loader").css("display", "block");
        
        var SignInPension =
            {
                userID: localStorage.getItem("UserID"),
                AnimalID: MyAnimal,
                myPhone: localStorage.getItem("UserPhone"),
                PansionId: MyPension,
                DateStart: $('#DateStart').val(),
                DateEnd: $('#DateEnd').val(),
                Details: $('#commentSend').val(),
                EmailUser: localStorage.getItem("UserMail")
            };

        $.ajax({
            url: WebServiceURL + "/SignInToPension",
            dataType: "json",
            type: "POST", //use only POST!
            data: JSON.stringify(SignInPension),
            contentType: "application/json; charset=utf-8",
            error: function (jqXHR, exception) {
                $(".loader").css("display", "none"); // alert(formatErrorMessage(jqXHR, exception));
            },
            success: function (data) {
                // alert(data.d)
                if (data.d != null) {
                    $('#FormConfirm').modal('toggle')

                    GetAnimalUser()
                    myPension(1, localStorage.getItem("UserID"))
                    $(".loader").css("display", "none");
                    $('#Titel_tab a[href="#animal_in_pension"]').tab('show')

                }
                else {

                    $("#erorrMsg4").css("display", "block");
                    $('#formError').modal('toggle')
                }
            }
        });
    }
}

function myList() {

    $('#listAnimals').click(function () {// החיות שלי בפנסיון

        myPension(1, localStorage.getItem("UserID"))
    });
}

function myPension(Pid, TypeList) {

    var user_in_Pension =
        {
            id_p: Pid,
            T_List: TypeList
        }

    $.ajax({
        url: WebServiceURL + "/GetWaitingList",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(user_in_Pension),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            $(".loader").css("display", "none"); // alert(formatErrorMessage(jqXHR, exception));
        },
        success: function (data) {

            res = JSON.parse(data.d);
            $(".loader").css("display", "none");

            if (res != null) {


                var arr = new Array();
                $("#list_in_pensione").empty();
                res.forEach(function (item) {// מי שכבר לקוח
                    var Check_in= fixsTine(item.Check_in)
                    var Check_out = fixsTine(item.Check_out)
                    if (item.If_Exists != null)
                        var list = ' <button Cust="' + item.idRows + '"type="button" class="btn btn-success btn-lg btn-block">' + item.Name + '    בפנסיון    - ' + item.NamePension + '<br> מתאריך -  ' +Check_in + '    עד-  ' + Check_out + '</button>'
                    else
                        var list = ' <button Cust="' + item.idRows + '"type="button" class="btn btn-danger btn-lg btn-block">' + item.Name + '    בפנסיון    - ' + item.NamePension + '<br> מתאריך -  ' + Check_in + '    עד-  ' + Check_out + '</button>'
                    $("#list_in_pensione").append(list);
                })

            }
            if (res.length === 0) { //הרשימה ריקה
                $("#I_have_animal").css("display", "none");
                $("#I_dont_have_clients").css("display", "block");
            }
        }
    });

}

function ApprovaList() {
    $("#list_in_pensione").on('click', function (event) {
        if ($(event.target).attr('Cust') != undefined) {
            res.forEach(function (item) {// מי שכבר לקוח
                if (item.idRows == $(event.target).attr('Cust')) {
                    if (item.If_Exists == null) {
                        $("#erorrMsg5").css("display", "block");
                        $('#formError').modal('toggle')
                    }
                    else {
                        sessionStorage.setItem('p_userName', item.UserName);
                        sessionStorage.setItem('p_animalName', item.Name);
                        sessionStorage.setItem('p_idRows', item.idRows);
                        sessionStorage.setItem('p_phone', item.Phone);
                        sessionStorage.setItem('p_type', item.Type);
                        sessionStorage.setItem('p_idAnimal', item.AnimalID);
                        sessionStorage.setItem('p_idPension', item.ID_Pension);
                        sessionStorage.setItem('p_Check_in', item.Check_in);
                        sessionStorage.setItem('p_Check_out', item.Check_out);
                        sessionStorage.setItem('p_Exist', item.If_Exists);
                        sessionStorage.setItem('p_CustomerNumber', item.idRows);

                        sessionStorage.setItem('p_Phone', item.Pension_Phone);


                        sessionStorage.setItem('p_NamePension', item.NamePension);

                        location = "chatCustomer.html";
                    }
                }
            })
        }
    })
}

function fixsTine(oldTime)
{
    var my_date = oldTime
    n_Year = my_date.slice(0, 4)
    n_Month = my_date.slice(5, 7)
    n_Day = my_date.slice(8, 10)
    new_date = n_Day + "-" + n_Month + "-" + n_Year
    return new_date
}
