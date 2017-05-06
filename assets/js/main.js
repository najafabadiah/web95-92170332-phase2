/**
 * Created by Amir Hossein on 4/27/2017.
 */
/*$('.line-group').click(function(){
    $(this).hide();
})*/
var token;

$("#create-account").click(function(){
    var student_number = $('#student-number').val();
    var password = $('#password').val();
    var first_name = $('#f-name').val();
    var last_name = $('#l-name').val();
    var email = $('#email').val();
    var form = new FormData();
    form.append("student_number", student_number);
    form.append("password", password);
    form.append("first_name", first_name);
    form.append("last_name", last_name);
    form.append("email", email);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://ce419.herokuapp.com/auth/register",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    $.ajax(settings).done(function (response) {
        var parsed_data = JSON.parse(response);
        console.log(response);
        $('#error').html(parsed_data.message);
        if (parsed_data.status == 0) {
            $('#error').css("color" , "#00cc11");
            $('#error').html("Successful");
            $('html').fadeOut(1000, function (){
                window.location.href = "login.html";
            });
        }
    });
});

$("#enter").click(function(){
    var student_number = $('#student-number').val();
    var password = $('#password').val();
    var form = new FormData();
    form.append("student_number", student_number);
    form.append("password", password);

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://ce419.herokuapp.com/auth/login",
        "method": "POST",
        "processData": false,
        "contentType": false,
        "mimeType": "multipart/form-data",
        "data": form
    }

    $.ajax(settings).done(function (response) {
        var parsed_data = JSON.parse(response);
        console.log(response);
        $('#error').html(parsed_data.message);
        if (parsed_data.status == 0) {
            $('#error').css("color" , "#00cc11");
            $('#error').html("Successful");
            token = parsed_data.token;
            /*$('html').fadeOut(1000, function (){
                window.location.replace("login.html");
            });*/
        }
    });
});
