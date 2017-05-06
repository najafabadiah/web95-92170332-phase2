/**
 * Created by Amir Hossein on 4/27/2017.
 */
/*$('.line-group').click(function(){
    $(this).hide();
})*/
var token;
var user;
var pass;

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
        "headers": {
            "x-token": token
        },
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
            localStorage.setItem("user", student_number);
            localStorage.setItem("pass", password);
            localStorage.setItem("token", parsed_data.token);
            $('html').fadeOut(1000, function (){
                window.location.replace("blog/index.html");
            });
        }
    });
});

$("#add-post").click(function(){
    $('html').fadeOut(1000, function (){
        window.location.href = "create.html";
    });
});

$("#create-post").click(function(){
    var title = $('#title').val();
    var summary = $('#summary').val();
    var text = $('#text').val();

    var form = new FormData();
    form.append("title", title);
    form.append("summary", summary);
    form.append("text", text);
    /*form.append("student_number", user);
    form.append("password", pass);*/

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://ce419.herokuapp.com/blog/post",
        "method": "POST",
        "headers": {
            "x-token": localStorage.getItem("token")
        },
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
            $('html').fadeOut(1000, function (){
                window.location.replace("index.html");
            });
        }
    });
});




