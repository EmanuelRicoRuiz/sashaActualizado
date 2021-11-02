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
                <button id="${element.id}" onclick="vistaFormulario(this)" class="borderBoton btn btn-warning">Asistir</button>
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