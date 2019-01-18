function submitDilemmaHandler() {
    let title = document.getElementById('comp-title').value;
    let body = document.getElementById('comp-body').value;
    let selectedCategories = document.getElementsByClassName('comp-categories comp-categories-selected');

    let selectedCategoriesArray = [];

    for (let i=0; i<selectedCategories.length; i++) {
        categoryName = selectedCategories[i].innerHTML;
        selectedCategoriesArray.push(categoryName);
    }

    let timestamp = new Date();

    const data = {
      title: title,
      body: body,
      categories: selectedCategoriesArray,
      timestamp: timestamp,
    }

    post('/api/dilemma', data);

    closeComposer();
  }

function submitCommentHandler(dilemma_id, yes_or_no) {
    let inputField = document.getElementById('comment-field-' + yes_or_no + dilemma_id);
    let body = inputField.value;
    let timestamp = new Date();

    const data = {
        timestamp: timestamp,
        body: body,
        yes_or_no: yes_or_no,
        parent_id: dilemma_id,
    }

    post('/api/comment', data);
    inputField.value="";
}