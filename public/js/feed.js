// for timestamps: https://mattbradley.github.io/livestampjs/

// ------- Render feed ------

function renderFeed(user) {
  let dilemmaDiv = document.getElementById('feed');
  dilemmaDiv.innerHTML = "";

  get('/api/dilemmas', {}, function(dArray) {
    for (let i = 0; i < dArray.length; i++) {
      const currentDilemma = dArray[i];
      const newDilemmaDOMObj = dilemmaDOMObject(currentDilemma, user)
      dilemmaDiv.prepend(newDilemmaDOMObj);
      let yes_votes = 0;
      let no_votes = 0;

      // render comments
      get('/api/comments', { 'parent_id' : currentDilemma._id }, function(cArray) {
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

function renderFeedByCategory(user, category) {
  let dilemmaDiv = document.getElementById('feed');
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