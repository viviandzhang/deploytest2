function submitDilemmaHandler(user) {
    let title = document.getElementById('comp-title').value;
    let body = document.getElementById('comp-body').value;
    let selectedCategories = document.getElementsByClassName('comp-categories comp-categories-selected');

    let selectedCategoriesArray = [];

    for (let i=0; i<selectedCategories.length; i++) {
        categoryName = selectedCategories[i].innerHTML;
        selectedCategoriesArray.push(categoryName);
    }

    let timestamp = new Date();
    let creator_alias;
    let creator_id;
    let creator_color;

    if (user._id!==undefined) {
          creator_alias = user.adjective;
          creator_id = user._id;
          creator_color = user.color;
    } else {
          creator_alias = "Anon";
          creator_id = "anon id";
          creator_color = "pink";
        }
        const data = {
            title: title,
            body: body,
            categories: selectedCategoriesArray,
            timestamp: timestamp,
            creator_id: creator_id,
            creator_color: creator_color,
            creator_alias: creator_alias
          }

    post('/api/dilemma', data);
    closeComposer();
}

function submitCommentHandler(dilemma_id, yes_or_no, user) {
    let inputField = document.getElementById('comment-field-' + yes_or_no + dilemma_id);
    let body = inputField.value;
    if (body.length > 0){
        let commentButton = document.getElementById('comment-button-' + yes_or_no + dilemma_id);

        let timestamp = new Date();
        let creator_alias;
        let creator_id;
        let creator_color;

            if (user._id!==undefined) {
                creator_alias = user.adjective;
                creator_id = user._id;
                creator_color = user.color;
            } else {
                creator_alias = "Anon";
                creator_id = "anon id";
                creator_color = "pink";
            }
            const data = {
                timestamp: timestamp,
                body: body,
                yes_or_no: yes_or_no,
                parent_id: dilemma_id,
                creator_id: creator_id,
                creator_color: creator_color,
                creator_alias: creator_alias
            }
            console.log(data);
        
            post('/api/comment', data);
    }
    inputField.value="";
}

function commentVoteHandler(comment_id) {
    console.log("vote handler for: " + comment_id);
    alreadyLiked = false;

    get('/api/whoami', {}, function(user) {
        if (user.googleid!=undefined) {
            get('/api/userById', {_id:user._id}, function(userDBItem){
                likedComments = userDBItem.liked_comments;
                for (let i=0; i<likedComments.length; i++){
                    if (comment_id === likedComments[i]){
                        alreadyLiked = true;
                    }
                }
                if (alreadyLiked===false){
                     post('/api/addVoteToComment', {_id:comment_id}, function(c){
                         post('/api/addCommentToUser', {_id:userDBItem._id, comment_id:comment_id}, function(d){
                         console.log("you just liked this " + comment_id);
                         });
                     });
                } else {
                     console.log("already liked, sorry")
                }
            });
        }
    })
}

function renderLlamaProfile () {
    let llamaName = document.getElementById('llama-name');
    let realName = document.getElementById('real-name'); 

    get('/api/whoami', {}, function(user) {
            llamaName.innerHTML=user.adjective + " " + user.color; 
            realName.innerHTML=user.name; 
            console.log(user.adjective);
        
    });
}