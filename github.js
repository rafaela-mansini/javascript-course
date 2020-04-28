var button_search = document.querySelector('#button_search');
var user_git = document.querySelector('#user_github');

var search_promise = function(){
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.github.com/users/' + user_git.value);
        xhr.send(null);
        
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    resolve(JSON.parse(xhr.responseText));
                }
                else{
                    reject('Request wrong');
                }
            }
        }
    });
}

function search_user(){
    search_promise()
        .then(function(response){
            render_user(response);
        })
        .catch(function(error){
            console.warn(error);
        });
}

function render_user(user){
    var content_user = '';
    
    content_user += '<img src="'+ user.avatar_url +'" tile="'+ user.name +'">';
    content_user += '<p>'+ user.name +'</p>';
    content_user += '<span class="location">'+ user.location +'</span>';
    content_user += '<p>'+ (user.bio || 'nothing to say') +'</p>';

    content_user += '<div class="follow">';
    content_user += '<span>Public repositories: '+ user.public_repos +'</span>';
    content_user += '<span>Followers: '+ user.followers +'</span>';
    content_user += '<span>Following: '+ user.following +'</span>';
    content_user += '</div>';

    content_user += '<a href="'+ user.html_url +'" target="_blank">See repositories</a>';
    
    document.querySelector('.user').innerHTML = content_user;
}

button_search.onclick = function(){
    var user = search_user() || [];

    user_git.value = '';
    user_git.focus();    
}
