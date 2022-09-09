
const formRegis = document.getElementById('formRegis');
const formLogin = document.getElementById('formLogin');
const inputs = document.querySelectorAll('#formRegis input');



const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,9}$/ // 7 a 9 numeros.
}

const campos = {
	nombre: false,
	apellido: false,
	password: false,
	correo: false,
	telefono: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
		case "apellido":
			validarCampo(expresiones.apellido, e.target, 'apellido');
            break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
            validarPassword2();
            break;
		case "password2":
			validarPassword2();
            break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
            break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
            break;
	}
}

//VALIDA CAMPOS
const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		campos[campo] = true;
        console.log("PERMITIDO");
	} else {
		campos[campo] = false;
        console.log("NO PERMITIDO");
	}
}


//VALIDA CONFIRMACION DE CONTRASEÑA
const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('confirm-password');

	if(inputPassword1.value !== inputPassword2.value){
		campos['password'] = false;
        console.log("DIFERENTES "+inputPassword1.value+" Y "+inputPassword2.value);
	} else {
		campos['password'] = true;
        console.log("IGUALES "+inputPassword1.value+" Y "+inputPassword2.value);
	}
}

//VALIDA DESPUES DE SOLTAR LA TECLA
inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});


/////////////////////////FIREBASE///////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////



// Agrega documentos, comprobando la validación
formRegis.addEventListener('submit', (e) => {

	const terminos = document.getElementById('termCon');
	if(campos.nombre && campos.apellido && campos.password && campos.correo && campos.telefono && terminos.checked){
        
        alert("CUENTA CREADA");
        create(); //Llena la base de datos
		formRegis.reset();
        
	} else {
        alert("INGRESE BIEN LO DATOS");
        e.preventDefault();
        
    }
});


//Limpiar los formularios al navegar
const a = document.querySelectorAll('a');

a.forEach((a) => {
	a.addEventListener('click', () => {
        formLogin.reset();
        formRegis.reset();
    })
});



