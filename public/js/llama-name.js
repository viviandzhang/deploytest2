var colors = [
    "Yellow",
    "Blue",
    "Crimson",
    "Pink",
    "Purple",
    "Teal",
    "Orange",
    ];
    
    
    var adjetives = [
    "Quirky",
    "Happy",
    "Fluffy",
    "Soft",
    "Witty",
    "Kind",
    "Peaceful",
    "Jumpy",
    "Friendly",
    "Joyful",
    "Loving",
    "Bright",
    "Calm", 
    "Tender",
    "Honest",
    "Smooth",
    "Humble",
    "Sacred",
    "Lively",
    "Quiet",
    "Hyper",
    "Polite",
    "Helpful", 
    "Mystic", 
    "Benign", 
    "Chill",
    "Elated",
    "Excited", 
    "Brave",
    "Lucky",
    ]; 
    
    
    function randomize (){
        var randomColor = Math.floor(Math.random()*colors.length); 
        var randomAdj = Math.floor(Math.random()*adjetives.length); 
        var userColor = document.getElementById('name-color'); 
        var userAdj = document.getElementById('name-adj'); 
    
    
        userColor.innerHTML=colors[randomColor];
        userAdj.innerHTML=adjetives[randomAdj]; 
    }
    
    document.getElementById('name-color').onkeypdown= function() {randomize()};
    document.getElementById('name-adj').onkeydown= function() {randomize()};

    function saveUser (user) {
        var chosenColor = document.getElementById('name-color'); 
        var chosenAdj = document.getElementById('name-adj'); 

        //get current user and safe data to user's model/schema
        get('/api/whoami', {}, function(user) {
            console.log(user);
            const navbarDiv = document.getElementById("username");
            if (user.googleid!=undefined) {
              navbarDiv.innerHTML = user.name; 
            }
            if (user.adjetive===undefined) {
                user.findOne({googleid: user.googleid}, function (err, user) {
                    user.adjetive = chosenAdj;
                    user.color = chosenColor; 
                    console.log(chosenAdj); 
                    user.save(function (err) {
                        if(err) {
                            console.error('ERROR!');
                        }
                    });
                });
            }

        });
    }