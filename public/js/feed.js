// for timestamps: https://mattbradley.github.io/livestampjs/

// --------- Composer ---------
// ------- Render feed ------

function renderFeed(user) {
  let dilemmaDiv = document.getElementById('feed');

  get('/api/dilemmas', {}, function(dArray) {
    for (let i = 0; i < dArray.length; i++) {
      const currentDilemma = dArray[i];
      dilemmaDiv.prepend(dilemmaDOMObject(currentDilemma, user));

      // render comments
      get('/api/comments', { 'parent_id' : currentDilemma._id }, function(cArray) {
        for (let i = 0; i < cArray.length; i++) {
          let currentComment = cArray[i];
          if (currentComment.yes_or_no === "yes") {
            yesDiv = document.getElementById('comments-yes' + currentComment.parent_id)
            yesDiv.append(commentDOMObject(currentComment, user));
          } else {
            noDiv = document.getElementById('comments-no' + currentComment.parent_id)
            noDiv.append(commentDOMObject(currentComment, user));
          }
        }
      })
    }
  });
}

function reRenderDilemma(user, dilemma_id) {
  let dilemmaDiv = document.getElementById(dilemma_id);

  console.log(dilemmaDiv);

  get('/api/userById', {_id: user._id}, function(userObj){
    
    get('/api/dilemma', {_id: dilemma_id}, function(updatedDilemma){
      console.log(updatedDilemma);
      dilemmaDiv.parentElement.replaceChild(dilemmaDOMObject(updatedDilemma, userObj), dilemmaDiv);
  
      get('/api/comments', { 'parent_id' : updatedDilemma._id }, function(cArray) {
        for (let i = 0; i < cArray.length; i++) {
          let currentComment = cArray[i];
          if (currentComment.yes_or_no === "yes") {
            yesDiv = document.getElementById('comments-yes' + updatedDilemma._id)
            yesDiv.append(commentDOMObject(currentComment, userObj));
          } else {
            noDiv = document.getElementById('comments-no' + updatedDilemma._id)
            noDiv.append(commentDOMObject(currentComment, userObj));
          }
        }
      })
    })

  })

}