// for timestamps: https://mattbradley.github.io/livestampjs/

// ------- Render feed ------

function renderFeed(user) {
  let dilemmaDiv = document.getElementById('feed');
  dilemmaDiv.innerHTML = "";
  let feedHeaderDiv = document.getElementById('feed-header');
  feedHeaderDiv.innerHTML = "";


  get('/api/dilemmas', {}, function(dArray) {
    for (let i = 0; i < dArray.length; i++) {
      const currentDilemma = dArray[i];
      const newDilemmaDOMObj = dilemmaDOMObject(currentDilemma, user)
      dilemmaDiv.prepend(newDilemmaDOMObj);
      let yes_votes = 0;
      let no_votes = 0;

      // render comments
      get('/api/comments', { 'parent_id' : currentDilemma._id }, function(cArray) {
        document.getElementById('number-comments'+currentDilemma._id).innerText = cArray.length;
        for (let i = 0; i < cArray.length; i++) {
          let currentComment = cArray[i];
          if (currentComment.yes_or_no === "yes") {
            yesDiv = document.getElementById('comments-yes' + currentComment.parent_id)
            yesDiv.prepend(commentDOMObject(currentComment, user));
            yes_votes = yes_votes + currentComment.votes;
          } else {
            noDiv = document.getElementById('comments-no' + currentComment.parent_id)
            noDiv.prepend(commentDOMObject(currentComment, user));
            no_votes = no_votes + currentComment.votes;
          }
        }
        updateDilemmaVotes(currentDilemma._id, yes_votes, no_votes);
        
      })
    }
  });
}

function renderCategoryHeader (category) {
  const categoryDiv = document.createElement ('div');
  categoryDiv.className = 'category-div';

  const categoryImageBack = document.createElement ('div');
  categoryImageBack.className = 'category-image-back';
  categoryDiv.appendChild(categoryImageBack);

  const categoryImage = document.createElement ('div');
  categoryImage.className = 'category-image';
  categoryImageBack.appendChild(categoryImage);

  const categoryHeader = document.createElement('div');
  categoryHeader.className = 'category-header';
  categoryDiv.appendChild(categoryHeader);

  const categoryTitle = document.createElement('div');
  categoryTitle.className = 'category-title';
  categoryHeader.appendChild(categoryTitle);

  const categoryDesc = document.createElement('div');
  categoryDesc.className = 'category-desc';
  categoryHeader.appendChild(categoryDesc);


  if (category === "Education"){
    categoryTitle.innerText = 'Education';
    categoryImage.style.backgroundPosition = 'center top';
    categoryDesc.innerText = 'Welcome to the Education category, where you can post any education dilemmas. Have a dilemma about schools or coursework? Your new llama friends can help!';
  }
  if (category === "Personal Finance"){
    categoryImage.style.backgroundPosition = 'center -60px';
    categoryTitle.innerText = 'Personal Finance';
    categoryDesc.innerText = 'Welcome to the Personal Finance category, where you can post any personal finance dilemmas. Llamas know a lot about money and love to be helpful!';
  }
  if (category === "Life Issues") {
    categoryImage.style.backgroundPosition = 'center -120px';
    categoryTitle.innerText = 'Life Issues';
    categoryDesc.innerText = 'Welcome to the Life Issues category, where you can post any life issues dilemmas. Have a dilemma about about any of lifes great issues (or small issues)? Ask your fellow llamas!';
  }
  if (category === "Career") {
    categoryImage.style.backgroundPosition = 'center -180px';
    categoryTitle.innerText = 'Career';
    categoryDesc.innerText = 'Welcome to the Career category, where you can post any career dilemmas. Not sure what to do next in your career or even how to get started? Ask your llama friends to help!';
  }
  if (category === "Fashion") {
    categoryImage.style.backgroundPosition = 'center -240px';
    categoryTitle.innerText = 'Fashion';
    categoryDesc.innerText = 'Welcome to the Fashion category, where you can post any fashion dilemmas. Llamas are super fashionable, so ask them about any of your outfit dilemmas!';
  }
  if (category === "Relationships") {
    categoryImage.style.backgroundPosition = 'center -300px';
    categoryTitle.innerText = 'Relationships';
    categoryDesc.innerText = 'Welcome to the Relationship category, where you can post any relationship dilemmas. Have any big relationship dilemmas in your life? Ask the llamas for help!';
  }
  if (category === "Spirituality") {
    categoryImage.style.backgroundPosition = 'center -360px';
    categoryTitle.innerText = 'Spirituality';
    categoryDesc.innerText = 'Welcome to the Spirituality category, where you can post any spiritual dilemmas. This is an inclusive, safe space to get opinions on your spiritual dilemmas from other llamas';
  }
  if (category === "Random") {
    categoryImage.style.backgroundPosition = 'center -420px';
    categoryTitle.innerText = 'Random';
    categoryDesc.innerText = 'Welcome to the Random category, where you can post any random dilemmas. Not sure which category to put your dilemma under? Put it here!';
  }
  return categoryDiv;
}


function renderFeedByCategory(user, category) {
  let dilemmaDiv = document.getElementById('feed');
  let feedHeaderDiv = document.getElementById('feed-header');
  feedHeaderDiv.innerHTML = "";
  dilemmaDiv.innerHTML = "";


  get('/api/dilemmas', {}, function(dArray) {
    for (let i = 0; i < dArray.length; i++) {
      const currentDilemma = dArray[i];
      let isInCategory = false;

      for (let i=0; i< currentDilemma.categories.length; i++){
        if (currentDilemma.categories[i]===category){
          isInCategory = true;
          break;
        }
      }

      if (isInCategory) {
        const newDilemmaDOMObj = dilemmaDOMObject(currentDilemma, user)
        dilemmaDiv.prepend(newDilemmaDOMObj);
        let yes_votes = 0;
        let no_votes = 0;

        // render comments
        get('/api/comments', { 'parent_id' : currentDilemma._id }, function(cArray) {
          document.getElementById('number-comments'+currentDilemma._id).innerText = cArray.length;
          for (let i = 0; i < cArray.length; i++) {
            let currentComment = cArray[i];
            if (currentComment.yes_or_no === "yes") {
              yesDiv = document.getElementById('comments-yes' + currentComment.parent_id)
              yesDiv.prepend(commentDOMObject(currentComment, user));
              yes_votes = yes_votes + currentComment.votes;
            } else {
              noDiv = document.getElementById('comments-no' + currentComment.parent_id)
              noDiv.prepend(commentDOMObject(currentComment, user));
              no_votes = no_votes + currentComment.votes;
            }
          }
          updateDilemmaVotes(currentDilemma._id, yes_votes, no_votes);
        })
      }
    }
    feedHeaderDiv.append(renderCategoryHeader(category));
  });
  

}

// ----------- Update dilemmas on the front end -------------
function updateDilemmaVotes(dilemma_id, yes_votes, no_votes){
  let currentNoVotes=0;
  let currentYesVotes=0;

  if (yes_votes !== null) {
    currentYesVotes = yes_votes;
  } else {
    currentYesVotes = parseInt(document.getElementById("votes-yes"+dilemma_id).innerText);
  }

  if (no_votes !== null) {
    currentNoVotes = no_votes;
  } else {
    currentNoVotes = parseInt(document.getElementById("votes-no"+dilemma_id).innerText);
  }

  document.getElementById("votes-yes"+dilemma_id).innerText = currentYesVotes;
  document.getElementById("votes-no"+dilemma_id).innerText = currentNoVotes;
  updateStatusBadge(dilemma_id, currentYesVotes, currentNoVotes);

  post('api/updateDilemmaVotes', {_id: dilemma_id, votes_yes: yes_votes, votes_no: no_votes})
}

function updateStatusBadge(dilemma_id, yes_votes, no_votes){
  let statusDiv = document.getElementById('d-card-status'+dilemma_id);
  statusDiv.innerHTML = "";

  const statusBadge = document.createElement('div');
  statusBadge.className = 'status-badge';

  let statusBadgePercent;
  
  const statusText = document.createElement('div');
  statusText.className = 'status-text';

  if (yes_votes > no_votes) {
    statusBadgePercent = yes_votes / (yes_votes + no_votes);
    statusText.innerText = 'for yes';
    statusBadge.classList.add('status-badge-yes');
  }
  else if (yes_votes === no_votes) {
    statusBadgePercent = .50;
    statusText.innerText = 'tied';
    statusBadge.classList.add('status-badge-tied');
  }
  else{
    statusBadgePercent = no_votes / (yes_votes + no_votes);
    statusText.innerText = 'for no';
    statusBadge.classList.add('status-badge-no');
  }
  if (yes_votes === 0 & no_votes === 0){
    statusBadgePercent = 0;
    statusText.innerText = 'no votes yet!';
  }
  statusBadgePercent = Math.floor(statusBadgePercent * 100);
  statusBadge.innerText = statusBadgePercent + '%'; 

  statusDiv.appendChild(statusBadge);
  statusDiv.appendChild(statusText);
}

function updateDilemmaVotesYes(dilemma_id, add_or_subtract) {
  let currentYesVotes = parseInt(document.getElementById("votes-yes"+dilemma_id).innerText);
  if (add_or_subtract==="add"){
    updateDilemmaVotes(dilemma_id, currentYesVotes+1, null)
  } else {
    updateDilemmaVotes(dilemma_id, currentYesVotes-1, null)
  }
}

function updateDilemmaVotesNo(dilemma_id, add_or_subtract) {
  let currentNoVotes = parseInt(document.getElementById("votes-no"+dilemma_id).innerText);
  if (add_or_subtract==="add"){
    updateDilemmaVotes(dilemma_id, null, currentNoVotes+1)
  } else {
    updateDilemmaVotes(dilemma_id, null, currentNoVotes-1)
  }
}