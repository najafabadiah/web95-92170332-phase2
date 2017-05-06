/**
 * Created by Amir Hossein on 5/6/2017.
 */
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://ce419.herokuapp.com/blog/post",
    "method": "GET",
    "headers": {
        "x-token": localStorage.getItem("token")
    }
};

$.ajax(settings).done(function (response) {
    //var parsed_data = JSON.parse(response);
    console.log(response);
    if (response.status == 0) {
        $(".author").text(response.posts.length);
    }
});