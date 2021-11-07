
const firebaseConfig = {
    apiKey: "AIzaSyBFAhiDqfl79_92hUadzZdfV-taa16AmVE",
    authDomain: "jupiter-c.firebaseapp.com",
    projectId: "jupiter-c",
    storageBucket: "jupiter-c.appspot.com",
    messagingSenderId: "92183003286",
    appId: "1:92183003286:web:bd4185320cce403ae042b7",
    measurementId: "G-7M8HSL0E9L"
  };

firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.firestore();
const ref = firebase.storage().ref();
const observador=()=>{
  try{
    firebase.auth().onAuthStateChanged((user)=>{
      sideBarcontent(user);    
  })
  }catch{
    console.log("ventana de inicio")
  }
    
}
observador()
const currentUser=()=>{
  firebase.auth().onAuthStateChanged((user)=>{
      return user.uid   
  })
}
const getUsuario =(id)=>db.collection("usuarios").doc(id).get();
const getPermisos=(id)=>db.collection("tipoDeUsuario").doc(id).get();
const getCategorias=()=>db.collection("categorias").get();
const getCategoria=(id)=>db.collection("categorias").doc(id).get();
const getEventos=()=>db.collection("eventos").get();
const getEvento=(id)=>db.collection("eventos").doc(id).get();
const getEspacios=()=>db.collection("espacios").get();
const getProyectos=()=>db.collection("proyectos").where("estado","==",true).get();
const getEncuestas=()=>db.collection("encuesta").get();
const getPreguntas=(numeroEncuesta)=>db.collection("encuesta").where("numeroEncuesta","==",numeroEncuesta).get();
const getArticulos=()=> db.collection("articulos").get();
const getProyecto=(id)=>db.collection("proyectos").doc(id).get();
const getEntidadesFalse=()=>db.collection("entidad").where("aprobacion","==",false).get();
const getEntidad=(id)=>db.collection("entidad").doc(id).get();
const getEntidadesTrue=()=>db.collection("entidad").where("aprobacion","==",true).get();
const getServicios=()=>db.collection("servicios").get();
const getEspacio=(id)=>db.collection("espacios").doc(id).get();
const getReserva=(id)=>db.collection("reservaEspacio").where("espacio","==",id).where("estado","==",false).get();
const getReservaAprobada=(id)=>db.collection("reservaEspacio").where("espacio","==",id).where("estado","==",true).get();
const getReservaTrue=(id)=>db.collection("reservaEspacio").doc(id).get();
const getAsistencia=(id)=>db.collection("asistenciaEvento").where("evento","==",id).get();
const getServicio=(id)=>db.collection("servicios").doc(id).get();