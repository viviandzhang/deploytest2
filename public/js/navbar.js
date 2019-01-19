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

  
