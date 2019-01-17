function createNewDilemma (){
    // for timestamp
    let d = new Date();
    let hourPost = d.getHours();
    let minutePost = d.getMinutes();

  console.log('creating new dilemma');
  const titleValue = document.getElementById ('comp-title').value;

  console.log('title value ' + titleValue);

  const bodyValue = document.getElementById ('comp-body').value;

  console.log('body here: ' + bodyValue);
  closeComposer();

  const dilemmaDiv = document.getElementById('feed');

  // d-container 
  const newDilemma = document.createElement('div');
  newDilemma.className = 'd-container';
  dilemmaDiv.prepend(newDilemma);

  const dMeta = document.createElement('div');
  dMeta.className = 'd-meta';
  newDilemma.appendChild(dMeta);

  const dThumbnail = document.createElement('div');
  dThumbnail.className = 'd-thumbnail';
  dMeta.appendChild(dThumbnail);

  const dCreator = document.createElement('div');
  dCreator.className = 'd-creator';
  dCreator.innerText = 'Quirky Llama';
  dMeta.appendChild(dCreator);

  const dTimestamp = document.createElement('div');
  dTimestamp.className = 'd-timestamp';
  dTimestamp.innerText = 'Posted at ' + hourPost + ':' + minutePost;
  dMeta.appendChild(dTimestamp);

  // d-card-expanded -- within d-container
  const newDCardExpanded = document.createElement('div');
  newDCardExpanded.className = 'd-card-expanded';
  newDilemma.appendChild(newDCardExpanded);

  const dCardStatus = document.createElement('div');
  dCardStatus.className = 'd-card-status';
  newDCardExpanded.appendChild(dCardStatus);

  const statusBadge = document.createElement('div');
  statusBadge.className = 'status-badge';
  statusBadge.innerText = '50%';
  dCardStatus.appendChild(statusBadge);

  const statusText = document.createElement('div');
  statusText.className = 'status-text';
  statusText.innerText = 'for pro';
  dCardStatus.appendChild(statusText);

  const dCardCategories = document.createElement('div');
  dCardCategories.className = 'd-card-categories';
  dCardCategories.innerText = 'Education'; 
  newDCardExpanded.appendChild(dCardCategories);

  const dCardTitle = document.createElement('div');
  dCardTitle.className = 'd-card-title';
  dCardTitle.innerText = titleValue; 
  newDCardExpanded.appendChild(dCardTitle);

  const dCardBody = document.createElement('div');
  dCardBody.className = 'd-card-body';
  dCardBody.innerText = bodyValue; 
  newDCardExpanded.appendChild(dCardBody);

  const topComments = document.createElement('div');
  dCardCategories.id = 'top-comments';
  newDCardExpanded.appendChild(topComments);

  const sectionTitle = document.createElement('div');
  sectionTitle.className = 'section-title';
  sectionTitle.innerText = 'TOP COMMENTS'; 
  topComments.appendChild(sectionTitle);

  const dCardCommentCompact = document.createElement('div'); // might need to add id here
  dCardCommentCompact.className = 'section-title';
  topComments.appendChild(dCardCommentCompact);

  const dCardExpandFooter = document.createElement('div');
  dCardExpandFooter.id = 'd-card-expand-footer-2';
  newDCardExpanded.appendChild(dCardExpandFooter);

  const expandSectionTitle = document.createElement('div');
  expandSectionTitle.className = 'section-title';
  expandSectionTitle.innerText = 'EXPAND TO SEE MORE';
  dCardExpandFooter.appendChild(expandSectionTitle);

  //fix this ahhh:
  const expandFooterNew = document.getElementById ('d-card-expand-footer-2');
  expandFooterNew.addEventListener('click', expandDilemma);
}


function commentDOMObject (commentJSON) {
    // for timestamp
    let d = new Date();
    let hourPost = d.getHours();
    let minutePost = d.getMinutes();
  
    // gets the comment from the comment composer:
    const commentValue = document.getElementById('comment-field-yes').value;
    document.getElementById('comment-field-yes').value = '';
  
    // gets overall comment div
    // const commentsDiv = document.getElementById('comment-yes');
  
    // switched to CREATE commentDiv
    commentDiv = document.createElement('div');
    commentDiv.setAttribute('id', commentJSON._id);
  
    const newComment = document.createElement('div');
    newComment.className = 'comment-wrapper';
    commentsDiv.prepend(newComment);
  
    const commentText = document.createElement('div');
    commentText.innerText = commentValue;
    commentText.className = 'comment-body';
    newComment.appendChild(commentText);
  
    const commentVote = document.createElement('div');
    commentVote.className = 'comment-vote';
    newComment.appendChild(commentVote);
  
    const voteButton = document.createElement('div');
    voteButton.className = 'vote-button';
    commentVote.appendChild(voteButton);
  
    const voteCount = document.createElement('div');
    voteCount.innerText = '0';
    voteCount.className = 'vote-count';
    commentVote.appendChild(voteCount);
  
    const commentMeta = document.createElement('div');
    commentMeta.className = 'comment-meta';
    newComment.appendChild(commentMeta);
  
    const commentThumb = document.createElement('div');
    commentThumb.className = 'comment-thumb';
    commentMeta.appendChild(commentThumb);
  
    const commentAuthor = document.createElement('span');
    commentAuthor.className = 'comment-author';
    commentAuthor.innerText = 'Quirky Lllama posted at ' + hourPost + ":" + minutePost;
    commentMeta.appendChild(commentAuthor);
  
  }