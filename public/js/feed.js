// for timestamps: https://mattbradley.github.io/livestampjs/

// --------- Composer ---------
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

// Open composer
const newDilemma = document.getElementById('new-dilemma');
newDilemma.addEventListener('click', openComposer);
// Close composer
const closeNewDilemma = document.getElementById('close');
const overlay = document.getElementById('overlay');
closeNewDilemma.addEventListener('click', closeComposer)
overlay.addEventListener('click', closeComposer)
const cancelNewDilemma = document.getElementById('cancel-button');
cancelNewDilemma.addEventListener('click', closeComposer)
// Post dilemma                       -------------------- uncomment later
const postDilemma = document.getElementById('post-button');
postDilemma.addEventListener('click', submitDilemmaHandler);

// ------- Render feed ------

function renderStories() {
  let dilemmaDiv = document.getElementById('feed');
  let currentTime = new Date();

  get('/api/dilemmas', {}, function(dArray) {
    for (let i = 0; i < dArray.length; i++) {
      const currentDilemma = dArray[i];
      dilemmaDiv.prepend(dilemmaDOMObject(currentDilemma));

      dilemmaID = currentDilemma._id;

      yesDiv = document.getElementById('comments-yes' + dilemmaID);
      //noDiv = document.getElementById('comments-no' + dilemmaID);

      console.log("dilemma id: " + dilemmaID);
      //console.log(noDiv);

      // render yes comments
      get('/api/comments', {parent_id:dilemmaID, yes_or_no:"yes"}, function(cArray) {
        for (let i = 0; i < cArray.length; i++) {
          if (cArray[i] != null) {
            yesDiv.appendChild(commentDOMObject(cArray[i]));
          }
        }
      })

      // render no comments
      
    }
  });
}
renderStories();