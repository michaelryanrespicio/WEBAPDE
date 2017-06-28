const URL = 'https://jsonplaceholder.typicode.com';
            const BY = 10;
            var posts, users, last;
            
            function getPosts() {
                return $.ajax({
                    url: URL + '/posts',
                    method: 'GET'
                }).then(function(data){
                    posts = data;
                    last = data.length-1;
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
            
            function loadNext(by) {
                for (var i = last ; i >= last-(by-1) && i >= 0 ; i--) {
                    addPost(i);
                    if (i == 0) 
                        $("#more-post").hide();
                }
                last = i;
            }
            
            function addPost(num) {          
                var pb = document.createElement("div");
                var pc = document.createElement("div");
                var p = document.createElement("div");
                var pbu = document.createElement("div");
                var pt = document.createElement("strong");
                var line = document.createElement("b");
                var user = document.createElement("a");
                var info = document.createElement("div");

                $(pb).addClass("page-background");
                $(pc).addClass("post-container");
                $(p).addClass("post");
                $(pbu).addClass("post-by-user");
                $(pt).addClass("title");
                $(user).addClass("username");
                $(info).addClass("post-info");

                $(pbu).append(pt);
                $(pbu).append(line);
                $(pbu).append(user);
                $(p).append(pbu);        
                $(pc).append(p);        
                $(pc).append(info);
                $(pb).append(pc);

                $(pt).text(posts[num].title);
                line.innerHTML="<br>";

                user.innerHTML = "<b>" + users[posts[num].userId-1].username + "</b>";
                $(user).attr("href", "profile.html?userId=" + posts[num].userId);

                $(info).text(posts[num].body);

                $("#post-div").append(pb);
            }
            
            $(document).ready(function(){
                $("#more-post").click(function(){
                    loadNext(BY);
                });
                
                $.when(getPosts(), getUsers()).done(function(){
                    loadNext(BY);
                    $("a#profile").attr('href', 'profile.html?userId=' + posts[posts.length-1].userId);
                });
            });