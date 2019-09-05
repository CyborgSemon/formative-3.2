let url;

$.ajax({
    url: 'config.json',
    type: 'GET',
    dataType: 'json',
    success:function(keys){
        url = `${keys.SERVER_URL}:${keys.SERVER_PORT}`;
        getAllItems();
    },
    error: function(){
        console.log('cannot find config.json file, cannot run application');
    }
});

function checkUser () {
    if (sessionStorage.userId) {
        $('#fab').show();
        $('.devButtons').css('display', 'flex');
        $('#noUserBtns').hide();
        $('#logoutBtn').show();
    } else {
        $('#fab').hide();
        $('.devButtons').css('display', 'none');
        $('#logoutBtn').hide();
        $('#noUserBtns').show();
    }
}

checkUser();

// Register User
$('#register').submit(function() {
    event.preventDefault();
    if(sessionStorage['userID']) {
        alert('401, permission denied');
        return;
    };
    const username = $('#username').val();
    const password = $('#password').val();
    const passwordCheck = $('#passwordCheck').val();
    const fullName = $('#fullName').val();
    const email = $('#email').val();

    if(username.length == 0){
        console.log('please enter a username');
    } else if (email.length == 0) {
        console.log('please enter an email');
    } else if (fullName.length == 0) {
        console.log('Please enter a full name');
    } else if (password.length == 0) {
        console.log('Plese enter a password');
    } else if (passwordCheck.length == 0) {
        console.log('Plese enter your password again');
    } else if (password != passwordCheck) {
        console.log('Your passwords do not match');
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
                $('#dialog2').hide();
                $('#username').val(null);
                $('#password').val(null);
                $('#passwordCheck').val(null)
                $('#fullName').val(null);
                $('#email').val(null);
                checkUser();
            },
            error:function(err){
                console.log(err);
                console.log('Something went wrong with registering a new user');
            }
        });
    }
});

// Login User
$('#login').submit(()=> {
    event.preventDefault();
    if(sessionStorage.userId) {
        alert('401, permission denied');
        return;
    };
    const username = $('#lUsername').val();
    const password = $('#lPassword').val();
    $.ajax({
        url: `${url}/login`,
        type: 'POST',
        data: {
            username: username,
            password: password
        },
        error: (err)=> {
            console.log('Somthing went wrong with logging in');
            console.log(err);
        },
        success: (result)=> {
            console.log(result);
            sessionStorage.userId = result._id;
            sessionStorage.username = result.username;
            sessionStorage.fullName = result.fullName;
            sessionStorage.email = result.email;
            $('#dialog1').hide();
            $('#lUsername').val(null);
            $('#lPassword').val(null);
            checkUser();
        }
    });
});

// Add item
$('#addItem').submit(()=> {
    event.preventDefault();
    let itemName = $('#itemName').val();
    let itemDescription = $('#itemDescription').val();
    let itemImageUrl = $('#itemImageUrl').val();
    let itemUrl = $('#itemUrl').val();

    if(itemName.length == 0){
        console.log('please enter a username');
    } else if (itemDescription.length == 0) {
        console.log('please enter an email');
    } else if (itemImageUrl.length == 0) {
        console.log('Please enter a full name');
    } else if (itemUrl.length == 0) {
        console.log('Plese enter a password');
    } else  {
        $.ajax({
            url: `${url}/addItem`,
            type: 'POST',
            data: {
                name: itemName,
                author: sessionStorage.fullName,
                url: itemUrl,
                imageUrl: itemImageUrl,
                description: itemDescription,
                userId: sessionStorage.userId
            },
            error: (err)=> {
                console.log('there was an error adding the item');
                console.log(err);
            },
            success: (result)=> {
                getAllItems();
                $('#dialog3').hide();
                $('#itemName').val(null);
                $('#itemDescription').val(null);
                $('#itemImageUrl').val(null);
                $('#itemUrl').val(null);
            }
        });
    }
});

$('#editItem').submit(()=> {
    event.preventDefault();
    let itemName = $('#editItemName').val();
    let itemDescription = $('#editItemDescription').val();
    let itemImageUrl = $('#editItemImageUrl').val();
    let itemUrl = $('#editItemUrl').val();
    let itemId = $('#editInputId').val();

    if(itemName.length == 0){
        console.log('please enter a username');
    } else if (itemDescription.length == 0) {
        console.log('please enter an email');
    } else if (itemImageUrl.length == 0) {
        console.log('Please enter a full name');
    } else if (itemUrl.length == 0) {
        console.log('Plese enter a password');
    } else  {
        $.ajax({
            url: `${url}/editItem`,
            type: 'PATCH',
            data: {
                itemId: itemId,
                name: itemName,
                url: itemUrl,
                imageUrl: itemImageUrl,
                description: itemDescription,
                userId: sessionStorage.userId
            },
            error: (err)=> {
                console.log('there was an error editiing the item');
                console.log(err);
            },
            success: (result)=> {
                getAllItems();
                $('#dialog4').hide();
                $('#editItemName').val(null);
                $('#editItemDescription').val(null);
                $('#editItemImageUrl').val(null);
                $('#editItemUrl').val(null);
            }
        });
    }
});

$('#deleteDelete').click(()=> {
    let itemId = $('#deleteInputId').val();
    $.ajax({
        url: `${url}/deleteItem`,
        type: 'DELETE',
        data: {
            id: itemId,
            userId: sessionStorage.userId
        },
        error: (err)=> {
            console.log('Error deleteing item');
            console.log(err);
        },
        success: (result)=> {
            $(`[data-itemid="${itemId}"]`).parent().parent().parent().remove();
            $('#deleteInputId').val(null);
            $('#dialog5').hide();
        }
    });
});

$('#logoutBtn').click(()=> {
    sessionStorage.clear();
    checkUser();
});

$('#loginBtn').click(()=> {
    $('#dialog1').show();
});

$('#dialogBackground1').click(()=> {
    $('#dialog1').hide();
});

$('#registerBtn').click(()=> {
    $('#dialog2').show();
});

$('#dialogBackground2').click(()=> {
    $('#dialog2').hide();
});

$('#fab').click(()=> {
    $('#dialog3').show();
});

$('#dialogBackground3').click(()=> {
    $('#dialog3').hide();
});

$('#dialogBackground4').click(()=> {
    $('#dialog4').hide();
    $('#editInputId').val(null);
});

$('#deleteCancel').click(()=> {
    $('#dialog5').hide();
    $('#deleteInputId').val(null);
})

$('#dialogBackground5').click(()=> {
    $('#dialog5').hide();
    $('#deleteInputId').val(null);
});

$('#loginBtnCancel').click(()=> {
    $('#dialog1').hide();
});

$('#createBtnCancel').click(()=> {
    $('#dialog2').hide();
});

$('#deleteBtnCancel').click(()=> {
    $('#dialog3').hide();
});

$('#editBtnCancel').click(()=> {
    $('#dialog4').hide();
});



let grid = document.getElementById('projects');
let cards = [];
// prepCards(['a','b','c','d']);

function getAllItems() {
    $.ajax({
        url: `${url}/allItems`,
        type: 'GET',
        error: (err)=> {
            console.log('Cant get all items');
            console.log(err);
        },
        success: (result)=> {
            prepCards(result);
        }
    });
}

function prepCards(cardsArray) {
    cards = [];
    for (var i = 0; i < cardsArray.length; i++) {
        let bottomButtons;
        console.log();
        if (sessionStorage.userId && sessionStorage.userId == cardsArray[i].user_id) {
            bottomButtons = `<div class="cardButtons"><a onclick="event.stopPropagation()" href="${cardsArray[i].url}" target="_blank" class="cardLink">Take a look!</a><div class="devButtons" data-itemid="${cardsArray[i]._id}"><div class="iconButton editItemBtn" onclick="event.stopPropagation()"><i class="material-icons">edit</i></div><div class="iconButton deleteItemBtn" onclick="event.stopPropagation()"><i class="material-icons">delete</i></div></div></div>`;
        } else {
            bottomButtons = `<div class="cardButtons"><a onclick="event.stopPropagation()" href="${cardsArray[i].url}" target="_blank" class="cardLink">Take a look!</a></div>`;
        }
        cards.push(`<div class="card">
        <div class="cardImage">
        <img src="${cardsArray[i].imageUrl}">
        </div>
        <div class="cardText">
        <span class="cardTitle">${cardsArray[i].name}</span>
        <span class="cardAuthor">${cardsArray[i].author}</span>
        <p class="cardDescription">
        ${cardsArray[i].description}
        ${bottomButtons}
        </p>
        </div>
        </div>`);
    }
    loadCards(document.body.clientWidth);
}

// Some stuff
// This is a very cool description. It has all the things that descriptions need. Like, words and... more words
// https://drive.google.com/uc?export=view&id=1NVou7Q4TMnLYXg2voXjWe9e24Gl1xhmW
// https://github.com/CyborgSemon/formative-3.2

function loadCards(newWidth, eventCheck = false) {
    projects.innerHTML = null;
    let columnCheck;
    if (newWidth < 460) {
        $('.column').css('width', '100%');
        projects.innerHTML = `<div class="column" data-colNum="1"></div>`;
        columnCheck = 1;
    } else if (newWidth < 720) {
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
                [].forEach.call(document.querySelectorAll('.card'), (j)=> {
                    j.classList.remove('active');
                });
                e.classList.add('active');
            }

        });
    });
    [].forEach.call(document.querySelectorAll('.editItemBtn'), (e)=> {
        e.addEventListener('click', ()=> {
            $('#editInputId').val(e.parentNode.dataset.itemid);
            $('.projectName').text(e.parentNode.parentNode.parentNode.children[0].innerText);
            $('#dialog4').show();
            $.ajax({
                url: `${url}/oneItem`,
                type: 'POST',
                data: {
                    itemId: e.parentNode.dataset.itemid
                },
                error: (err)=> {
                    console.log('Error finding item');
                    console.log(err);
                },
                success: (result)=> {
                    $('#editItemName').val(result.name);
                    $('#editItemDescription').val(result.description);
                    $('#editItemImageUrl').val(result.imageUrl);
                    $('#editItemUrl').val(result.url);
                }
            });
        });
    });
    [].forEach.call(document.querySelectorAll('.deleteItemBtn'), (e)=> {
        e.addEventListener('click', ()=> {
            $('#deleteInputId').val(e.parentNode.dataset.itemid);
            $('.projectName').text(e.parentNode.parentNode.parentNode.children[0].innerText);
            $('#dialog5').show();
        });
    });
    checkUser();
}

$(window).resize(function() {
    loadCards(document.body.clientWidth);
});
