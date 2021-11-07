const mostrarProyectos = async () => {
  let contenido = document.getElementById("container");
  let proyectos = await getProyectos();
  proyectos.forEach(async element => {
    let datos = element.data();
    let categoria = await getCategoria(datos.categoria)
    categoria = categoria.data();
    contenido.innerHTML += `
              <div id="proyecto${element.id}" class="proyectoMain">
                <center>
                  <div class="imgProyecto">
                    <img width=200 src=${datos.urlFoto} ><br>
                  </div>
                  ${categoria.nombre}<br>
                  ${datos.Publico}<br>
                  Etapa: ${datos.etapa}<br><br>
                  <button id="${element.id}" onclick="verficha(this)" class="borderBoton btn btn-warning">Ver ficha</button>
                  <br><br>
                </center>
              </div>
            `;

  });
}
mostrarProyectos();


function agregarComentario(element) {
  let proyectoId = element.id;
  Swal.mixin({
    input: 'text',
    confirmButtonText: 'Finalizar comentario;',
    showCancelButton: true,
    progressSteps: ['1']
  }).queue([
    {
      title: 'Comentario',
      text: 'Ingresa tu comentario'
    }
  ]).then((result) => {
    if (result.value) {
      let comentario = result.value;
      db.collection("comentarios").doc().set({
        comentario,
        proyectoId
      })
      Swal.fire({
        title: '¡Comentario Registrado!',
        html:
          'Tu comentario es: <pre><code>' +
          result.value +
          '</code></pre>',
        confirmButtonText: 'Ok'

      })
    }
  });
}
const actualizarAvance = async (objeto) => {
  Swal.fire({
    position: 'top-end',
    title: 'Actualizando proyecto',
    showConfirmButton: false,
  })
  let id = objeto.id;
  let proyecto = await getProyecto(id);
  proyecto=proyecto.data();
  let nombre=proyecto.nombre;
  let categoria=proyecto.categoria;
  let descripcion=proyecto.descripcion;
  let urlFoto=proyecto.urlFoto;
  let Programa=proyecto.Programa;
  let Publico=proyecto.Publico;
  let contenidoInnovador=proyecto.contenidoInnovador;
  let areaAplicacion=proyecto.areaAplicacion;
  let impacto=proyecto.impacto;
  let solucionBrindada=proyecto.solucionBrindada;
  let objetivo=proyecto.objetivo;
  let Participantes=proyecto.Participantes;
  let Metodologia=proyecto.Metodologia;
  let palabras=proyecto.palabras;
  let idioma=proyecto.idioma;
  let licencia=proyecto.licencia;
  let Asesores=proyecto.Asesores;
  let dueño=proyecto.dueño;
  let etapa=proyecto.etapa+1;
  let estado=proyecto.estado;
  if(etapa>4){
    estado=false;
    Swal.fire({
      position: 'top-end',
      title: 'Su proyecto ha terminado su ciclo...',
    })
  }
  await db.collection("proyectos").doc(id).set({
    nombre,
    categoria,
    descripcion,
    urlFoto,
    Programa,
    Publico,
    contenidoInnovador,
    areaAplicacion,
    impacto,
    solucionBrindada,
    objetivo,
    Participantes,
    Metodologia,
    palabras,
    idioma,
    licencia,
    Asesores,
    dueño,
    etapa,
    estado
  });
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Proyecto actualizado',
    showConfirmButton: false,
    timer: 1500
  })
}
