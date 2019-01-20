// COMPOSER ----------------------
function openComposer() {
  let overlayComposer = document.getElementById('composer');
  overlayComposer.style.display = "flex";
}

function closeComposer() {
  let overlayComposer = document.getElementById('composer');

  let title = document.getElementById('comp-title');
  let body = document.getElementById('comp-body');

  let categories = document.getElementsByClassName('comp-categories');

  for(let i=0; i<categories.length; i++){
    categories[i].className = "comp-categories";
  }
  title.value="";
  body.value="";
  overlayComposer.style.display = "none";
}

function makeCategoriesSelectable() {
  let categories = document.getElementsByClassName('comp-categories');

  for(let i=0; i<categories.length; i++){
    categories[i].addEventListener('click', function(){
      if (categories[i].className === "comp-categories comp-categories-selected"){
        categories[i].className = "comp-categories";
      } else {
        categories[i].className = "comp-categories comp-categories-selected";
      }
    })
  }
}
makeCategoriesSelectable();

const closeNewDilemma = document.getElementById('close');
const overlay = document.getElementById('overlay');
closeNewDilemma.addEventListener('click', closeComposer)
overlay.addEventListener('click', closeComposer)
const cancelNewDilemma = document.getElementById('cancel-button');
cancelNewDilemma.addEventListener('click', closeComposer)


// NAVBAR ----------------------
function newNavbarItem(text, url) {
    const item = document.createElement('div');
    item.className = "nav-item";
    const link = document.createElement('a');
    link.href = url;
    link.innerHTML = text;
    item.appendChild(link);

    console.log(item);
    return item;
  }

function renderNavbar(user) {
    const navBarDiv = document.getElementById('nav-wrapper');
    navBarDiv.innerHTML="";

    const navBarMsg = document.createElement('div');
    navBarMsg.className = "nav-item";
    navBarMsg.id = "navbar-message";
    navBarDiv.append(navBarMsg);

    if(user._id !== undefined) {
      if(user.color !== null || user.adjective !== null) {
        navBarMsg.innerHTML = 'Hello, <span id="username">'+user.name+' ('+user.adjective+' '+user.color+' Llama)!</span>';
        navBarDiv.appendChild(newNavbarItem('Browse', '/'));
        navBarDiv.appendChild(newNavbarItem('Your Activity', '/'));
        const newDilemmaButton = document.createElement('button');
        newDilemmaButton.id = 'new-dilemma';
        newDilemmaButton.className = 'nav-item nav-button';
        newDilemmaButton.innerHTML = '<div>Add New Dilemma</div>';
        navBarDiv.appendChild(newDilemmaButton);
        newDilemmaButton.addEventListener('click', openComposer);
      } else {
        navBarMsg.innerHTML = 'Hello, <span id="username">'+user.name+'! Please choose your llama name'+'</span>';
      }
    } else {
      navBarMsg.innerHTML = 'Hello, <span id="username">and welcome to Dilemma Llama!</span>';
      const linkToGoogle = document.createElement('a');
      linkToGoogle.href = '/auth/google';

      const signInButton = document.createElement('button');
      signInButton.id = 'login-google';
      signInButton.className = 'nav-item nav-button';
      signInButton.innerHTML = '<div>Login with Google</div>';
      linkToGoogle.appendChild(signInButton);

      navBarDiv.appendChild(linkToGoogle);
      console.log();
    }

  }