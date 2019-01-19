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
        let randomColor = Math.floor(Math.random()*colors.length); 
        let randomAdj = Math.floor(Math.random()*adjetives.length); 
        let userColor = document.getElementById('name-color'); 
        let userAdj = document.getElementById('name-adj'); 
    
    
        userColor.innerHTML=colors[randomColor];
        userAdj.innerHTML=adjetives[randomAdj]; 
    }
    
    document.getElementById('name-color').onkeypdown= function() {randomize()};
    document.getElementById('name-adj').onkeydown= function() {randomize()};

    
document.getElementById('choose-name').addEventListener('click', chooseNameHandler);