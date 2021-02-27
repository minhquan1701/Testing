// const firebase_db = firebase.database()
const firebase_db = firebase.firestore();
const firebase_stRef = firebase.storage().ref()

let signUpForm = document.querySelector('.sign-up-form');
// let pageBody = document.getElementById('pageBody');

// pageBody.addEventListener('load', (e) => {
//     e.preventDefault();
//     console.log('blog loaded');
// })
window.onload = (e) => {
    let collection_ref = firebase_db.collection("blogposts");
    collection_ref.orderBy("name").limit(3).get().then(function(querySnapshot) {
        let blogList = [];
        querySnapshot.docs.map(doc => blogList.push(doc.data()));
        console.log(firebase_stRef.child(blogList[0].name + ".png").fullPath);

        let blogA_title = document.getElementById("blogTitleA");
        let blogA_sub = document.getElementById("blogSubtitleA");
        let blogA_pic = document.getElementById("blogPicA");
        blogA_title.innerText = blogList[0].name;
        blogA_sub.innerText = blogList[0].content.substring(0, 100).concat("...");
        firebase_stRef.child(blogList[0].name + ".png").getDownloadURL().then((url) => {
            blogA_pic.src = url;
        });

        let blogB_title = document.getElementById("blogTitleB");
        let blogB_sub = document.getElementById("blogSubtitleB");
        let blogB_pic = document.getElementById("blogPicB");
        blogB_title.innerText = blogList[1].name;
        blogB_sub.innerText = blogList[1].content.substring(0, 100).concat("...");
        firebase_stRef.child(blogList[1].name + ".png").getDownloadURL().then((url) => {
            blogB_pic.src = url;
        });
        //blogB_pic.src = firebase_stRef.child(blogList[0].name + ".png").fullPath;

        let blogC_title = document.getElementById("blogTitleC");
        let blogC_sub = document.getElementById("blogSubtitleC");
        let blogC_pic = document.getElementById("blogPicC");
        blogC_title.innerText = blogList[2].name;
        blogC_sub.innerText = blogList[2].content.substring(0, 100).concat("...");
        firebase_stRef.child(blogList[2].name + ".png").getDownloadURL().then((url) => {
            blogC_pic.src = url;
        });
        //blogC_pic.src = firebase_stRef.child(blogList[0].name + ".png").fullPath;
    }).catch(function(error) {
        console.log("Error Reading Blog Error");
    })

    // Upvote content test
    collection_ref = firebase_db.collection("upvote_test");
    collection_ref.orderBy("content").get().then(function(querySnapshot) {
        let contentList = []
        querySnapshot.docs.map(doc => contentList.push(doc.data()));

        let blogA_upvote = document.getElementById("blogAUpvote"); 
        let blogA_content = document.getElementById("blogAContent");
        blogA_content.innerText = "Vote for " + contentList[0].content;
        blogA_upvote.innerText = contentList[0].upvote;

        let blogB_upvote = document.getElementById("blogBUpvote"); 
        let blogB_content = document.getElementById("blogBContent");
        blogB_content.innerText = "Vote for " + contentList[1].content;
        blogB_upvote.innerText = contentList[1].upvote;

        let blogC_upvote = document.getElementById("blogCUpvote"); 
        let blogC_content = document.getElementById("blogCContent");
        blogC_content.innerText = "Vote for " + contentList[2].content;
        blogC_upvote.innerText = contentList[2].upvote;
    }).catch(function(error) {
        console.log(error);
    })
}

signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let teamName = document.getElementById('teamName').value;
    let email = document.getElementById('email').value;
    let numbMember = document.getElementById('numMember').value;

    // Database Opearation
    let collection_ref = firebase_db.collection("members");
    collection_ref.add({
        teamName: teamName,
        email: email,
        numbMember: numbMember
    }).then(function() {
        console.log("Document successfully written!");
    }).catch(function(error) {
        console.error("Error writing document: ", error);
    });;

    firebase_db.collection("members").get().then(function(querySnapshot) {
        // if (doc && doc.exists) {
        //     const myData = doc.data();
        //     console.log(myData);
        // }
        let dataList = []
        querySnapshot.docs.map (doc => dataList.concat(doc.data()));
    }).catch(function(error) {
        console.log("Error: ", error);
    });
    // firebase_db.ref('members/' + teamName).set({
    //     teamname: teamName,
    //     email: email,
    //     numbMember: numbMember
    // });
    // console.log(firebase_db.ref('members/').once('value').then((snapshot) => {
    //     console.log(snapshot.val());
    // }));
})



/*****FILES UPLOAD******/
var fileLists;

// Where to click to choose file
const fileUploadField = document.querySelector('.file-upload__choose-field');

// The input HTML tag that actually fires the choose file event. By default, this is hidden on front-end
const fileUpLoadInput = document.querySelector('.file-upload__input');

// Span displays name of chosen file
const selectedItem = document.querySelector('.selected-item > span');
const newItemTemplate = document.querySelector('.selected-item').cloneNode(true);

// Trigger files upload pop up 
fileUploadField.addEventListener('click', () => {
    fileUpLoadInput.click();
});

// Listen for any change in 'file' input (when there is file selected)
fileUpLoadInput.addEventListener('change', () => {
    //retrive the name of selected files.
    fileLists = Array.from(fileUpLoadInput.files).map((file) => {return file}); 
    
    
    if (fileLists.length !== 0 ){
        document.querySelector('.default-span-tag').parentElement.style.display = 'none';
    }

    //create and display span tags coressponding to selected files.
    fileLists.forEach((fileName) => {
        let newSelectItem = newItemTemplate.cloneNode(true);
        
        newSelectItem.getElementsByTagName('SPAN')[0].textContent = fileName.name;
        newSelectItem.getElementsByTagName('I')[0].style.display = 'initial'; 
       
        newSelectItem.addEventListener('click', (e)=>{
            if(e.target.tagName === 'I'){
                newSelectItem.remove();
                if (document.querySelector('.selected-item-list').childElementCount === 1){ 
                    document.querySelector('.default-span-tag').parentElement.style.display = 'flex';
                    
                }
            };
        })

        /* label.classList.add('selected-item'); */
        document.querySelector('.selected-item-list').appendChild(newSelectItem);
    })
    
});

// Handle submit file button.
function submitFile(e) {
    //e.preventDefault();
    let teamName = document.getElementById('teamName').value;
    let childRefFolder = firebase_stRef.child(teamName);
    document.querySelector('.submit-file-btn').classList.add('on-submiting');

    fileLists.map((file) => {
        let childRefFile = childRefFolder.child(teamName + "_" + file.name);
        childRefFile.put(file)
            .then((snapshot) => {
                
                if (snapshot.state == 'success') {
                document.querySelector('.submit-file-btn').classList.remove('on-submiting');
                
                document.querySelectorAll('.selected-item > span').forEach((spanTag) => {
                    if (spanTag.textContent === file.name){
                        spanTag.textContent = "Successfully upload " + file.name;
                        spanTag.nextElementSibling.style.display = 'none';
                    }
                })
                
            }})
            .catch((error) => (console.log(error)));
    });
    fileLists = null;
    
    console.log(fileLists);
}

function handleUpvote(object) {
    let upvote_ref = firebase_db.collection("upvote_test");
    let content_id = null;
    upvote_ref.where("content", "==", object.id).get().then(function(querySnapshot) {
        querySnapshot.forEach((doc) => {
            content_id = doc.id;
        });
    }).then((e) => {
        upvote_ref.doc(content_id).update({
            upvote: firebase.firestore.FieldValue.increment(1)
        })
    });
}