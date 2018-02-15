
thePage = 1;

$(document).ready(function () {
    
    ApprovaList();
    
    On_List();
    
    if (ifSleep)
    {
        
        Mywait();
    }
    else {
            
        myPension(localStorage.getItem("ID_Pension"), 1)//localStorage.getItem("ID_Pension")
    }
}); 
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function Mywait() {
    await sleep(sleppTime);
    
    myPension(localStorage.getItem("ID_Pension"), 1)//localStorage.getItem("ID_Pension")13
}
$('#confirm').click(function () {// הדף הראשון רשימת ההמתנה 
    thePage = 0;
    myPension(localStorage.getItem("ID_Pension"), 0)//localStorage.getItem("ID_Pension")13
});
$('#client').click(function () {// הדף השני רשימת הלקוחות הקימים  שכבר אאושרו
    thePage = 1;
    myPension(localStorage.getItem("ID_Pension"), 1)//localStorage.getItem("ID_Pension") 13
});



function myPension(Pid, TypeList)
{  
    var userPension =
        {
            id_p: Pid,
            T_List: TypeList
        }

    $.ajax({
        url: WebServiceURL + "/GetWaitingList",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(userPension),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
           // alert(formatErrorMessage(jqXHR, exception));
        },
        success: function (data) {
            
            
            var res = JSON.parse(data.d);
            if (thePage == 0)
            {
                if (res.length === 0) {
                    $("#waiting").css("display", "none");
                    $("#No_waiting").css("display", "block");
                }

                $("#confirm_list").empty();// מי שממתין 
                res.forEach(function (item) {
                    var list = '<div class="panel panel-info" id="' + item.idRows + '">'
                    list += '<div class="panel-heading">'
                    list += '<h5 class="panel-title"> <div data-toggle="collapse"data-parent="#accordion"href="#list' + item.idRows + '">הודעה מאת -  ' + item.UserName + '</div> </h5></div>'// להחליף לשם 
                    list += '<div id="list' + item.idRows + '" class="panel-collapse collapse">'//   item.idRows אולי לא צריך 

                    list += '<div class="panel-body">טלפון - ' + item.Phone + '<br>מייל -  ' + item.Email + '<br>'
                    list += ' שם החייה - ' + item.Name + '| סוג החייה-  ' + item.Type + '<br>'
                    list += '<div><button ApprovaID="' + item.idRows + '"type="button" class="btn btn-success"style="margin-left:50px;margin-right:50px">אישור</button>'
                    list += '<button DeleteID="' + item.idRows + '"type="button" class="btn btn-warning">ביטול</button></div>'
                    list += '</div></div></div>'

                    $('#confirm_list').append(list);
                }); /*&nbsp;*/
            }
            else if (thePage == 1) {
                if (res.length === 0) {
                    $("#I_have_clients").css("display", "none");
                    $("#I_dont_have_clients").css("display", "block");
                }

                $("#listCustomer").empty();
                res.forEach(function (item) {// מי שכבר לקוח
                    var list = ' <button Cust="' + item.idRows + '"type="button" class="btn btn-primary btn-lg btn-block btn_c"> שם לקוח: ' + item.UserName + ' |     טלפון:' + item.Phone + '<br> שם חיה:' + item.Name + '  |  סוג חיה:' + item.Type + '</button>'
                $("#listCustomer").append(list);

    
                }); /*&nbsp;*/
                   }
            else {
        
                // לקוח שנבחר נשמר  בסטורג
                res.forEach(function (item) {
                    sessionStorage.setItem('p_CustomerID', item.UserID);
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
                    location = "chatPension.html";
                })

                 }
          

        }
    });
}


function On_List() {  // איושר  הזמנה / או ביטול הזמנה על ידי הפנסיון 
    $('.panel-group').on('click', function (event) {        
        if ($(event.target).attr('DeleteID') != undefined ){ //אם בחר ביטול
            DeleteOrApprova($(event.target).attr('DeleteID'),0);
            $('#' + $(event.target).attr('DeleteID') + '').css("display", 'none');
        }
        if ($(event.target).attr('ApprovaID') != undefined) {//אם בחר אישור 
            DeleteOrApprova($(event.target).attr('ApprovaID'),1);
            $('#' + $(event.target).attr('ApprovaID') + '').css("display", 'none');
        }
    })
}


function ApprovaList() {// כאשר בוחרים על לקוח מתוך רשימת הלקוחות המאושרים 
    $("#listCustomer").on('click', function (event) {
        if ($(event.target).attr('Cust') != undefined) {
            thePage = 3;
            myPension(0, $(event.target).attr('Cust'))//לפי שורת ההרשמה  לא יכול להיות  שיהיה פנסיון עם זהות 0 
            
        }
    })
}




function DeleteOrApprova(itemID, yesNo)
{
    var forDelete =
        {
            itemID: itemID,
            yesNo:yesNo
        }

    //alert("id  = " + itemID + "  yesNo    =  " + yesNo )
    $.ajax({
        url: WebServiceURL + "/DeleteOrApprova",
        dataType: "json",
        type: "POST", //use only POST!
        data: JSON.stringify(forDelete),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
          //  alert(formatErrorMessage(jqXHR, exception));
        },
        success: function (data) {
            //alert("ההזמנה נמחקה ")
        }
    });
}
function sendEmailAboutYourAnsers() {
    SendMail_ToUser($('#SֹtxtMail').val(), MyTitel, myMsg)

}

$('#goOutPension').click(function () {
    localStorage.removeItem("UserName");
    localStorage.removeItem("UserPass");
    localStorage.removeItem("ID_Pension");
    localStorage.removeItem("p_Name");
    localStorage.removeItem("p_Description");
    localStorage.removeItem("p_Email");
    localStorage.removeItem("p_Possible");
    localStorage.removeItem("p_Address");
    localStorage.removeItem("p_LogoPic");
    localStorage.removeItem("Login", "true");
    localStorage.removeItem("UserType");
    location = "EntrancePage.html";

});

function fixsTine(oldTime) {
    var my_date = oldTime
    n_Year = my_date.slice(0, 4)
    n_Month = my_date.slice(5, 7)
    n_Day = my_date.slice(8, 10)
    new_date = n_Day + "-" + n_Month + "-" + n_Year
    return new_date
}