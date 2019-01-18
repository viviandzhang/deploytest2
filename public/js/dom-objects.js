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

function dilemmaDOMObject (dilemmaJSON){
    // for timestamp
    /*
    let d = new Date();
    let hourPost = d.getHours();
    let minutePost = d.getMinutes();
    */


  //closeComposer();    // ------------------------ uncomment this later

  //const dilemmaDiv = document.getElementById('feed');

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
  //dTimestamp.innerText = 'Posted at ' + hourPost + ':' + minutePost; ---- date notation
  dTimestamp.innerText = 'Posted at ' + dilemmaJSON.timestamp;
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
  statusBadge.innerText = '50%';   // -----------------fix
  dCardStatus.appendChild(statusBadge);

  const statusText = document.createElement('div');
  statusText.className = 'status-text';
  statusText.innerText = 'for pro'; // -----------------fix
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
    console.log('expanding');
    let debateSection = document.getElementById('debate-section' + dilemmaJSON._id);
    debateSection.style.display = "flex";

    dCardExpandFooter.style.display = "none";
  });

  

  const colColYes = document.createElement('div');
  colColYes.className = 'col col-yes';
  debateSection.appendChild(colColYes);

  const colTitle = document.createElement('div');
  colTitle.className = 'col-title';
  colColYes.appendChild(colTitle);

  const boldSectionTitle = document.createElement('div');
  boldSectionTitle.className = 'bold-section-title';
  boldSectionTitle.innerText = 'YES';
  colTitle.appendChild(boldSectionTitle);

  const yesVoteTag = document.createElement('div');
  yesVoteTag.className = 'yes-vote-tag';
  yesVoteTag.innerText = (dilemmaJSON.votes_yes) + ' votes';
  colTitle.appendChild(yesVoteTag);

  const commentForm = document.createElement('form');
  colColYes.appendChild(commentForm);

  const commentFormClass = document.createElement('div');
  commentFormClass.className = 'comment-form';
  commentForm.appendChild(commentFormClass);

  const commentFieldYes = document.createElement('input');
  commentFieldYes.className = 'comment-field-yes comment-input'; // change to id and attach event listener
  // add placeholder ??
  commentFormClass.appendChild(commentFieldYes);

  const submitCommentYes = document.createElement('input');
  submitCommentYes.id = 'submit-comment-yes'; // change to id and add event listener
  submitCommentYes.className = 'comment-button';
  submitCommentYes.value = 'Post';
  submitCommentYes.type = 'Button';
  // add placeholder ??
  commentFormClass.appendChild(submitCommentYes);

  const commentYes = document.createElement('div');
  commentYes.id = 'commentYes'; // change this ahhhh -- might not need to be here
  colColYes.appendChild(commentYes);

  const col = document.createElement('div');
  col.className = 'col'; 
  debateSection.appendChild(col);

  const colTitleNo = document.createElement('div');
  colTitleNo.className = 'col-title'; 
  col.appendChild(colTitleNo);

  const boldSectionTitleNo = document.createElement('div');
  boldSectionTitleNo.className = 'bold-section-title'; 
  boldSectionTitleNo.innerText = 'NO';
  colTitleNo.appendChild(boldSectionTitleNo);

  const noVoteTag = document.createElement('div');
  noVoteTag.className = 'no-vote-tag'; 
  noVoteTag.innerText = (dilemmaJSON.votes_no) + ' votes';
  colTitleNo.appendChild(noVoteTag);

  const formNo = document.createElement('form');
  col.appendChild(formNo);

  const commentFormNo = document.createElement('div');
  commentFormNo.className = 'comment-form'; 
  formNo.appendChild(commentFormNo);

  const commentInputNo = document.createElement('input');
  commentInputNo.className = 'comment-input'; // change to id and attach event listener
  // add placeholder ??
  commentFormNo.appendChild(commentInputNo);

  const submitCommentNo = document.createElement('input');
  submitCommentNo.className = 'comment-button'
  submitCommentNo.value = 'Post';
  submitCommentNo.type = 'Button';
  // add placeholder ??
  commentFormNo.appendChild(submitCommentNo);

  return newDilemma;
}

let testDomDilemma = dilemmaDOMObject (anonDilemmaJSON);
let dilemmaDiv = document.getElementById('feed');
dilemmaDiv.prepend(testDomDilemma);




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