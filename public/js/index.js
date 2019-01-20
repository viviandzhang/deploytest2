function renderLoggedInFeed(user) {
  const appDiv = document.getElementById('app');
  appDiv.innerHTML =
      '<ul id="categories">' + 
        '<li class="category-selected">All</li>'+
        '<li>Education</li>'+
        '<li>Personal Finance</li>'+
        '<li>Life Issues</li>'+
        '<li>Career</li>' +
        '<li>Fashion</li>' +
        '<li>Relationships</li>' +
        '<li>Spirituality</li>' +
        '<li>Random</li>' +
      '</ul>' +
      '<div id="feed"></div>';
  renderFeed(user);
}

function renderLlamaNamePicker() {
  const appDiv = document.getElementById('app');
  appDiv.innerHTML = 
      '<div id="name-generator">'+
            '<div>Press any key to create your llama identity</div>'+
            '<div id="greeting">' +
                '<div class=name-fixed>'+
                    'Welcome,'+
                '</div>'+
                '<div id= name-adj class=name-adjcolor onkeypress=randomize()>'+
                    'Happy'+ 
                '</div>'+
                '<div id = name-color class=name-adjcolor onkeypress=randomize()>'+
                  'Blue'+
                '</div>'+
                '<div class=name-fixed>'+
                    'Llama'+
                '</div>'+
            '</div>'+

            '<button id="choose-name">'+
                   'I choose this name'+
            '</button>'+
        '</div>'
}

function renderSignIn() {
  const appDiv = document.getElementById('app');
  appDiv.innerHTML =
      '<div id="signin-description">'+
        '<div id="signin-1">'+
            'Llamas helping llamas solve dilemmas.'+
        '</div>'+
        '<div id="signin-2">'+
                "If you're a llama with a dilemma, you're in the right place. " +
                'Ask a yes or no question to our community of llamas, who will'+
                ' point you in the right direction.'+
        '</div>'+
      
        '<button id=become-llama>'+
        '    <a class = "become-llama-text" href="/auth/google">Login with Google</a>'+
        '</button>'+
    '</div>'
}

function renderNextButton(user_id){
  const nextButton = document.createElement('div');
  nextButton.id = "next-button";
  nextButton.innerHTML="next";

  nextButton.addEventListener('click', function(){
    get('/api/userById', {_id:user_id}, function(user){
      renderApp(user);
      renderNavbar(user);
      console.log(user);
    });
  })

  return nextButton;
}

function renderApp(user) {
  const appDiv = document.getElementById('app');
  if(user._id !== undefined) {
    if(user.color !== null || user.adjective !== null){
      const postDilemma = document.getElementById('post-button');
      postDilemma.addEventListener('click', function(){
        submitDilemmaHandler(user)});
      renderLoggedInFeed(user);
    } else {
      renderLlamaNamePicker();
      document.getElementById('choose-name').addEventListener('click', function(){
        chooseNameHandler(user);
        document.getElementById('name-generator').appendChild(renderNextButton(user._id));
      });
    }
  } else {
    renderSignIn();
  }
}

function main() {
    get('/api/whoami', {}, function(user) {
      if(user._id !== undefined) {
        get('/api/userById', {_id:user._id}, function(userDBItem){
          console.log(userDBItem);
          renderNavbar(userDBItem);
          renderApp(userDBItem);
        })
      } else {
        renderNavbar(user);
        renderApp(user);
      }
    });
  }
  
  main();
  