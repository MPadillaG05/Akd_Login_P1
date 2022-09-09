var firebaseConfig = {
    apiKey: "AIzaSyC3eb1iDDje_ByMUQK5crCb8LhxB69flWU",
    authDomain: "akd-p1-login.firebaseapp.com",
    projectId: "akd-p1-login",
    storageBucket: "akd-p1-login.appspot.com",
    messagingSenderId: "1008813608391",
    appId: "1:1008813608391:web:40793da3eafebb97039de2"
  };

  // Inicializa Firebase
  firebase.initializeApp(firebaseConfig);

  var db = firebase.firestore();

  function create(){
    var name = document.getElementById("name").value;
    var lastName = document.getElementById("last-name").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var object = {
        name: name,
        last_Name: lastName,
        phone: phone,
        email: email,
        password: password
    }

    //Se crea la colección 'users' y se agrega datos
    db.collection("users").add(object).then(()=>{
        console.log("SE REGISTRO");
    })

  }
  
