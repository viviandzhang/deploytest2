var colors = [
    "Pink",
    "Green",
    "Purple",
    "Blue",
    "Yellow",
    "Orange"
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
    let userColor = document.getElementById('llama-thumbnail'); 
    let userAdj = document.getElementById('name-adj'); 
    
    console.log(colors[randomColor]);
  if (colors[randomColor] === 'Pink'){
    userColor.style.backgroundColor = '#F3ACE2';
  }
  if (colors[randomColor] === 'Green'){
    userColor.style.backgroundColor = '#95D74E';
  }
  if (colors[randomColor] === 'Purple'){
    userColor.style.backgroundColor = '#BA98E0';
  }
  if (colors[randomColor] === 'Blue'){
    userColor.style.backgroundColor = '#4ABCF3';
  }
  if (colors[randomColor] === 'Yellow'){
    userColor.style.backgroundColor = '#F2E741';
  }
  if (colors[randomColor] === 'Orange'){
    userColor.style.backgroundColor = '#FFB200';
  }

    //userColor.innerHTML=colors[randomColor];
    userAdj.innerHTML=adjectives[randomAdj]; 
}

function chooseNameHandler (user) {
    // find color then switch hex code back to color ??
    let chosenColor = document.getElementById('llama-thumbnail').style.backgroundColor; 
    if (chosenColor === 'rgb(243, 172, 226)'){
        chosenColor = 'pink';
      }
      if (chosenColor === 'rgb(149, 215, 78)'){
        chosenColor = 'green';
      }
      if (chosenColor === 'rgb(186, 152, 224)'){
        chosenColor = 'purple';
      }
      if (chosenColor === 'rgb(74, 188, 243)'){
        chosenColor = 'blue';
      }
      if (chosenColor === 'rgb(242, 231, 65)'){
        chosenColor = 'yellow';
      }
      if (chosenColor === 'rgb(255, 178, 0)'){
        chosenColor = 'orange';
      }
    let chosenAdj = document.getElementById('name-adj').innerText; 

    if (user!==undefined){
        post('/api/updateUserName', {_id:user._id,
                                        adjective: chosenAdj,
                                        color: chosenColor} 
                                        );
    }
    
}