const mostrarEntidad = async () => {
  let contenido = document.getElementById("container");
  let entidades = await getEntidadesFalse();
  entidades.forEach(async element => {
    let datos = element.data();
    contenido.innerHTML += `
            <div id="entidad${element.id}" class="entidad">
            <center>
              ${datos.nombreEntidad}<br>
              ${datos.DescripcionEntidad}<br>
              ${datos.nombreEntidad}<br><br>
              <button id="${element.id}" onclick="AprobarEntidad(this)" class="borderBoton btn btn-warning">Aprobar</button>
              <br><br>
            </center>
          </div>
        `;


  });
}
mostrarEntidad();
const AprobarEntidad = async(objeto) => {
  event.preventDefault();
  Swal.fire({
    position: 'top-end',
    title: 'Aprobando entidad',
    showConfirmButton: false,

  })
  let id=objeto.id;
  let entidad=await getEntidad(id);
  entidad=entidad.data();
  let nombreEntidad=entidad.nombreEntidad;
  let DescripcionEntidad=entidad.DescripcionEntidad;
  let CiudadEntidad=entidad.CiudadEntidad;
  let aprobacion=true;
  db.collection("entidad").doc(id).set({
    nombreEntidad, DescripcionEntidad, CiudadEntidad, aprobacion
  })
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Entidad aprobada',
    showConfirmButton: false,
    timer: 1500
  })
}
