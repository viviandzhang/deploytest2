function submitDilemmaHandler() {
    let title = document.getElementById('comp-title').value;
    let body = document.getElementById('comp-body').value;
    let selectedCategories = document.getElementsByClassName('comp-categories comp-categories-selected');

    let selectedCategoriesArray = [];

    for (let i=0; i<selectedCategories.length; i++) {
        categoryName = selectedCategories[i].innerHTML;
        selectedCategoriesArray.push(categoryName);
    }

    const data = {
      title: title,
      body: body,
      categories: selectedCategoriesArray,
    }

    post('/api/dilemma', data);

    closeComposer();
  }

function getDilemmaByID(id){
    get('/api/dilemma', {'_id':id}, function(d){
            console.log(d);
    });
}

function getCommentsByID(id){
    
}