/**
 * Created by Amir Hossein on 5/6/2017.
 */
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://ce419.herokuapp.com/blog/posts",
    "method": "GET",
    "headers": {
        "x-token": localStorage.getItem("token")
    }
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
result.posts;
var page = document.querySelector(".card-columns");
for(var i = 0 ; i < 3 ; i++){
    var card = document.createElement("div");
    page.appendChild(card);
    card.className = "card";
    var cardHeader = document.createElement("div");
    card.appendChild(cardHeader);
    cardHeader.className = "card-header card-color-default";
    cardHeader.innerHTML = "<div class='author-img'><img src='../assets/images/a2.png'></div><div class='author'>John Wick</div>";
    var cardBlock = document.createElement("div");
    cardBlock.className = "card-block";
    card.appendChild(cardBlock);
    cardBlock.innerHTML = "<div class='post-img'><img src='../assets/images/c1.jpg'><a href='#'><div class='reference'><i class='fa fa-chain'></i></div></a></div>";
    cardBlock.innerHTML = "<h2><a href='post.html?id=" + posts[i].id + "'>" + posts[i].title + "</a></h2>";
    cardBlock.innerHTML = "<p>" + posts[i].summary + "</p><cite class='card-font-color-default'>" + posts[i].datetime + "</cite>";
}