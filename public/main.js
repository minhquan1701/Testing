const firebase_db = firebase.database()
let signUpForm = document.querySelector('.sign-up-form'); 
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let teamName = document.getElementById('teamName').value;
    let email = document.getElementById('email').value;
    let numbMember = document.getElementById('numMember').value;
    // Database Opearation
    firebase_db.ref('members/' + teamName).set({
        teamname: teamName,
        email: email,
        numbMember: numbMember
    });
    console.log(firebase_db.ref('members/').once('value').then((snapshot) => {
        console.log(snapshot.val());
    }));
})
