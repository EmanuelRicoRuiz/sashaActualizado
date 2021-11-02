const mostrarEspacios = async () => {
  let contenido = document.getElementById("container");
  let espacios = await getEspacios();
  espacios.forEach(async element => {


    let datos = element.data();
    let categoria = await getCategoria(datos.categoria)
    categoria = categoria.data();
    contenido.innerHTML += `
            <div id="proyecto${element.id}" class="proyectoMain espacios">
            <center>
              <div class="imgProyecto">
                <img width=200 src=${datos.urlFoto} ><br>
              </div>
              ${categoria.nombre}<br>
              ${datos.descripcion}<br><br>
              <button id="${element.id}" onclick="vistaReserva(this)" class="borderBoton btn btn-warning">${datos.nombre}</button><br><br>
              <button id="${element.id}" onclick="verDisponibilidad(this)" class="borderBoton btn btn-warning">lista de espera</button><br><br>
              <button id="${element.id}" onclick="reservas(this)" class="borderBoton btn btn-warning">Disponibilidad</button>
              <br><br>
            </center>
          </div>
        `;


  });
}
mostrarEspacios();
const reservar = (objeto) => {
  event.preventDefault();
  Swal.fire({
    position: 'top-end',
    title: 'Realizando reserva',
    showConfirmButton: false,
  })
  let id = objeto.id;
  let nombre = document.getElementById("nombre").value;
  let apellido = document.getElementById("apellido").value;
  let cedula = document.getElementById("cedula").value;
  let fecha = document.getElementById("fecha").value;
  let Hora = document.getElementById("Hora").value;
  let cantidadHoras = document.getElementById("cantidadHoras").value;
  let espacio = id
  let estado = false;
  db.collection("reservaEspacio").doc(cedula + id).set({
    nombre,
    apellido,
    cedula,
    fecha,
    Hora,
    cantidadHoras,
    espacio,
    estado
  })
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Reserva realizada',
    showConfirmButton: false,
    timer: 1500
  })
}
const verDisponibilidad = async (objeto) => {
  let reservas = await getReserva(objeto.id);
  let espacio=await getEspacio(objeto.id);
  espacio=espacio.data();

  let contenido=document.getElementById("contenido");
  contenido.innerHTML
  =`
  <center><h2>Reservas para el espacio ${espacio.nombre}</h2></center>
    <table class="table table-striped" >
      <thead>
        <tr>
          <th scope="col">Cedula</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Fecha</th>
          <th scope="col">Hora</th>
          <th scope="col">Cantidad de horas</th>
          <th scope="col">Aprobar</th>
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
      <td>${datos.fecha}</td>
      <td>${datos.Hora}</td>
      <td>${datos.cantidadHoras}</td>
      <td><a id="${element.id}" onclick="aprobarReserva(this)"><img width="30" src="./IMG/confirmar1.png"></a></td>
  </tr>
    `
  })
}
const aprobarReserva=async (objeto)=>{
  let id=objeto.id;
  event.preventDefault();
  Swal.fire({
    position: 'top-end',
    title: 'Aprobando reserva',
    showConfirmButton: false,
  })
  let reserva=await getReservaTrue(id);
  reserva=reserva.data();
  let nombre = reserva.nombre;
  let apellido = reserva.apellido;
  let cedula = reserva.cedula;
  let fecha = reserva.cedula;
  let Hora = reserva.Hora;
  let cantidadHoras = reserva.cantidadHoras;
  let espacio = reserva.espacio
  let estado = true;
  db.collection("reservaEspacio").doc(id).set({
    nombre,
    apellido,
    cedula,
    fecha,
    Hora,
    cantidadHoras,
    espacio,
    estado
  })
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Reserva Aprobada',
    showConfirmButton: false,
    timer: 1500
  })
}
const reservas=async(objeto)=>{
  let reservas = await getReservaAprobada(objeto.id);
  let espacio=await getEspacio(objeto.id);
  espacio=espacio.data();

  let contenido=document.getElementById("contenido");
  contenido.innerHTML
  =`
  <center><h2>Reservas para el espacio ${espacio.nombre}</h2></center>
    <table class="table table-striped" >
      <thead>
        <tr>
          <th scope="col">Cedula</th>
          <th scope="col">Nombre</th>
          <th scope="col">Apellido</th>
          <th scope="col">Fecha</th>
          <th scope="col">Hora</th>
          <th scope="col">Cantidad de horas</th>
          
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
      <td>${datos.fecha}</td>
      <td>${datos.Hora}</td>
      <td>${datos.cantidadHoras}</td>
      
  </tr>
    `
  })
}