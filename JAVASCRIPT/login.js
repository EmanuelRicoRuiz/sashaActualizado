
const iniciarS=()=>{
  event.preventDefault();
  let contraseña=document.getElementById("contraseña").value;
  let correo=document.getElementById("correo").value;
  
  firebase.auth().signInWithEmailAndPassword(correo, contraseña)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    window.location.href="main.html"
    // ...
  })
  .catch((error) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Contraseña o correo inválido!',
     
    })
  });
}

