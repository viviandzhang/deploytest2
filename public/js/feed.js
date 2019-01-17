function openComposer() {
  let overlayComposer = document.getElementById('composer');
  overlayComposer.style.display = "flex";
}

function closeComposer() {
  let overlayComposer = document.getElementById('composer');

  let title = document.getElementById('comp-title');
  let body = document.getElementById('comp-body');

  let categories = document.getElementsByClassName('comp-categories');

  for(let i=0; i<categories.length; i++){
    categories[i].className = "comp-categories";
  }
  title.value="";
  body.value="";
  overlayComposer.style.display = "none";
}

function submitDilemmaHandler() {
  const data = {
    title: "Should I do X thing?",
    body: "Hello world, this is a fake new dilemma"
  }
  post('/api/dilemma', data);
  console.log('this is working')
}

function expandDilemma(){
  let debateSection = document.getElementById('debate-section');
  debateSection.style.display = "flex";

  let dCardExpandFooter = document.getElementById ('d-card-expand-footer');
  dCardExpandFooter.style.display = "none";

  let topComments = document.getElementById ('top-comments');
  topComments.style.display = "none";
}

function createNewDilemma (){
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
  dTimestamp.innerText = 'Posted 1s ago';
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

//createNewDilemma();

function createNewComment () {
  const commentValue = document.getElementById('comment-field-yes').value;
  document.getElementById('comment-field-yes').value = '';

  const commentsDiv = document.getElementById('comment-yes');

  const newComment = document.createElement('div');
  newComment.className = 'comment-wrapper';
  commentsDiv.appendChild(newComment);

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
  commentAuthor.innerText = 'Quirky Lllama poste 1s ago'
  commentMeta.appendChild(commentAuthor);

}

// click Add New Dilemma --> composer appears
const newDilemma = document.getElementById('new-dilemma');
newDilemma.addEventListener('click', openComposer);
// closing composer (x and Cancel):
const closeNewDilemma = document.getElementById('close');
const overlay = document.getElementById('overlay');
closeNewDilemma.addEventListener('click', closeComposer)
overlay.addEventListener('click', closeComposer)


const cancelNewDilemma = document.getElementById('cancel-button');
cancelNewDilemma.addEventListener('click', closeComposer)

// post Dilemma 
const postDilemma = document.getElementById('post-button');
postDilemma.addEventListener('click', createNewDilemma);

const expandFooter = document.getElementById ('d-card-expand-footer');
expandFooter.addEventListener('click', expandDilemma);


const submitComment = document.getElementById('submit-comment-yes');
submitComment.addEventListener('click', createNewComment)

function makeCategoriesSelectable() {
  let categories = document.getElementsByClassName('comp-categories');

  for(let i=0; i<categories.length; i++){
    categories[i].addEventListener('click', function(){
      if (categories[i].className === "comp-categories comp-categories-selected"){
        categories[i].className = "comp-categories";
      } else {
        categories[i].className = "comp-categories comp-categories-selected";
      }
    })
  }
}
makeCategoriesSelectable();