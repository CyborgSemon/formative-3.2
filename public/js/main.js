$(document).ready(function() {
    let url;

    $.ajax({
      url: 'config.json',
          type: 'GET',
          dataType: 'json',
          success:function(keys){
              serverURL = keys['SERVER_URL'];
              serverPort = keys['SERVER_PORT'];
              url = `${keys['SERVER_URL']}:${keys['SERVER_PORT']}`;
          },
          error: function(){
            console.log('cannot find config.json file, cannot run application');
          }
    });

    // Register User
    $('#register').submit(function() {
        event.preventDefault();
        if(!sessionStorage['userID']) {
            alert('401, permission denied');
            return;
        };
        console.log('button clicked');
        const username = $('#username').val();
        const password = $('#password').val();
        const fullName = $('#fullName').val();
        const email = $('#email').val();


        if(username.length === 0){
            console.log('please enter a username');
        } else if (email.length === 0) {
            console.log('please enter a email');
        } else {
            $.ajax({
                url: `${url}/users`,
                type: 'POST',
                data: {
                    username: username,
                    password: password,
                    fullName: fullName,
                    email: email
                },
                success:function(result){
                    console.log('post');
                    console.log(result);
                    const username = $('#username').val('');
                    const password = $('#password').val('');
                    const fullName = $('#fullName').val('');
                    const email = $('#email').val('');

                },
                error:function(err){
                    console.log(err);
                    console.log('Something went wrong with registering a new user');
                }
            });
        }
    });

    // Login User






});
