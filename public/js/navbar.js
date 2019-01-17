//literally copied from catbook workshop 4
//makes navbar links easier to change based on whether logged in or logged out

function newNavbarItem(text, url) {
    const itemLink = document.createElement('a');
    itemLink.className = 'nav-item nav-link';
    itemLink.innerHTML = text;
    itemLink.href = url;
  
    return itemLink
  }
  

  //CHANGE THESE LINKS TO MATCH WHAT WE HAVE //figure this out...
  //logout button is NOT in navbar, but likely in profile. 
  function renderNavbar(user) {
    const navbarDiv = document.getElementById('nav-item-container');
  
    navbarDiv.appendChild(newNavbarItem('Browse', '/'));
    navbarDiv.appendChild(newNavbarItem(user.name, '/u/profile?'+user._id)); //no- should be llama name
  
    if (user._id==undefined){
      navbarDiv.appendChild(newNavbarItem('Login with Google', '/auth/google'));
    } else {
      navbarDiv.appendChild(newNavbarItem('Logout', '/logout')); 
    }
    
  }
  