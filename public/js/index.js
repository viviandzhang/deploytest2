function renderLoggedInFeed(user) {
  const body = document.getElementsByTagName('body');
  body[0].removeEventListener('keydown', randomize);
  const appDiv = document.getElementById('app');
  appDiv.innerHTML =
      '<ul id="categories">' + 
        '<li class="feed-cat category-selected">All</li>'+
        '<li class="feed-cat">Education</li>'+
        '<li class="feed-cat">Personal Finance</li>'+
        '<li class="feed-cat">Life Issues</li>'+
        '<li class="feed-cat">Career</li>' +
        '<li class="feed-cat">Fashion</li>' +
        '<li class="feed-cat">Relationships</li>' +
        '<li class="feed-cat">Spirituality</li>' +
        '<li class="feed-cat">Random</li>' +
      '</ul>' +
      '<div id="feed"></div>';
  renderFeed(user);

  let categoriesArr = document.getElementsByClassName("feed-cat");
  for (let i=0; i<categoriesArr.length; i++){
    categoriesArr[i].addEventListener('click', function(){
      if (this.innerText==="All"){
        renderFeed(user)
      } else {
        renderFeedByCategory(user, this.innerText);
      }
      for (let j=0; j<categoriesArr.length; j++) {
        categoriesArr[j].className = "feed-cat";
      }
      categoriesArr[i].className = "feed-cat category-selected";
   })
  }
}

function renderLlamaNamePicker() {
  const appDiv = document.getElementById('app');
  const body = document.getElementsByTagName('body');
  body[0].addEventListener('keydown', randomize);
  appDiv.innerHTML = 
    '<div id=clouds>' + 
      '<div id=cloud1>' +
      '</div'+
      '<div id=cloud2>' +
      '</div'+
      '<div id=cloud3>' +
      '</div'+
      '<div id=cloud4>' +
      '</div'+
      '<div id=cloud5>' +
      '</div'+
      '<div id=cloud6>' +
      '</div'+ 
    '</div>'+ 
    
      '<div id="name-generator">'+
        '<div id="generator-container" class = "generator-container">' +
            '<div id="greeting">' +
                '<div class=name-fixed>'+
                    'Welcome,'+
                '</div>'+
                '<div id = "name-container">'+
                    '<div id = "llama-thumbnail" onkeypress=randomize()>' +
                    '</div>' +
                    '<div id= name-adj class=name-adjcolor onkeypress=randomize()>'+
                      'Happy'+ 
                    '</div>'+
                    '<div class=name-fixed>'+
                      'Llama'+
                '</div>' +
              '</div>'+
            '</div>'+
            '<div id = "press-key-title">Press any key to create your llama identity</div>'+
            '<button id="choose-name" class = "sign-in-button">'+
                   'I choose this name'+
            '</button>'+
        '</div>' +
      '</div>' + 

      '<div id=llama-landscape-name>' + 
      '</div>'
  randomize();
}

function renderSignIn() {
  const appDiv = document.getElementById('app');
  appDiv.innerHTML =
    '<div id=clouds>' +
      '<div id=cloud1>' +
      '</div'+
      '<div id=cloud2>' +
      '</div'+
      '<div id=cloud3>' +
      '</div'+
      '<div id=cloud4>' +
      '</div'+
      '<div id=cloud5>' +
      '</div'+
      '<div id=cloud6>' +
      '</div'+ 
    '</div>' + 

    '</div>' + 
      '<div id="signin-description">'+
        '<div id="signin-1">'+
            'Llamas helping llamas solve dilemmas.'+
        '</div>'+
        '<div id="signin-2">'+
                "If you're a llama with a dilemma, you're in the right place. " +
                'Ask a yes or no question to our community of llamas, who will'+
                ' point you in the right direction.'+
        '</div>'+
      
        '<button id=become-llama class="sign-in-button">'+
        '    <a class = "become-llama-text" href="/auth/google"> Become a Llama </a>'+
        '</button>'+

        '<div id= llama-landscape>' + 
        '</div>'+
      '</div>'
  
}

function renderNextButton(user_id){
  let chooseName = document.getElementById('choose-name');
  let pressKeyTitle = document.getElementById('press-key-title');
  let nameContainer = document.getElementById('name-container');
  /*chooseName.style.backgroundColor = '#46D9E5';
  chooseName.style.color = '#ffffff';*/
  chooseName.style.display = 'none';
  pressKeyTitle.style.display = 'none';
  nameContainer.style.backgroundColor = '#ffffff';
  nameContainer.style.width = 'max-content';
  const nextButton = document.createElement('div');
  nextButton.id = "next-button";
  nextButton.innerHTML="Begin your Llama life";

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
      document.getElementById('generator-container').appendChild(renderNextButton(user._id));
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
  