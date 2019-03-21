// (1) Definición de Variables
const articulo = document.getElementById("articulo");
const cantidad = document.querySelector("#cantidad");
const prioridad = document.querySelector("#prioridad");
const agregar = document.querySelector("#agregar");
const formulario = document.querySelector("#formulario");
const listacompra = document.querySelector("#listacompra");
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
        `<div class="alert alert-success">
      <i class="material-icons align-middle">list</i>
      <b>${listado[i].articulo}</b>
      <span class="badge badge-primary"> ${listado[i].cantidad}</span>
      <span style="padding: 10px;  background-color: orange; border-radius: 10%">
      ${listado[i].prioridad}</span>
      <span id="identificador" style="display: none">${listado[i].id}</span>
      <i class="material-icons align-middle float-right" style="font-size: 1.5em; cursor: pointer">delete </i>
      </div>`;
    }
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

const Actuar = e => {
  // console.log(e);
  if (e.target.innerHTML.trim() === "delete") {
    console.log(e.path[1].children[4].innerHTML);
    EliminarElemento(e.path[1].children[4].innerHTML);
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
