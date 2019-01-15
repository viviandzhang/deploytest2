function commentDOMObject(commentJSON) {
    const commentDiv = document.createElement('div');
    commentDiv.setAttribute('id', commentJSON._id);
    commentDiv.className = 'comment mb-2';
  
    const commentCreatorSpan = document.createElement('a');
    commentCreatorSpan.className = 'comment-creator';
    commentCreatorSpan.innerHTML = commentJSON.creator_name;
    commentCreatorSpan.setAttribute('href', '/u/profile?' + commentJSON.creator_id);
    commentDiv.appendChild(commentCreatorSpan);
  
    const commentContentSpan = document.createElement('span');
    commentContentSpan.className = 'comment-content';
    commentContentSpan.innerHTML = ' | ' + commentJSON.content;
    commentDiv.appendChild(commentContentSpan);
  
    return commentDiv;
  }
  
  function newCommentDOMObject(parent) {
    const newCommentDiv = document.createElement('div');
    newCommentDiv.className = 'comment input-group';
  
    const newCommentContent = document.createElement('input');
    newCommentContent.setAttribute('type', 'text');
    newCommentContent.setAttribute('name', 'content');
    newCommentContent.setAttribute('placeholder', 'New Comment');
    newCommentContent.setAttribute('id', parent + '-comment-input');
    newCommentContent.className = 'form-control';
    newCommentDiv.appendChild(newCommentContent);
  
    // here: create an input for commenting
    const newCommentParent = document.createElement('input');
    newCommentParent.setAttribute('type', 'hidden');
    newCommentParent.setAttribute('name', 'parent');
    newCommentParent.setAttribute('value', parent);
    newCommentDiv.appendChild(newCommentParent);
  
    const newCommentButtonDiv = document.createElement('div');
    newCommentButtonDiv.className = 'input-group-append';
    newCommentDiv.appendChild(newCommentButtonDiv);
  
    const newCommentSubmit = document.createElement('button');
    newCommentSubmit.innerHTML = 'Submit';
    newCommentSubmit.className = 'btn btn-outline-primary';
    newCommentSubmit.setAttribute('story-id', parent);
    // here: event handler for when we post comments
    // this happens when we click on the submit button
    newCommentSubmit.addEventListener('click', submitCommentHandler);
    newCommentButtonDiv.appendChild(newCommentSubmit);
  
    return newCommentDiv;
  }
  
  function submitCommentHandler() {
    // TO BE IMPLEMENTED:
    // make a POST request to our newly implemented db and store that comment
    const commentInput = document.getElementById(this.getAttribute('story-id') + '-comment-input');
  
    const data = {
        /* what are the parameters needed by our server? */
        content: commentInput.value,
        parent: this.getAttribute('story-id')
    };
  
    post('insert api endpoint here', data);
    // one more thing: can you guess what?
    commentInput.value = '';
  }