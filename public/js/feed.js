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

  get('/api/dilemmas', {}, function(dArray) {
    for (let i = 0; i < dArray.length; i++) {
      const currentDilemma = dArray[i];
      dilemmaDiv.prepend(dilemmaDOMObject(currentDilemma));


    }
  });
}
renderStories();
// -------- Expanding a dilemma ---------
/*
function expandDilemma(dilemma_id){
  let debateSection = document.getElementById('debate-section');
  debateSection.style.display = "flex";

  let dCardExpandFooter = document.getElementById ('d-card-expand-footer');
  dCardExpandFooter.style.display = "none";

  let topComments = document.getElementById ('top-comments');
  topComments.style.display = "none";
}

const expandFooter = document.getElementById ('d-card-expand-footer');
expandFooter.addEventListener('click', expandDilemma);
*/

