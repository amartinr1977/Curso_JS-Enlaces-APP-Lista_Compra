// (1) Definición de Variables
const articulo = document.getElementById("articulo");
const cantidad = document.querySelector("#cantidad");
const prioridad = document.querySelector("#prioridad");
const agregar = document.querySelector("#agregar");
const formulario = document.querySelector("#formulario");
const listacompra = document.querySelector("#listacompra");
const barraprogreso = document.querySelector("#barraprogreso");
let listado = [];

// (2) Definición de funciones
function ComprobarInput() {
  //   console.log(`Input: ${articulo.value} - ${articulo.value.length}`);
  agregar.disabled = articulo.value.length === 0;
  /* if (articulo.value.length === 0) {
    agregar.disabled = true;
  } else {
    agregar.disabled = false;
  } */
}

const CrearLista = (art, cant, pri) => {
  let elemento = {
    articulo: art,
    cantidad: cant,
    prioridad: pri,
    estado: false,
    id: Math.random()
      .toString()
      .substring(2, 9)
  };
  listado.push(elemento);
  console.log(listado);
};

const MostrarLista = () => {
  listacompra.innerHTML = "";
  if (listado.length === 0) {
    listacompra.innerHTML =
      /*html*/
      `<div class="alert alert-danger">
      <i class="material-icons align-middle">list</i> No hay Articulos que comprar
      </div>`;
  } else {
    for (let i = 0; i < listado.length; i++) {
      listacompra.innerHTML +=
        /*html*/
        `<div class="alert alert-success no-seleccionable" 
              id="alert-${listado[i].id}">
      <i class="material-icons align-middle">list</i>
      <b>${listado[i].articulo}</b>
      <span class="badge badge-primary"> ${listado[i].cantidad}</span>
      <span style="padding: 10px;  background-color: orange; border-radius: 10%">
      ${listado[i].prioridad}</span>
      <span id="identificador" style="display: none">${listado[i].id}</span>
      <i class="material-icons align-middle float-right"
        style="font-size: 1.5em; cursor: pointer">delete</i>
      <i class="material-icons align-middle float-right iconos"
        id="check-${listado[i].id}"
        style="font-size: 1.5em; cursor: pointer;">check_circle</i>
      </div>`;
      let idcheck = "check-" + listado[i].id;
      let idalert = "alert-" + listado[i].id;
      if (listado[i].estado) {
        document.getElementById(idcheck).classList.add("mired");
        document.getElementById(idalert).classList.add("opacidad");
      } else {
        document.getElementById(idcheck).classList.remove("mired");
        document.getElementById(idalert).classList.remove("opacidad");
      }
    }

    let contador = 0;
    listado.forEach(elemento => {
      if (elemento.estado) contador++;
    });
    let porcentaje = ((contador * 100) / listado.length).toFixed(2);
    barraprogreso.innerHTML =
      /*html*/
      `<div class="progress-bar" role="progressbar" 
        style="width: ${porcentaje}%;" 
        aria-valuenow="${porcentaje}" aria-valuemin="0" aria-valuemax="100">
        ${porcentaje}%
    </div>`;
  }
};

const AgregarArticulo = e => {
  e.preventDefault();
  CrearLista(articulo.value, cantidad.value, prioridad.value);
  localStorage.setItem("listado", JSON.stringify(listado));
  MostrarLista();
  formulario.reset();
  ComprobarInput();
};

const EliminarElemento = identificador => {
  let posicion;
  for (let j = 0; j < listado.length; j++) {
    if (listado[j].id === identificador) {
      posicion = j;
    }
  }
  listado.splice(posicion, 1);
  localStorage.setItem("listado", JSON.stringify(listado));
  MostrarLista();
};

const ModificarElemento = identificador => {
  /* if (document.getElementById(identificador).style.color === "rgb(255, 0, 0)") {
    document.getElementById(identificador).style.color = "rgb(255, 240, 0)";
  } else {
    document.getElementById(identificador).style.color = "rgb(255, 0, 0)";
  } */
  let idelemento = identificador.split("-")[1];
  /* let idalert = "alert-" + idelemento;
  document.getElementById(identificador).classList.toggle("mired");
  document.getElementById(idalert).classList.toggle("opacidad"); */
  let indice;
  listado.forEach((elemento, index) => {
    if (elemento.id === idelemento) indice = index;
  });
  listado[indice].estado = !listado[indice].estado;
  console.log("El estado es: " + indice);

  localStorage.setItem("listado", JSON.stringify(listado));
  MostrarLista();
};

const Actuar = e => {
  e.preventDefault();
  console.log(e);
  if (e.target.innerHTML.trim() === "delete") {
    const path = event.path || (event.composedPath && event.composedPath());
    console.log(path[1].children[4].innerHTML);
    EliminarElemento(path[1].children[4].innerHTML);
  }
  if (e.target.innerHTML.trim() === "check_circle") {
    console.log(e.target.id);
    ModificarElemento(e.target.id);
  }
};

const Incializar = () => {
  ComprobarInput();
  if (localStorage.getItem("listado") == null) {
    listado = [];
  } else {
    listado = JSON.parse(localStorage.getItem("listado"));
  }

  MostrarLista();
};

// (3) Definición de Eventos
document.addEventListener("DOMContentLoaded", Incializar);
articulo.addEventListener("keyup", ComprobarInput);
agregar.addEventListener("click", AgregarArticulo);
listacompra.addEventListener("click", Actuar);
