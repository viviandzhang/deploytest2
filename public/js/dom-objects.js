// RELATIVE TIMESTAMP
function timeSince(timeStamp) {
  var now = new Date(),
    secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
  if(secondsPast < 60){
    return parseInt(secondsPast) + 's' + " ago";
  }
  if(secondsPast < 3600){
    return parseInt(secondsPast/60) + 'm' + " ago";
  }
  if(secondsPast <= 86400){
    return parseInt(secondsPast/3600) + 'h' + " ago";
  }
  if(secondsPast > 86400){
      day = timeStamp.getDate();
      month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
      year = timeStamp.getFullYear() == now.getFullYear() ? "" :  " "+timeStamp.getFullYear();
      return day + " " + month + year;
  }
}

// DILEMMA
function dilemmaDOMObject (dilemmaJSON, user){
  // d-container 
  const newDilemma = document.createElement('div');
  newDilemma.setAttribute('id', dilemmaJSON.creator_id);
  newDilemma.className = 'd-container';

  const dMeta = document.createElement('div');
  dMeta.className = 'd-meta';
  newDilemma.appendChild(dMeta);

  // --------------------- thumbnail mapping ----------------------------
  const dThumbnail = document.createElement('div');
  dThumbnail.className = 'd-thumbnail';
  if (dilemmaJSON.creator_color === 'pink'){
    dThumbnail.style.backgroundColor = '#F3ACE2';
  }
  if (dilemmaJSON.creator_color === 'green'){
    dThumbnail.style.backgroundColor = '#95D74E';
  }
  if (dilemmaJSON.creator_color === 'purple'){
    dThumbnail.style.backgroundColor = '#BA98E0';
  }
  if (dilemmaJSON.creator_color === 'blue'){
    dThumbnail.style.backgroundColor = '#4ABCF3';
  }
  if (dilemmaJSON.creator_color === 'yellow'){
    dThumbnail.style.backgroundColor = '#F2E741';
  }
  if (dilemmaJSON.creator_color === 'orange'){
    dThumbnail.style.backgroundColor = '#FFB200';
  }
  
  
  
  dMeta.appendChild(dThumbnail);

  const dCreator = document.createElement('div');
  dCreator.className = 'd-creator';
  dCreator.innerText = dilemmaJSON.creator_alias + " Llama";
  dMeta.appendChild(dCreator);

  // ---------------------------- Timestamp -------------------------------
  const dTimestamp = document.createElement('div');
  dTimestamp.className = 'd-timestamp';
  if (dilemmaJSON.timestamp != null) {
    dTimestamp.innerText = 'Posted ' + timeSince(new Date(dilemmaJSON.timestamp));
  }
  
  dMeta.appendChild(dTimestamp);

  // d-card-expanded -- within d-container
  let newDCardExpanded = document.createElement('div');
  newDCardExpanded.className = 'd-card-expanded';
  let expanded = false;
  newDilemma.appendChild(newDCardExpanded);
  
  newDCardExpanded.setAttribute ('id',('expand-footer-' + dilemmaJSON._id));

  let expandTextFooter = document.createElement('div');
  expandTextFooter.className = 'expand-text-footer';
  let numberOfVotes = dilemmaJSON.votes_yes + dilemmaJSON.votes_no;
  expandTextFooter.innerText = numberOfVotes + ' votes, 7 comments';
  newDCardExpanded.appendChild(expandTextFooter);

  const dCardStatus = document.createElement('div');
  dCardStatus.className = 'd-card-status';
  newDCardExpanded.appendChild(dCardStatus);

  const statusBadge = document.createElement('div');
  statusBadge.className = 'status-badge';
  let statusBadgePercent;
  
  const statusText = document.createElement('div');
  statusText.className = 'status-text';

  // ----------------------------- do status badge ----------------------------
  if (dilemmaJSON.votes_yes > dilemmaJSON.votes_no) {
    statusBadgePercent = dilemmaJSON.votes_yes / (dilemmaJSON.votes_yes + dilemmaJSON.votes_no);
    statusText.innerText = 'for yes';
    statusBadge.classList.add('status-badge-yes');
  }
  else if (dilemmaJSON.votes_yes === dilemmaJSON.votes_no) {
    statusBadgePercent = .50;
    statusText.innerText = 'tied';
    statusBadge.classList.add('status-badge-tied');
  }
  else{
    statusBadgePercent = dilemmaJSON.votes_no / (dilemmaJSON.votes_yes + dilemmaJSON.votes_no);
    statusText.innerText = 'for no';
    statusBadge.classList.add('status-badge-no');
  }
  if (dilemmaJSON.votes_yes === 0 & dilemmaJSON.votes_no === 0){
    statusBadgePercent = 0;
    statusText.innerText = 'no votes yet!';
  }
  statusBadgePercent = Math.floor(statusBadgePercent * 100);
  statusBadge.innerText = statusBadgePercent + '%'; 

  dCardStatus.appendChild(statusBadge);
  dCardStatus.appendChild(statusText);
  
  // --------------------------- do categories --------------------------------
  const dCardCategories = document.createElement('div');
  dCardCategories.className = 'd-card-categories';
  let categoriesString = '';
  for (let i = 0; i < (dilemmaJSON.categories).length; i++){
    if (i === (dilemmaJSON.categories).length - 1){
      categoriesString += (dilemmaJSON.categories)[i];
    }
    else{
      categoriesString += (dilemmaJSON.categories)[i] + ' · ';
    }
  }
  dCardCategories.innerText = categoriesString;  
  newDCardExpanded.appendChild(dCardCategories);

  const dCardTitle = document.createElement('div');
  dCardTitle.className = 'd-card-title';
  dCardTitle.innerText = dilemmaJSON.title; 
  newDCardExpanded.appendChild(dCardTitle);

  const dCardBody = document.createElement('div');
  dCardBody.className = 'd-card-body';
  
  dCardBody.innerText = dilemmaJSON.body; 
  newDCardExpanded.appendChild(dCardBody);

  // ----------------------- truncation ---------------------------------
  if (dilemmaJSON.body.length >= 420) {
    dCardBody.classList.add('truncated');
  }
  
  const debateSection = document.createElement('div');
  debateSection.className = 'debate-section';   
  debateSection.setAttribute ('id','debate-section' + dilemmaJSON._id);
  newDCardExpanded.appendChild(debateSection);

  // ---------------------- expand/collapse dilemma -------------------------
  newDCardExpanded.addEventListener('click', function () {
    if (expanded === false){
      dCardBody.classList.remove('truncated');
      let debateSection = document.getElementById('debate-section' + dilemmaJSON._id);
      debateSection.style.display = "flex";
      newDCardExpanded.style.cursor = 'default';
      expandTextFooter.style.display = 'none';
      dCardBody.style.marginBottom = '20px';
      //expanded = true;
    }
  });

  // ------------------ Yes column begins -------------------
  const colColYes = document.createElement('div');
  colColYes.className = 'col col-yes';
  debateSection.appendChild(colColYes);

  // div that contains title of yes column and #votes tag
  const colTitleYes = document.createElement('div');
  colTitleYes.className = 'col-title';
  colColYes.appendChild(colTitleYes);

  // title of yes column: 'YES
  const boldSectionTitleYes = document.createElement('div');
  boldSectionTitleYes.className = 'bold-section-title';
  boldSectionTitleYes.innerText = 'YES';
  colTitleYes.appendChild(boldSectionTitleYes);

  // #votes tag (yes column)
  const yesVoteTag = document.createElement('div');
  yesVoteTag.className = 'yes-vote-tag';
  yesVoteTag.innerText = (dilemmaJSON.votes_yes) + ' votes';
  colTitleYes.appendChild(yesVoteTag);

  // the form for yes
  const commentFormYes = document.createElement('form');
  colColYes.appendChild(commentFormYes);

  // overall class for the form
  const commentFormClassYes = document.createElement('div');
  commentFormClassYes.className = 'comment-form';
  commentFormYes.appendChild(commentFormClassYes);

  // comment field for yes -- where you input comments
  const commentFieldYes = document.createElement('input');
  commentFieldYes.className = 'comment-field-yes comment-input'; // change to id and attach event listener
  commentFieldYes.id = 'comment-field-yes' + dilemmaJSON._id;
  commentFieldYes.placeholder = 'Add your comment…';
  commentFormClassYes.appendChild(commentFieldYes);

  // 'Post' button for yes comments
  const submitCommentYes = document.createElement('input');
  submitCommentYes.id = 'submit-comment-yes-' + dilemmaJSON._id; //  add event listener
  submitCommentYes.className = 'comment-button';
  submitCommentYes.value = 'Post';
  submitCommentYes.type = 'Button';
  commentFormClassYes.appendChild(submitCommentYes);
  submitCommentYes.addEventListener('click', function(){
    submitCommentHandler(dilemmaJSON._id, 'yes', user);
  })

  // this is where the comments will be added to the yes column -- the list
  const yesComments = document.createElement('div');
  yesComments.id = 'comments-yes' + dilemmaJSON._id; // change this ahhhh -- might not need to be here
  colColYes.appendChild(yesComments);

  //yesComments.appendChild(commentDOMObject(anonCommentJSON));

  // -------------------- NO COLUMN BEGINS -----------------------------
  const colColNo = document.createElement('div');
  colColNo.className = 'col'; 
  debateSection.appendChild(colColNo);

  // div that contains title of no column and no #votes tag
  const colTitleNo = document.createElement('div');
  colTitleNo.className = 'col-title'; 
  colColNo.appendChild(colTitleNo);

  // title of no column: NO
  const boldSectionTitleNo = document.createElement('div');
  boldSectionTitleNo.className = 'bold-section-title'; 
  boldSectionTitleNo.innerText = 'NO';
  colTitleNo.appendChild(boldSectionTitleNo);

  // #votes tag (no column)
  const noVoteTag = document.createElement('div');
  noVoteTag.className = 'no-vote-tag'; 
  noVoteTag.innerText = (dilemmaJSON.votes_no) + ' votes';
  colTitleNo.appendChild(noVoteTag);

  // overall form for NO
  const commentFormNo = document.createElement('form');
  colColNo.appendChild(commentFormNo);

  // the overall class for the no form
  const commentFormClassNo = document.createElement('div');
  commentFormClassNo.className = 'comment-form'; 
  commentFormNo.appendChild(commentFormClassNo);

  // the input field for no
  const commentFieldNo = document.createElement('input');
  commentFieldNo.className = 'comment-field-no comment-input'; // change to id and attach event listener
  commentFieldNo.id = 'comment-field-no' + dilemmaJSON._id;
  commentFieldNo.placeholder = 'Add your comment…';
  commentFormClassNo.appendChild(commentFieldNo);

  const submitCommentNo = document.createElement('input');
  submitCommentNo.className = 'comment-button'
  submitCommentNo.id = 'submit-comment-no-' + dilemmaJSON._id; //  add event listener
  submitCommentNo.value = 'Post';
  submitCommentNo.type = 'Button';
  commentFormNo.appendChild(submitCommentNo);

  //let body = inputField.value;

  
    submitCommentNo.addEventListener('click', function(){
      submitCommentHandler(dilemmaJSON._id, 'no', user);
    })
  
  

  // where the comments will be added to the no column -- no list
  const noComments = document.createElement('div');
  noComments.id = 'comments-no' + dilemmaJSON._id; // change this ahhhh -- might not need to be here
  colColNo.appendChild(noComments);


  return newDilemma;
}

// COMMENT
function commentDOMObject (commentJSON, user) {
    commentDiv = document.createElement('div');
    commentDiv.setAttribute('id', 'comment'+commentJSON._id);
  
    const newComment = document.createElement('div');
    newComment.className = 'comment-wrapper';
    commentDiv.prepend(newComment);
  
    const commentText = document.createElement('div');
    commentText.innerText = commentJSON.body;
    commentText.className = 'comment-body';
    newComment.appendChild(commentText);
  
    const commentVote = document.createElement('div');
    commentVote.className = 'comment-vote';
    newComment.appendChild(commentVote);
  
    const voteButton = document.createElement('div');
    voteButton.className = 'vote-button';
    voteButton.setAttribute('id', 'comment-vote'+commentJSON._id);
    commentVote.appendChild(voteButton);
    voteButton.addEventListener('click', function(){
      commentVoteHandler(commentJSON._id);
    });
  
    const voteCount = document.createElement('div');
    voteCount.innerText = commentJSON.votes;
    voteCount.className = 'vote-count';
    commentVote.appendChild(voteCount);
  
    const commentMeta = document.createElement('div');
    commentMeta.className = 'comment-meta';
    newComment.appendChild(commentMeta);
  
    const commentThumb = document.createElement('div');
    commentThumb.className = 'comment-thumb';

    if (commentJSON.creator_color === 'pink'){
      commentThumb.style.backgroundColor = '#F3ACE2';
    }
    if (commentJSON.creator_color === 'green'){
      commentThumb.style.backgroundColor = '#95D74E';
    }
    if (commentJSON.creator_color === 'purple'){
      commentThumb.style.backgroundColor = '#BA98E0';
    }
    if (commentJSON.creator_color === 'blue'){
      commentThumb.style.backgroundColor = '#4ABCF3';
    }
    if (commentJSON.creator_color === 'yellow'){
      commentThumb.style.backgroundColor = '#F2E741';
    }
    if (commentJSON.creator_color === 'yellow'){
      commentThumb.style.backgroundColor = '#FFB200';
    }

    commentMeta.appendChild(commentThumb);
  
    const commentAuthor = document.createElement('span');
    commentAuthor.className = 'comment-author';
    commentAuthor.innerText = commentJSON.creator_alias + ' posted ' + timeSince(new Date(commentJSON.timestamp));
    commentMeta.appendChild(commentAuthor);

    return commentDiv;
  
  }