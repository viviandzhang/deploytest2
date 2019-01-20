function renderApp(user) {
  const appDiv = document.getElementById('app');
  if(user._id !== undefined) {
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
      '<div id="feed"></div>'
    
    
  } else {
    appDiv.innerHTML =
      '<div id="signin-description">'+
        '<div id="signin-1">'+
            'Llamas helping llamas solve dilemmas.'+
        '</div>'+
        '<div id="signin-2">'+
                "If you're a llama with a dilemma, you're in the right place." +
                'Ask a yes or no question to our community of llamas, who will'+
                'point you in the right direction.'+
        '</div>'+
      
        '<button id=become-llama>'+
        '    <a href="/auth/google">Become a Llama</a>'+
        '</button>'+
    '</div>'

  }
}

function main() {
    get('/api/whoami', {}, function(user) {
      console.log(user);
      renderNavbar(user);
      renderApp(user);
      renderFeed();
    });
  }
  
  main();
  