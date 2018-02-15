
// משתנים 
var start_Date
var eventObj
var Start_Time
var UserEvents = new Array();
var initialLocaleCode = 'he';

$(document).ready(function () {
    $('#go_list').click(function () {
        location = "myEvent.html";
    });

    GetUserEventsFromDB()

    $('#open-menu').click(function () {

        $("#myPage").hide();
        $('#myMenu').show();

    });
    $('#close-menu').click(function () {

        $('#myMenu').hide();
        $("#myPage").show();
    });
});

/// מושך את כול האירועים מתוך הסטורג 
function GetUserEventsFromDB() {
    startBoarde()
    var getResMsg = sessionStorage.getItem('myMsg')
    var myMsg = JSON.parse(getResMsg);

    arr = new Array();
    for (var i = 0; i < myMsg.length; i++) {
        UserEvents[i] = JSON.parse(myMsg[i]);
    }
    CreateMyCalendar();
}

// יוצר בתוך הרשימה את  המספרים לשעות 
function startBoarde() {
    $("#Editimportant").change(function () {
        var color = $("option:selected", this).css("backgroundColor");
        $("#Editimportant").css("background-color", color);
    });

    $("#important").change(function () {
        var color = $("option:selected", this).css("backgroundColor");
        $("#important").css("background-color", color);
    });
}

/// כפתור אישור  קביעת אירוע   
$("#newEvent").submit(function (event) {
    CreateNewEvent();
    $('#newEvent').modal('hide');
    event.preventDefault();
});

/// כפתור עריכת אירוע  
$("#editEvent").submit(function (event) {
    editEvent()
    event.preventDefault();
});


///מחיקת אירוע
$('#btnDelete').click(function () {
    $(".loader").css("display", "block");
    var eventData =
        {
            id: eventObj.id
        }

    $.ajax({
        url: WebServiceURL + "/DeleteEvent",
        dataType: "json",
        type: "POST",
        data: JSON.stringify(eventData),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            alert(formatErrorMessage(jqXHR, exception));
        },
        success: function (data) {
            myEveint(); // אחרי המחקיה עידכון  האירועים  בתוך הסטורג 
            $(".loader").css("display", "none");
            $('#calendar').fullCalendar('removeEvents', eventObj.id)
            $('#editEvent').modal('hide');
        }
    });

});

//עריכה של אירוע קיים
function editEvent()
{
    $(".loader").css("display", "block");
    var eventData =
        {
            id: eventObj.id,
            title: $('#EditeventTitle').val(),
            start: start_Date + 'T' + $('#myTimeEdit').val(),
            description: $('#EditDetails').val(),
            color: $("#Editimportant").css('backgroundColor')
        }

    $.ajax({
        url: WebServiceURL + "/EditEvent",
        dataType: "json",
        type: "POST",
        data: JSON.stringify(eventData),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            alert(formatErrorMessage(jqXHR, exception));
        },
        success: function (data) {

            resEvent = JSON.parse(data.d)

            eventObj.title = resEvent.title
            eventObj.description = resEvent.description
            eventObj.start = resEvent.start
            eventObj.color = resEvent.color
            myEveint(); // אחרי העריכה עידכון  האירועים  
            $('#calendar').fullCalendar('updateEvent', eventObj);
            $(".loader").css("display", "none");
            $('#editEvent').modal('hide');
        }

    })
}

///יצירת אירוע חדש
function CreateNewEvent() {
    //var time = $('#myTime').val();
    //var hours = time.slice(0, 2);
    //var minutes = time.slice(3, 5);
    $(".loader").css("display", "block");
    var eventData =
        {
            id: "1",
            userID: localStorage.getItem("UserID"),
            title: $('#titleTxt').val(),
            start: start_Date + 'T' + $('#myTime').val(),
            description: $('#descriptionTxt').val(),
            color: $("#important").css('backgroundColor')
        }

    $.ajax({
        url: WebServiceURL + "/CreateNewEvent",
        dataType: "json",
        type: "POST",
        data: JSON.stringify(eventData),
        contentType: "application/json; charset=utf-8",
        error: function (jqXHR, exception) {
            alert(formatErrorMessage(jqXHR, exception));
        },
        success: function (data) {
            eventData.id = data.d
            $(".loader").css("display", "none");
            $('#calendar').fullCalendar('renderEvent', eventData, true);
            myEveint(); // אחרי הוספת אירוע  עידכון  האירועים  
        }
    });
}

///יצירת לוח שנה
function CreateMyCalendar() {

    $('#calendar').fullCalendar({
        header: {
            left: 'next , today',
            center: 'title',
            right: 'prev'
        },
        locale: initialLocaleCode,
        defaultDate: this.todayDate,
        businessHours: { dow: [0, 1, 2, 3, 4, 5] },
        selectable: true,
        editable: true,
        selectHelper: true,

        dayClick: function (date, jsEvent, view) {

            start_Date = $.fullCalendar.formatDate(date, 'YYYY-MM-DD')// אירוע חדש
            $('#newEvent').modal('toggle')
            $('#myTime').val("--:--")

            $("#important").css('background-color', 'white')
            $("#important").prop('selectedIndex', 0)
            $('#titleTxt').val("")
            $('#descriptionTxt').val("")

        },
        eventClick: function (event) {// מצב עריכה 
            eventObj = event
            start_Date = $.fullCalendar.formatDate(event.start, 'YYYY-MM-DD')
            $('#editEvent').modal('toggle');
            $('#EditeventTitle').val(eventObj.title)
            $('#EditDetails').val(eventObj.description)        
          var hh =moment(eventObj.start).format('HH').toString()
          var mm = moment(eventObj.start).format('mm').toString()
         $('#myTimeEdit').val(hh+":"+mm)
            var color_table = ["zero", "rgb(135, 206, 250)", "rgb(255, 250, 205)", "rgb(240, 128, 128)"]
            var change_val = color_table.indexOf(eventObj.color)
            $("#Editimportant").prop('selectedIndex', change_val);
            $('#Editimportant').css('background-color', eventObj.color)

        },
        timeFormat: 'H:mm'
    });
    $('#calendar').fullCalendar('addEventSource', UserEvents);
    $('#calendar').fullCalendar('option', 'height', 450);
}
