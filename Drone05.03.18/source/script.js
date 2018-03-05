// It is a handler of NavBar:
document.querySelector('.sidebar').onclick = function openNav() {
  document.querySelector('.sidenav').style.width = "150px";
  document.querySelector('.wrapper').style.marginLeft = "150px";
}

document.querySelector('.closeBtnNav').onclick = function closeNav() {
  document.querySelector('.sidenav').style.width = "0";
  document.querySelector('.wrapper').style.marginLeft = "0";
}

// To chage font-size:
var btnChangeFontSize = document.querySelector('#changeTagP');
btnChangeFontSize.addEventListener('click', function() {
  document.getElementById("inputPx").focus();
  var p = document.getElementsByTagName("P");
  var inputPxVal = document.getElementById("inputPx").value;
  if (inputPxVal == parseInt(inputPxVal, 10)) {
    if (inputPxVal != '' && inputPxVal >= 8 && inputPxVal <= 24) {
      for (var i = 0; i < p.length; i++) {
        p[i].setAttribute("style", "font-size: " + inputPxVal + "px;");
      }
    } else {
      alert('Select value between 8 and 24 px!');
    }
  } else {
    alert('Data is not an integer!');
  }
  document.getElementById("inputPx").focus();
});


// ----Handler of color picker:
var myColorPicker;
window.addEventListener("load", startup, false);

function startup() {
  myColorPicker = document.getElementById("myColorPicker");
  myColorPicker.addEventListener("input", updateColor, false);
}

function updateColor(event) {
  var selExp = document.getElementById("exprmnt");
  if (selExp) {
    selExp.style.background = event.target.value;
  }
}


// ----Handler of radio buttons:
document.getElementById('changeFontBtn').onclick = function changeFontBtn() {
  var radioBtn = document.getElementsByName("radioFont");
  for (var i = 0; i < radioBtn.length; i++) {
    if (radioBtn[i].checked) {
      var p = document.getElementsByTagName("P");
      for (var j = 0; j < p.length; j++) {
        p[j].setAttribute("style", "font-family: '" + radioBtn[i].value + "', sans-serif;");
      }
      break;
    }
  }
}

// ----handler of Delete button:
document.getElementById('delPBtn').onclick = function deleteLastP() {
  var tagP = document.getElementsByTagName("P");
  var i = tagP.length - 1;
  if (i != null) {
    tagP[i].parentNode.removeChild(tagP[i]);
  }
}


// ----To scroll to top:
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
  scrollFunction()
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("topBtn").style.display = "block";
  } else {
    document.getElementById("topBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
document.getElementById('topBtn').onclick = function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


// Handler for Firebase:

// Initialize Firebase
var config = {
  apiKey: "AIzaSyA1MU08DE4k8h4lqFv6XfKiVDgRrlx8Enk",
  authDomain: "akalyuzhin-app.firebaseapp.com",
  databaseURL: "https://akalyuzhin-app.firebaseio.com",
  projectId: "akalyuzhin-app",
  storageBucket: "akalyuzhin-app.appspot.com",
  messagingSenderId: "339214807448"
};
firebase.initializeApp(config);
//  End of Firebase's Initialization

//Get Input elements from login-form
const auth_login = document.querySelector('#auth_login');
const auth_password = document.querySelector('#auth_password');

//Get Input elements from register-form
const register_login = document.querySelector('#register_login');
const register_password = document.querySelector('#register_password');
const register_confirmation = document.querySelector('#register_confirmation');

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    var user = firebase.auth().currentUser;
    if (user != null) {
      var email_id = user.email;
      document.getElementById("user_signed")
        .innerHTML = "Hello, " + email_id +
        " . You can use Menu of sidebar now." +
        "</br>Just scroll to top.";
      // Set visibile for Menu.
      document.querySelector('.menu_vsblty').style.visibility = "visible";

    }
  } else {
    // No user is signed in.
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
    // Set hidden for Menu.
    document.querySelector('.menu_vsblty').style.visibility = "hidden";
    document.querySelector('.sidenav').style.width = "0";
    document.querySelector('.wrapper').style.marginLeft = "0";
  }
});

// Add Sign In (Auth) event
document.getElementById('auth').onclick = function funcLogin() {
  // Get email and password
  const email = auth_login.value;
  const password = auth_password.value;
  if (!email || !password) {
    window.alert('Email and password required!');
    return console.log('Email and password required!');
  }
  firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error : " + errorCode + ":" + errorMessage);
      return console.log("Error : " + errorCode + ":" + errorMessage);
    });
}

// Add Sign Out event
document.getElementById('signOut').onclick = function funcLogout() {
  firebase.auth().signOut();
}

// Add register event
document.getElementById('register').onclick = function funcReg() {
  // Get email and password
  const email = register_login.value;
  const password = register_password.value;
  const password_cnfrm = register_confirmation.value;
  if (password.toString() == password_cnfrm.toString()) {
    if (!email || !password) {
      window.alert('Email and password required!');
      return console.log('Email and password required!');
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
          console.log('error', error);
        } else {
          alert(errorMessage);
          console.log('error', error);
        }
        if (error.code === 'auth/email-already-in-use') {
          var credential = firebase.auth.EmailAuthProvider
            .credential(email, password);
          firebase.auth().currentUser.linkWithCredential(credential)
            .then(function(user) {
              console.log("Account linking success", user);
            }, function(error) {
              console.log("Account linking error", error);
            });
        }
      });
  } else {
    console.log('error: password and password_cnfrm are not equale!');
    window.alert('Password and pasword_confirmation are not equale!');
  }
}
