var colors = [
    "pink",
    "green",
    "purple",
    "blue",
    "yellow",
    "orange"
    ];
    
    
    var adjectives = [
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
    let randomAdj = Math.floor(Math.random()*adjectives.length); 
    let userColor = document.getElementById('name-color'); 
    let userAdj = document.getElementById('name-adj'); 
    
    userColor.innerHTML=colors[randomColor];
    userAdj.innerHTML=adjectives[randomAdj]; 
}

function chooseNameHandler (user) {
    let chosenColor = document.getElementById('name-color').innerText.toLowerCase(); 
    console.log(chosenColor);
    let chosenAdj = document.getElementById('name-adj').innerText; 
    console.log(chosenAdj);

    if (user!==undefined){
        post('/api/updateUserName', {_id:user._id,
                                        adjective: chosenAdj,
                                        color: chosenColor} 
                                        );
    }
    
}