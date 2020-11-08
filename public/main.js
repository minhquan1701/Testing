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
        let blogList = []
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
