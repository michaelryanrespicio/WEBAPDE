const URL = 'https://jsonplaceholder.typicode.com';
        const BY = 15;
        var photos, albums, users, last;
            
        function getPhotos() {
            return $.ajax({
                url: URL + '/photos',
                method: 'GET'
            }).then(function(data){
                photos = data;
                last = photos.length-1;
            })
        }
            
        function getAlbums() {
            return $.ajax({
                url: URL + '/albums',
                method: 'GET'
            }).then(function(data){
               albums = data;
            }); 
        }
        
        function getUsers() {
            return $.ajax({
                url: URL + '/users',
                method: 'GET'
            }).then(function(data){
               users = data;
            }); 
        }    
        
        function loadNext(num) {
            for (var i = last ; i >= last-(num-1) && i >= 0 ; i--) {
                addPic(i);
                if (i == 0) {
                    last = -1;
                    $("#more").hide();
                    break;
                }
            }
        }
            
        function addPic(num) {
          var d = document.createElement("div");
          var img = document.createElement("img");

          $(d).addClass("thumbnail");
            
          $(d).attr("data-photoId", num);
          $(img).attr("src", photos[num].thumbnailUrl);

          $(d).append(img);
          $("#container").append(d);
        }
        
        $(document).ready(function(){
            $("#more").click(function(){
               last -= BY;
               loadNext(BY);
            });
            
            $("#close").click(function(){
                $("#modal-bg").css("display", "none");
            });
            
            $(document).on("click", ".thumbnail", function(event){
                var photoId = event.currentTarget.getAttribute("data-photoId");
                var photoUrl = photos[photoId].url;
                var photoTitle = photos[photoId].title;
                var albumId = photos[photoId].albumId-1;
                var userId = albums[albumId].userId-1;
                
                var albumname = albums[albumId].title;
                var uname = users[userId].username;
                
                $("#title").text(photoTitle);
                $("#photo").css("background-image", "url(" + photoUrl + ")");
                $("#album").text(albumname);
                $("#username").text(uname);
                
                $("#username").click(function(){
                   window.location = 'profile.html?userId=' + (userId+1);
                });
                
                $("#album").click(function(){
                   window.location = 'profile.html?userId=' + (userId+1) + '&albumId=' + (albumId+1);
                })
                
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
            
            window.onclick = function(event) {
                if (event.target == document.getElementById("modal-bg")) {
                    $("#modal-bg").css("display", "none");
                }
            }
            
            $.when(getPhotos(), getUsers(), getAlbums()).done(function(){
                loadNext(BY);
                $("a#profile").attr('href', 'profile.html?userId=' + albums[photos[photos.length-1].albumId-1].userId);
            });
        });
