let anonDilemmaJSON = {"_id": {"$oid":"5c3fda93157dee71bd03e260"},
                    "categories":["Uncategorized"],
                    "creator_id":"anon_id",
                    "creator_color":"pink",
                    "creator_alias":"Anonymous",
                    "timestamp":null,
                    "title":"Should I do X thing?",
                    "body":"Hello world, this is a fake new dilemma",
                    "active":true,
                    "votes_yes":{"$numberInt":"3"},
                    "votes_no":{"$numberInt":"4"},
                    "__v":{"$numberInt":"0"}};

// RELATIVE TIMESTAMP
function timeSince(timeStamp) {
  var now = new Date(),
    secondsPast = (now.getTime() - timeStamp.getTime()) / 1000;
  if(secondsPast < 60){
    return parseInt(secondsPast) + 's';
  }
  if(secondsPast < 3600){
    return parseInt(secondsPast/60) + 'm';
  }
  if(secondsPast <= 86400){
    return parseInt(secondsPast/3600) + 'h';
  }
  if(secondsPast > 86400){
      day = timeStamp.getDate();
      month = timeStamp.toDateString().match(/ [a-zA-Z]*/)[0].replace(" ","");
      year = timeStamp.getFullYear() == now.getFullYear() ? "" :  " "+timeStamp.getFullYear();
      return day + " " + month + year;
  }
}

// DILEMMA
function dilemmaDOMObject (dilemmaJSON){
  // d-container 
  const newDilemma = document.createElement('div');
  newDilemma.setAttribute('id', dilemmaJSON.creator_id);
  newDilemma.className = 'd-container';
  //dilemmaDiv.prepend(newDilemma);

  const dMeta = document.createElement('div');
  dMeta.className = 'd-meta';
  newDilemma.appendChild(dMeta);

  const dThumbnail = document.createElement('div');
  dThumbnail.className = 'd-thumbnail';
  dMeta.appendChild(dThumbnail);

  const dCreator = document.createElement('div');
  dCreator.className = 'd-creator';
  dCreator.innerText = dilemmaJSON.creator_alias + " Llama";
  dMeta.appendChild(dCreator);

  const dTimestamp = document.createElement('div');
  dTimestamp.className = 'd-timestamp';
  console.log(dilemmaJSON.timestamp);
  if (dilemmaJSON.timestamp != null) {
    dTimestamp.innerText = 'Posted ' + timeSince(new Date(dilemmaJSON.timestamp)) + " ago";
  }
  
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
  let statusBadgePercent;
  
  //statusBadge.innerText = statusBadgePercent + '%';   
  //dCardStatus.appendChild(statusBadge);

  const statusText = document.createElement('div');
  statusText.className = 'status-text';

  // ----------------------------- do status badge ----------------------------
  if (dilemmaJSON.votes_yes > dilemmaJSON.votes_no) {
    statusBadgePercent = dilemmaJSON.votes_yes / (dilemmaJSON.votes_yes + dilemmaJSON.votes_no);
    statusText.innerText = 'for yes';
    statusBadge.classList.add('status-badge-yes');

  }
  else{
    statusBadgePercent = dilemmaJSON.votes_no / (dilemmaJSON.votes_yes + dilemmaJSON.votes_no);
    statusText.innerText = 'for no';
    statusBadge.classList.add('status-badge-no');
  }
  statusBadgePercent = Math.floor(statusBadgePercent * 100);
  statusBadge.innerText = statusBadgePercent + '%'; 

  dCardStatus.appendChild(statusBadge);
  dCardStatus.appendChild(statusText);
  
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
  dCardCategories.innerText = categoriesString;  // ------- fix
  newDCardExpanded.appendChild(dCardCategories);

  const dCardTitle = document.createElement('div');
  dCardTitle.className = 'd-card-title';
  dCardTitle.innerText = dilemmaJSON.title; 
  newDCardExpanded.appendChild(dCardTitle);

  const dCardBody = document.createElement('div');
  dCardBody.className = 'd-card-body';
  console.log(dCardBody.clientHeight);
  if (dCardBody.clientHeight >= 76) {
    dCardBody.classList.add('truncated');
  }
  dCardBody.innerText = dilemmaJSON.body; 
  newDCardExpanded.appendChild(dCardBody);

  let dCardExpandFooter = document.createElement('div');
  dCardExpandFooter.className = 'd-card-expand-footer';
  dCardExpandFooter.setAttribute ('id',('expand-footer-' + dilemmaJSON._id));
  //console.log('expand-footer-' + dilemmaJSON._id);
  newDCardExpanded.appendChild(dCardExpandFooter);


  const expandSectionTitle = document.createElement('div');
  expandSectionTitle.className = 'section-title';
  expandSectionTitle.innerText = "EXPAND TO SEE OTHER LLAMAS' OPINIONS";
  dCardExpandFooter.appendChild(expandSectionTitle);

  const debateSection = document.createElement('div');
  debateSection.className = 'debate-section';   // -------------- change to not id
  debateSection.setAttribute ('id','debate-section' + dilemmaJSON._id);
  newDCardExpanded.appendChild(debateSection);


  dCardExpandFooter.addEventListener('click', function () {
    dCardBody.classList.remove('truncated');
    let debateSection = document.getElementById('debate-section' + dilemmaJSON._id);
    debateSection.style.display = "flex";

    dCardExpandFooter.style.display = "none";
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
  commentFormClassYes.appendChild(commentFieldYes);

  // 'Post' button for yes comments
  const submitCommentYes = document.createElement('input');
  submitCommentYes.id = 'submit-comment-yes-' + dilemmaJSON._id; //  add event listener
  submitCommentYes.className = 'comment-button';
  submitCommentYes.value = 'Post';
  submitCommentYes.type = 'Button';
  submitCommentYes.placeholder = 'Add your comment…';
  commentFormClassYes.appendChild(submitCommentYes);

  // this is where the comments will be added to the yes column -- the list
  const yesComments = document.createElement('div');
  yesComments.id = 'comments-yes' + dilemmaJSON._id; // change this ahhhh -- might not need to be here
  colColYes.appendChild(yesComments);

  yesComments.appendChild(commentDOMObject(anonCommentJSON));

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
  // add placeholder ??
  commentFormClassNo.appendChild(commentFieldNo);

  const submitCommentNo = document.createElement('input');
  submitCommentNo.className = 'comment-button'
  submitCommentNo.id = 'submit-comment-no-' + dilemmaJSON._id; //  add event listener
  submitCommentNo.value = 'Post';
  submitCommentNo.type = 'Button';
  submitCommentNo.placeholder = 'Add your comment…';
  commentFormNo.appendChild(submitCommentNo);

  // where the comments will be added to the no column -- no list
  const noComments = document.createElement('div');
  noComments.id = 'comments-no' + dilemmaJSON._id; // change this ahhhh -- might not need to be here
  colColNo.appendChild(noComments);


  return newDilemma;
}

let anonCommentJSON = {"_id":"5c423d9146a65c910fc60418",
                        "creator_id":"anon id",
                        "creator_alias":"Anonymous",
                        "creator_color":"pink",
                        "timestamp":null,
                        "body":"Yeppity yep yep yep agree 100% so valid",
                        "yes_or_no":"yes",
                        "votes": 0,
                        "parent_id":"5c410e27c407c885b68c23b9",
                        "__v":{"$numberInt":"0"}};

function commentDOMObject (commentJSON) {
    commentDiv = document.createElement('div');
    commentDiv.setAttribute('id', commentJSON._id);
  
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
    commentAuthor.innerText = commentJSON.creator_alias + ' posted ' + timeSince(new Date(commentJSON.timestamp));
    commentMeta.appendChild(commentAuthor);

    return commentDiv;
  
  }