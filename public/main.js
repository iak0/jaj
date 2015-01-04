var main = function() {

    // Focus textbox
    if ($("#name").val().length == 0) {
        $("#name").focus();
    } else {
        $("#textbox").focus();
    }

    //On hover of a message, highlight it and show date/delete
    $(".message").hover(function() {
        $(this).addClass("selected")
        if ($(this).find("b").html() == $("#name").val()) $(this).find(".close").show()
        $(this).find(".date").show();
    }, function() {
        $(this).removeClass("selected")
        $(this).find(".close").hide();
        $(this).find(".date").hide();
    })

    //Textbox enter -> submit
    $("#textbox").keydown(function (event) {
        if (event.keyCode == '13') {
            event.preventDefault();
            if ($(this).val().length > 0 && $("#name").val().length > 0) {
                $(".submit").click()
            }
        }
    })

    //Textbox check length
    $("#textbox").keyup(function (event) {
        if ($(this).val().length > 0 && $("#name").val().length > 0) {
            $(".submit").removeClass('disabled')
        } else {
            $(".submit").addClass('disabled')
        }
    })

    //Name enter -> next field
    $("#name").keydown(function () {
        if (event.keyCode == '13') {
            event.preventDefault()
            $("#textbox").focus();
        }
    })

    //Name check length
    $("#name").keyup(function () {
        if ($(this).val().length > 0 && $("#textbox").val().length > 0) {
            $(".submit").removeClass('disabled')
        } else {
            $(".submit").addClass('disabled')
        }
    })

    //Delete button
    $('.close').click(function(event) {
        $.ajax({
            type: 'DELETE',
            url: '/delete/' + $(this).attr('rel'),
            context: $(this)
        }).done(function(response) {
            $(this).closest(".message").slideUp()
        });
    });

    //Timeago
    $("date.timeago").timeago();
}

$(document).ready(main)

