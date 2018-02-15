$(document).on("pagecreate", "#demo-page", function () {
    myAlert()
    temp = 0;
    zmani = 0;
    item_event = "";
    amountEvents;
    //$("#mySidenav").on('click', function (event) {    // תפריט הדף 
    //    if ($(event.target).attr('goPage') != undefined) {
    //        alert($(event.target).attr('goPage'));
    //        location = $(event.target).attr('goPage');
    //    }

    //})



    $(document).on("swipeleft swiperight", "#list li", function (event) {

        var listitem = $(this),
            dir = event.type === "swipeleft" ? "left" : "right",
            transition = $.support.cssTransform3d ? dir : false;
        confirmAndDelete(listitem, transition);
    });

    function confirmAndDelete(listitem, transition) {
        listitem.children(".ui-btn").addClass("ui-btn-active");
        $("#confirm .topic").remove();
        listitem.find(".topic").clone().insertAfter("#question");

        item_event = listitem.find(".id_Event").clone().text();
        // Show the confirmation popup
        $("#confirm").popup("open");
        // Proceed when the user confirms
        $("#confirm #yes").on("click", function () {
            // Remove with a transition
            if (transition) {
                listitem
                    // Add the class for the transition direction
                    .addClass(transition)
                    // When the transition is done...
                    .on("webkitTransitionEnd transitionend otransitionend", function () {
                        // ...the list item will be removed
                        listitem.remove();
                        // ...the list will be refreshed and the temporary class for border styling removed
                        $("#list").listview("refresh").find(".border-bottom").removeClass("border-bottom");
                    })
                    // During the transition the previous button gets bottom border
                    .prev("li").children("a").addClass("border-bottom")
                    // Remove the highlight
                    .end().end().children(".ui-btn").removeClass("ui-btn-active");

            }
            delite_item(item_event)


        });
        // Remove active state and unbind when the cancel button is clicked
        $("#confirm #cancel").on("click", function () {
            listitem.children(".ui-btn").removeClass("ui-btn-active");
            $("#confirm #yes").off();
        });
    }
});






function myAlert() {
    $("#list").empty();

    var getResMsg = sessionStorage.getItem('myMsg')
    var myMsg = JSON.parse(getResMsg);

    amountEvents = myMsg.length;
    ul = document.getElementById('list');
    ifIhaveEvent()

 

    arr = new Array();
    for (var i = 0; i < myMsg.length; i++) {
        arr[i] = JSON.parse(myMsg[i]);

        var my_time = arr[i].start.slice(11, 16)
        var my_date = arr[i].start.slice(0, 10)

        n_Year = my_date.slice(0, 4) 
        n_Month = my_date.slice(5, 7)
        n_Day = my_date.slice(8, 10)
        new_date = n_Day + "-" + n_Month + "-" + n_Year

        addLi = '<li class="ui-li-has-alt">'
        addLi += '<a href="#demo-mail" class="ui-btn" style="background-color:' + arr[i].color + ';text-shadow:none;   border-radius:8px; margin-top:14px; margin - bottom:14px;">'
        addLi += '  <h3 style="float:right">' + arr[i].title + '</h3><br>'
        addLi += '<p class="topic"style="text-align:center"><strong>' + arr[i].description + '</strong ><span style="display: none" class="id_Event">' + arr[i].id + '</span></p >'
        addLi += '<p>' + my_time + '<br>' + new_date + '</p>'
        addLi += ' </a>  </div>'
        addLi += '</li>';
        $('ul').append(addLi);

    }
}
$('#back').click(function () {
    location = "Calender.html";
});

function delite_item(item) {

    if (temp == zmani) {  // כדי שלר ירוץ על זה שוב 
        temp++;
        zmani = 0;
        --amountEvents
         eventDelete(item)
        ifIhaveEvent()

    }
    else
        zmani++;
}


function ifIhaveEvent()
{
    if (amountEvents == 0) {
        //alert(" נשאר לך   ="+ amountEvents)
        $("#list").css("display", "none");
        $("#no_event").css("display", "block");
        $('#myText').text("אין לך אירועים ");

    }
    else
    $('#myText').text("יש לך      " + amountEvents + "      אירועים ");

}

function eventDelete(item) {
    $(".loader").css("display", "block");
    var eventData =
        {
            id: item
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
        }
    });
}
