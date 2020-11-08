// const firebase_db = firebase.database()
const firebase_db = firebase.firestore()

let signUpForm = document.querySelector('.sign-up-form'); 
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
