/**
 * Created by Amir Hossein on 5/7/2017.
 */
var query = window.location.search.substring(1);
var pair = query.split("=");

var form = new FormData();
form.append("id", pair[1]);

var settings = {
    "async": false,
    "crossDomain": true,
    "url": "https://ce419.herokuapp.com/blog/post?id=" + pair[1],
    "method": "GET",
    "headers": {
        "x-token": localStorage.getItem("token")
    },
    "processData": false,
    "contentType": false,
    "mimeType": "multipart/form-data"
};


var response = JSON.parse($.ajax(settings).responseText);
result = response;


var title = document.querySelector("h1");
title.innerText = result.post["title"];
var paragraph = document.querySelector("p");
paragraph.innerText = result.post["text"];
parseDate(result.post["datetime"]);