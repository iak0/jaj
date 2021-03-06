var main = function() {

    //Timeago
    $("date.timeago").timeago();
    //autosize
    $("#textbox").autosize();

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
    var checkInput = function (event) {
        if ($("#textbox").val().length > 0 && $("#name").val().length > 0) {
            $(".submit").prop("disabled",false)
        } else {
            $(".submit").prop("disabled",true)
        }
    }

    $("#textbox").bind('keyup change cut paste', function() {setTimeout(checkInput, 100)})
    $("#name").bind('keyup change cut paste', function() {setTimeout(checkInput, 100)})

    //Name enter -> next field
    $("#name").keydown(function () {
        if (event.keyCode == '13') {
            event.preventDefault()
            $("#textbox").focus();
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
}

$(document).ready(main)

