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

    const navBarMsg = document.createElement('div');
    navBarMsg.className = "nav-item";
    navBarMsg.id = "navbar-message";
    navBarDiv.append(navBarMsg);

    if(user._id !== undefined) {
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
      navBarMsg.innerHTML = 'Hello, <span id="username">and welcome to Dilemma Llama!</span>';
      const linkToGoogle = document.createElement('a');
      linkToGoogle.href = '/auth/google';

      const signInButton = document.createElement('button');
      signInButton.id = 'login-google';
      signInButton.className = 'nav-item nav-button';
      signInButton.innerHTML = '<div>Login With Google</div>';
      linkToGoogle.appendChild(signInButton);
      
      navBarDiv.appendChild(linkToGoogle);
      console.log();
    }

  }

  

  
