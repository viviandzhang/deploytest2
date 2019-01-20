// for timestamps: https://mattbradley.github.io/livestampjs/

// --------- Composer ---------
// ------- Render feed ------

function renderFeed() {
  let dilemmaDiv = document.getElementById('feed');

  get('/api/dilemmas', {}, function(dArray) {
    for (let i = 0; i < dArray.length; i++) {
      const currentDilemma = dArray[i];
      dilemmaDiv.prepend(dilemmaDOMObject(currentDilemma));

      // render comments
      get('/api/comments', { 'parent_id' : currentDilemma._id }, function(cArray) {
        for (let i = 0; i < cArray.length; i++) {
          let currentComment = cArray[i];
          if (currentComment.yes_or_no === "yes") {
            yesDiv = document.getElementById('comments-yes' + currentComment.parent_id)
            yesDiv.append(commentDOMObject(currentComment));
          } else {
            noDiv = document.getElementById('comments-no' + currentComment.parent_id)
            noDiv.append(commentDOMObject(currentComment));
          }
        }
      })
    }
  });
}