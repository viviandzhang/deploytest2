
function renderFeedByUser(user){
  console.log("rendering feed")
  let dilemmaDiv = document.getElementById('feed');
  dilemmaDiv.innerHTML = "";

  get('/api/dilemmas', {}, function(dArray) {
    for (let i = 0; i < dArray.length; i++) {
      let currentDilemma = dArray[i];
      const dilemmaCreatorId = dArray[i].creator_id;
      let isByUser = (user._id === dilemmaCreatorId);

      if (isByUser) {
        const newDilemmaDOMObj = dilemmaDOMObject(currentDilemma, user, false)
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

function main() {

    get('/api/whoami', {}, function(user) {
      if(user._id !== undefined) {
        get('/api/userById', {_id:user._id}, function(userDBItem){
          console.log(userDBItem);
          renderNavbar(userDBItem);
          renderFeedByUser(userDBItem);
          const postDilemma = document.getElementById('post-button');
          postDilemma.addEventListener('click', function(){
            submitDilemmaHandler(user)
          });
        })
      } else {
        window.location.href = '/';
      }
    });
  }

main();