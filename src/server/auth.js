import { Person, dbApiCalls } from './firestore.js';

// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user){
        var uid = auth.currentUser.uid;
        console.log('User logged in: ', uid);
    } else {
        console.log('User logged out: ', user);
    }
})

// SIGN UP USER
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = signupForm['signup-name'].value;
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;
  const isProfessor = signupForm["signup-role"][0].checked;

  var role = '';
  var user = '';

  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    const modal = document.querySelector('#modal-signup');
    var uid = auth.currentUser.uid;

    M.Modal.getInstance(modal).close();
    signupForm.reset();

    if(isProfessor)
        role = 'p';
    else
        role = 'a';
    
    user = new Person(uid, name, email, role, {'seg': {}, 'ter': {}, 'qua':{}, 'qui': {}, 'sex':{}});
    dbApiCalls.post(user);
  });
});

// LOG OUT METHOD
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

// LOGIN
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred => {
        // close the modal and reset the form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    })
    
})