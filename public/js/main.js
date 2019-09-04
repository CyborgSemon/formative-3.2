$(document).ready(function() {
    console.log('hello world');

    $('#username').click(function() {
        const username = $('#name').val();
        console.log(username);
        if(username.length === 0){
            console.log('please enter a username');
        };
    });
    






});
