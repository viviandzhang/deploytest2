function openComposer() {
  let overlayComposer = document.getElementById('composer');
  overlayComposer.style.display = "block";
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

function createNewComment () {
  const commentValue = document.getElementById('comment-field-yes').value;
  console.log(commentValue);
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
postDilemma.addEventListener('click', submitDilemmaHandler);

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