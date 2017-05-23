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

var smonth_length = [ 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29 ];
var month_length = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
var solar_month_name = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
var month_name = {
    "Jan" : 0,
    "Feb" : 1,
    "Mar" : 2,
    "Apr" : 3,
    "May" : 4,
    "Jun" : 5,
    "Jul" : 6,
    "Aug" : 7,
    "Sep" : 8,
    "Oct" : 9,
    "Nov" : 10,
    "Dec": 11
};

function parseDate(str){
    var month = month_name[str[4] + str[5] + str[6]];
    var date = parseInt(str[8] + str[9]);
    var year = parseInt(str[20] + str[21] + str[22] + str[23]);
    convertDate(year, month, date);
}

function convertDate(year, month, day){  ///Month between 0 to 11
    var dyear = year - 1900;
    var q = Math.floor(dyear/4);
    month_length[1] = year % 4 === 0 ? 29 : 28;
    var days = (dyear*365.25);
    for(var i = 0 ; i < month ; i++)
        days += month_length[i];
    days += day;
    days = Math.floor(days);
    console.log(days);
    days -= 78;
    var dsyear = Math.floor(days/365);
    var syear = 1279 + dsyear;
    console.log(syear);
    days -= Math.floor(dsyear/4);
    days -= dsyear*365;
    var i = 0
    while(days > smonth_length[i]) {
        if(i===6)
            days++;
        days -= smonth_length[i];
        i++;
    }
    days--;
    var el = document.querySelector("cite");
    el.innerText = (year-621) + " " + solar_month_name[i] + " " + days;
    console.log(solar_month_name[i]);
    console.log(days);
}


