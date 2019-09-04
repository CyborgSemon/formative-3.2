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



let grid = document.getElementById('projects');
let cards = [];
prepCards(['a','b','c','d']);

function prepCards(cardsArray) {
	for (var i = 0; i < cardsArray.length; i++) {
		cards.push(`<div class="card">
			<div class="cardImage">
				<img src="https://ichef.bbci.co.uk/news/976/cpsprodpb/F8C9/production/_106398636_mediaitem106398635.jpg" alt="Black hole">
			</div>
			<div class="cardText">
				<span class="cardTitle">First ever image of a black hole</span>
				<span class="cardAuthor">Simon Watson</span>
				<p class="cardDescription">
					Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
					<a onclick="event.stopPropagation()" class="cardButton">Take a look!</a>
				</p>
			</div>
		</div>`);
	}
}

function loadCards(newWidth, eventCheck = false) {
	projects.innerHTML = null;
	let columnCheck;
	if (newWidth < 300) {
		$('.column').css('width', '100%');
		projects.innerHTML = `<div class="column" data-colNum="1"></div>`;
		columnCheck = 1;
	} else if (newWidth < 600) {
		$('.column').css('width', '50%');
		projects.innerHTML = `<div class="column" data-colNum="1"></div><div class="column" data-colNum="2"></div>`;
		columnCheck = 2;
	} else if (newWidth <= 1024) {
		$('.column').css('width', '33.333%');
		projects.innerHTML = `<div class="column" data-colNum="1"></div><div class="column" data-colNum="2"></div><div class="column" data-colNum="3"></div>`;
		columnCheck = 3;
	} else if (newWidth > 1024) {
		$('.column').css('width', '25%');
		projects.innerHTML = `<div class="column" data-colNum="1"></div><div class="column" data-colNum="2"></div><div class="column" data-colNum="3"></div><div class="column" data-colNum="4"></div>`;
		columnCheck = 4;
	}
	for (let i = 0; i < cards.length; i++) {
		document.querySelector(`[data-colNum="${(i % columnCheck) + 1}"]`).innerHTML += cards[i];
	}
	[].forEach.call(document.querySelectorAll('.card'), (e)=> {
		e.addEventListener('click', ()=> {
			if (e.classList.contains('active')) {
				e.classList.remove('active');
			} else {
				e.classList.add('active');
			}
		});
	});
}

$(window).resize(function() {
	loadCards(document.body.clientWidth);
});

loadCards(document.body.clientWidth);

