const verficha = async (element) => {
    let id = element.id;
    let contenido = document.getElementById("container");
    contenido.innerHTML = "";
    contenido = document.getElementById("contenido");
    contenido.innerHTML = "";
    
    let proyecto = await getProyecto(id);
    proyecto = proyecto.data();
    contenido.innerHTML = `
    <div class="ficha">
                <center><img src="${proyecto.urlFoto}" width=100></center>
                <h3>Nombre del proyecto</h3>
                <p>${proyecto.nombre}</p>
                <h3>Descripcion</h3>
                <p>${proyecto.descripcion}</p>
                <h3>Programa</h3>
                <p>${proyecto.Programa}</p>
                <h3>Publico</h3>
                <p>${proyecto.Publico}</p>
                <h3>contenido Innovador</h3>
                <p>${proyecto.contenidoInnovador}</p>
                <h3>Área Aplicación</h3>
                <p>${proyecto.areaAplicacion}</p>
                <h3>Impacto</h3>
                <p>${proyecto.impacto}</p>
                <h3>Solución Brindada</h3>
                <p>${proyecto.solucionBrindada}</p>
                <h3>Objetivo</h3>
                <p>${proyecto.objetivo}</p>
                <h3>Participantes</h3>
                <p>${proyecto.Participantes}</p>
                <h3>Metodología</h3>
                <p>${proyecto.Metodologia}</p>
                <h3>Palabras</h3>
                <p>${proyecto.palabras}</p>
                <h3>Idioma</h3>
                <p>${proyecto.idioma}</p>
                <h3>Licencia</h3>
                <p>${proyecto.licencia}</p>
                <h3>Asesores</h3>
                <p>${proyecto.Asesores}</p>
                <center><button id="${element.id}" onclick="actualizarAvance(this)" class="borderBoton btn btn-warning">Actualizar avance</button></center>
    </div>
            
        `;

}