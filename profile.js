const URL = 'https://jsonplaceholder.typicode.com';
            const BY = 5;
            var u_id, a_id = null;
            var posts, user, photos, albums;
            var lastPost, lastAlbum;
            
            function getPosts(){
                return $.ajax({
                    url: URL + '/posts?userId=' + (u_id+1),
                    method: 'GET'
                }).then(function(data){
                    posts = data;
                    lastPost = posts.length-1;
                });
            }
            
            function getUser(){
                return $.ajax({
                    url: URL + '/users?id=' + (u_id+1),
                    method: 'GET'
                }).then(function(data){
                    user = data[0];
                });
            }
            
            function getPhotos(){
                str ='';
                for (var i = 0 ; i < albums.length ; i++)
                    str += '&albumId=' + albums[i].id;
                
                return $.ajax({
                    url: URL + '/photos?' + str,
                    method: 'GET'
                }).then(function(data){
                    photos = data;
                });
            }
            
            function getAlbums(){
                return $.ajax({
                    url: URL + '/albums?userId=' + (u_id+1),
                    method: 'GET'
                }).then(function(data){
                    albums = data;
                    lastAlbum = albums.length-1;
                    /*if (lastAlbum > BY)
                    a_id = albums[lastAlbum-]*/
                });
            }
            
            function loadPhotosToAlbums(){
                var photoscpy = photos.slice();
                
                for (var i = 0 ; i < albums.length ; i++) {
                    albums[i].photos = [];
                    for (var j = photoscpy.length-1 ; j >= 0 ; j--) {
                        if (albums[i].id == photoscpy[j].albumId) {
                            albums[i].photos.push(photoscpy[j]);
                            photoscpy.splice(j,1);
                        }
                    }
                }
            }
            
            function loadHeader() {
                $("#profile-name").text(user.name);
                $("#profile-username").text("(" + user.username + ")");
            }
            
            function loadAbout(){
                var p = document.createElement("p");
                $(p).text("email: " + user.email);
                $(".about").append(p);
                
                p = document.createElement("p");
                $(p).text("address:");
                $(".about").append(p);
                
                p = document.createElement("p");
                $(p).addClass("indent");
                $(p).text(user.address.street);
                $(".about").append(p);
                
                p = document.createElement("p");
                $(p).addClass("indent");
                $(p).text(user.address.suite);
                $(".about").append(p);
                
                p = document.createElement("p");
                $(p).addClass("indent");
                $(p).text(user.address.city);
                $(".about").append(p);
                
                p = document.createElement("p");
                $(p).addClass("indent");
                $(p).text(user.address.zipcode);
                $(".about").append(p);
                
                p = document.createElement("p");
                $(p).text("phone: " + user.phone);
                $(".about").append(p);
                
                p = document.createElement("p");
                $(p).text("website: " + user.website);
                $(".about").append(p);
                
                p = document.createElement("p");
                $(p).text("company:");
                $(".about").append(p);
                
                p = document.createElement("p");
                $(p).addClass("indent");
                $(p).text("name: " + user.company.name);
                $(".about").append(p);
                
                p = document.createElement("p");
                $(p).addClass("indent");
                $(p).text('"' + user.company.catchPhrase + '"');
                $(".about").append(p);
                
                p = document.createElement("p");
                $(p).addClass("indent");
                $(p).text("business: " + user.company.bs);
                $(".about").append(p);
            }
            
            function loadNextPosts(num) {
                for (var i = lastPost ; i >= lastPost-(num-1) && i >= 0; i--) {
                    addPost(i);
                    if (i == 0) {
                        lastPost = -1;
                        $("#more-post").hide();
                    }
                }
                lastPost = i;
            }
            
            function loadUntilAlbum() {
                for (var i = lastAlbum ; albums[i].id >= a_id+1 ; i--)
                    addAlbum(i);
                lastAlbum = i;
            }
            
            function loadNextAlbums(num) {
              for (var i = lastAlbum ; i >= lastAlbum-(num-1) && i >= 0; i--) {
                    addAlbum(i);
                    if (i == 0) 
                        $("#more-album").hide();
              }
              lastAlbum = i;
            }
            
            function addPost(num) {
               var pc = document.createElement("div");
               var p = document.createElement("div");
               var pbu = document.createElement("div");
               var title = document.createElement("strong");
               var uname = document.createElement("a");
               var inf = document.createElement("div");
                
               $(pc).addClass("post-container");
               $(p).addClass("post");
               $(pbu).addClass("post-by-user");
               $(title).addClass("title");
               $(uname).addClass("username");
               $(inf).addClass("post-info");
                
                $(title).text(posts[num].title);
                uname.innerHTML = "<b>" + user.username + "</b>";
                $(uname).attr('href', document.URL);
                $(inf).text(posts[num].body);
                
                $(pbu).append(title);
                $(pbu).append(document.createElement("br"));
                $(pbu).append(uname);
                $(pbu).append(inf);
                $(p).append(pbu);
                $(pc).append(p);
                
                $(".post-div").append(pc);
            }
            
            function addAlbum(num) {
                var ac = document.createElement("div");
                var ah = document.createElement("div");
                var title = document.createElement("strong");
                var tn = document.createElement("div");
                var img = document.createElement("img");
                
                $(ac).addClass("album-container");
                if (a_id != null && albums[num].id == a_id+1)
                    $(ac).attr("id", "scroll");
                $(title).addClass("title");
                $(tn).addClass("thumbnail");
                $(tn).addClass("album-pic");
                
                var al = albums[num];
                var ph = al.photos[al.photos.length-1];
                
                $(title).text(albums[num].title);
                $(img).attr("src", ph.thumbnailUrl);
                
                $(ah).append(title);
                $(ah).append(tn);
                $(tn).append(img);
                $(ac).append(ah);
                addPhotos(num, ac);
                $(".album-div").append(ac);
            }
            
            function addPhotos(albumId, container) {
                var album = albums[albumId];
                var pc = document.createElement("div");
                $(pc).addClass("photos-container");
                
                for (var i = album.photos.length-1 ; i >= 0 ; i--) {
                    var tn = document.createElement("div");
                    var img = document.createElement("img");
                    
                    $(tn).addClass("thumbnail");
                    $(tn).addClass("photo-pic");
                    
                    $(tn).attr('data-photoId', i);
                    $(tn).attr('data-albumId', albumId)
                    $(img).attr('src', album.photos[i].thumbnailUrl);
                    
                    $(tn).append(img);
                    $(pc).append(tn);
                }
                
                $(container).append(pc);
                if (a_id == null || album.id != a_id+1)
                    $(pc).hide();
            }
            
            $(document).ready(function(){
                
                var urlStr = document.URL;
                urlStr = urlStr.substr(urlStr.indexOf("?")+1);
                urlStr = urlStr.split("&", 2);
                u_id = urlStr[0].substr(urlStr[0].indexOf("=")+1);
                u_id--;
                if (urlStr.length == 2) {
                    a_id = urlStr[1].substr(urlStr[1].indexOf("=")+1);
                    a_id--;
                }
                
                $.when(getUser(), getPosts()).done(function(){
                    loadHeader();
                    loadAbout();
                    loadNextPosts(BY);
                })
                
                $.when(getAlbums()).done(function(){
                   $.when(getPhotos()).done(function(){
                       loadPhotosToAlbums();
                       
                       if (a_id != null) {
                           
                           loadUntilAlbum();
                           
                            $('html, body').animate({
                               scrollTop: $("#scroll").offset().top - 80}, 500);
    
                       } else loadNextAlbums(BY);
                   });
                });
                
                if (urlStr.length == 2) 
                    showAlbums();
                else showPosts();
                
                $("#more-post").click(function(){
                    loadNextPosts(BY);
                });
                
                $("#more-album").click(function(){
                    loadNextAlbums(BY);
                });
                
                $("#post-button").click(function(){
                    showPosts();
                });
                
                $("#album-button").click(function(){
                    showAlbums();
                });
                
                $(document).on('click', '.album-pic', function(){
                    var pc = $(this).parent().parent().find(".photos-container");
                    $(pc).stop();
                    $(pc).toggle(500);
                });
                
                $(document).on('click', '.photo-pic', function(event){
                    var photoId = event.currentTarget.getAttribute("data-photoId");
                    var albumId = event.currentTarget.getAttribute("data-albumId");
                    var album = albums[albumId];
                    var photo = album.photos[photoId];
                    
                    $("#title").text(photo.title);
                    $("#photo").css("background-image", "url(" + photo.url + ")");
                    $("#album").text(album.title);
                    $("#username").text(user.username);
                    
                    $("#modal-bg").css("display", "flex");
                });
                
                $(document).on("mouseover", "#photo", function(event){
                    $(".photo-info-bg").stop();
                    $(".photo-info-bg").fadeIn(250);
                });

                $(document).on("mouseout", "#photo", function(event){
                    $(".photo-info-bg").stop();
                    $(".photo-info-bg").fadeOut(250);
                });
                
                $("#close").click(function(){
                    $("#modal-bg").css("display", "none");
                });
                
                window.onclick = function(event) {
                    if (event.target == document.getElementById("modal-bg")) {
                        $("#modal-bg").css("display", "none");
                    }
                }
                
                $("#username").click(function(){
                   window.location = document.URL; 
                });
            });
            
            function showPosts() {
                $(".profile-album-container").hide();
                $(".profile-posts-container").show();
            }
            
            function showAlbums() {
                $(".profile-posts-container").hide();
                $(".profile-album-container").show();
            }