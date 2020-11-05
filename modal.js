$(function () {

    $("#dialog:ui-dialog").dialog("destroy");

    var name = $("#name"),
        email = $("#email"),
        password = $("#password"),
        allFields = $([]).add(name).add(email).add(password),
        tips = $(".validateTips");

    function updateTips(t) {
        tips
            .text(t)
            .addClass("ui-state-highlight");
        setTimeout(function () {
            tips.removeClass("ui-state-highlight", 1500);
        }, 500);
    }

    function checkLength(o, n, min, max) {
        if (o.val().length > max || o.val().length < min) {
            o.addClass("ui-state-error");
            updateTips("Length of " + n + " must be between " +
                min + " and " + max + ".");
            return false;
        } else {
            return true;
        }
    }

    function checkRegexp(o, regexp, n) {
        if (!(regexp.test(o.val()))) {
            o.addClass("ui-state-error");
            updateTips(n);
            return false;
        } else {
            return true;
        }
    }

    $("#dialog-form").dialog({
        autoOpen: false,
        height: 600,
        width: 650,
        modal: true,
        buttons: {
            "Create new User": function () {
                $(this).attr('id', 'nwUsr');
                var bValid = true;
                allFields.removeClass("ui-state-error");

              
                if (bValid) {
                    fetch('https://jsonplaceholder.typicode.com/posts', {
                        method: 'POST',
                        body: JSON.stringify({
                            name: $('#name1').val(),
                            username: $('#username1').val(),
                            email: $('#email1').val(),
                            phone: $('#phone1').val(),
                            website: $('#website1').val()
                        }),
                        headers: {
                          'Content-type': 'application/json; charset=UTF-8',
                        },
                      })
                        .then((response) => response.json())
                        .then((json) => console.log(json))
                }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () {
            allFields.val("").removeClass("ui-state-error");
        }
    });

    $("#dialog-form1").dialog({
        autoOpen: false,
        height: 600,
        width: 650,
        modal: true,
        buttons: {
            "Update User": function () { 
                var bValid = true;
                allFields.removeClass("ui-state-error");
 

                if (bValid) {
                 
                    var alt = $('input[type=checkbox]:checked').attr('id');

                    var splt = alt.split("_");
                    var id =splt[1];
                    console.log( id);  
                    console.log( $('#name').val());
                    console.log( $('#username').val());
                    console.log( $('#email').val());
                    console.log( $('#phone').val());
                    console.log( $('#website').val());
                    console.log('https://jsonplaceholder.typicode.com/users/' + id);
                    fetch('https://jsonplaceholder.typicode.com/users/' + id, {
                        method: 'PUT',
                        body: JSON.stringify({
                            id: id,
                            name: $('name').val(),
                            username: $('username').val(),
                            email: $('email').val(),
                            phone: $('phone').val(),
                            website: $('website').val(),
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    })
                        .then((response) => response.json())
                        .then((json) => console.log(json))
                   


                    $(this).dialog("close");
                }
            },
            Cancel: function () {
                $(this).dialog("close");
            }
        },
        close: function () {
            allFields.val("").removeClass("ui-state-error");
        }
    });

    $("#create-user").button().click(function () {
        $("#dialog-form").dialog("open");
    });
});