/**
 * Created by Amir Hossein on 5/7/2017.
 */
var query = window.location.search.substring(1);
var pair = query.split("=");

var form = new FormData();
form.append("id", pair[1]);

var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://ce419.herokuapp.com/blog/posts",
    "method": "GET",
    "headers": {
        "x-token": localStorage.getItem("token")
    },
    "data": form
};
var posts;
var result;
$.ajax(settings).done(function (response) {
    console.log(response);
    if (response.status == 0) {
        result = response;
        posts = response.posts;
    }
});