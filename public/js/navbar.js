//literally copied from catbook workshop 4
//makes navbar links easier to change based on whether logged in or logged out
/*
function newNavbarItem(text, url) {
    const itemLink = document.createElement('a');
    itemLink.className = 'nav-item nav-link';
    itemLink.innerHTML = text;
    itemLink.href = url;
  
    return itemLink; 
  }
  */

  //CHANGE THESE LINKS TO MATCH WHAT WE HAVE //figure this out...
  //logout button is NOT in navbar, but likely in profile. 
  function renderNavbar() {

    get('/api/whoami', {}, function(user) {
      console.log(user);
      const navbarDiv = document.getElementById("username");
      if (user.googleid!=undefined) {
        navbarDiv.innerHTML = user.name; 
      }
    });
  }

  renderNavbar();

  
/*
  <nav>
  <div id="nav-wrapper">
      <div class="nav-item user-header">Hello, <span class="username">username123!</span></div>
      
      <div class="nav-item nav-item-selected"><a href="/">Browse</a></div>
      <div class="nav-item"><a href="/activity">Your Activity</a></div>
      <button id="new-dilemma" class="nav-item">
          Add New Dilemma
        </button>
      
  </div>
</nav>
*/