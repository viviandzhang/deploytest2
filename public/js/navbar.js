//literally copied from catbook workshop 4
//makes navbar links easier to change based on whether logged in or logged out

function newNavbarItem(text, url) {
    const itemLink = document.createElement('a');
    itemLink.className = 'nav-item nav-link';
    itemLink.innerHTML = text;
    itemLink.href = url;
  
    return itemLink
  }
  

  //CHANGE THESE LINKS TO MATCH WHAT WE HAVE
  function renderNavbar(user) {
    const navbarDiv = document.getElementById('nav-item-container');
  
    navbarDiv.appendChild(newNavbarItem('Home', '/'));
    navbarDiv.appendChild(newNavbarItem('Profile', '/u/profile?'+user._id)); //no- should be llama name
  
    if (user._id==undefined){
      navbarDiv.appendChild(newNavbarItem('Login', '/auth/google'));
    } else {
      navbarDiv.appendChild(newNavbarItem('Logout', '/logout')); 
    }
    
  }
  