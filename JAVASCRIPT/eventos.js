const mostrarEventos = async () => {
  let contenido = document.getElementById("container");
  let eventos = await getEventos();
  eventos.forEach(async element => {
    firebase.auth().onAuthStateChanged((user) => {
      user = user.uid
      let datos = element.data();
      contenido.innerHTML += `
            <div id="proyecto${element.id}" class="proyectoMain">
              <center>
                <div class="imgProyecto">
                  <img width=200 src=${datos.urlFoto} ><br>
                </div>
                ${datos.nombre}<br>
                ${datos.informacion}<br><br>
                ${datos.fecha}<br><br> 
                <button id="${element.id}" onclick="vistaFormulario(this)" class="borderBoton btn btn-warning">Asistir</button><br><br>
                <button id="${element.id}" onclick="asistentes(this)" class="borderBoton btn btn-warning">Asistentes</button>

                <br><br>
              </center>
            </div>
          `;

    })

  });
}
mostrarEventos();
const confirmarAsistencia = async(objeto) => {
  event.preventDefault();
  Swal.fire({
    position: 'top-end',
    title: 'Guardando datos',
    showConfirmButton: false,
  })
  let id=objeto.id;
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let cedula = document.getElementById("cedula").value;
  let evento=id
  await db.collection("asistenciaEvento").doc(cedula+id).set({
    nombre,
    apellido,
    cedula,
    evento
  })
  
  window.location.href="eventos.html"
}
const asistentes=async(objeto)=>{
  let reservas = await getAsistencia(objeto.id);
  let evento=await getEvento(objeto.id);
  evento=evento.data();

  let contenido=document.getElementById("contenido");
  contenido.innerHTML
  =`
  <center><h2>Asistentes para el evento ${evento.nombre}</h2></center>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Cedula</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
        </tr>
    </thead>
    <tbody id="table1">
    </tbody>
    </table>
  `;
  let table1=document.getElementById("table1");
  reservas.forEach(element=>{
    let datos=element.data();
    
    table1.innerHTML+=`
    <tr>
      <td>${datos.cedula}</td>
      <td>${datos.nombre}</td>
      <td>${datos.apellido}</td>
  </tr>
    `
  })
}