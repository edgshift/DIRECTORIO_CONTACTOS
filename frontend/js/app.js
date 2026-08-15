// app.js
// Aquí vive toda la lógica de la interfaz: pintar las tarjetas,
// abrir/cerrar el panel de formulario y manejar crear/editar/eliminar.

const listaContactos = document.getElementById("listaContactos");
const estadoVacio = document.getElementById("estadoVacio");
const contador = document.getElementById("contador");
const buscador = document.getElementById("buscador");

const overlay = document.getElementById("overlay");
const panel = document.getElementById("panelFormulario");
const formContacto = document.getElementById("formContacto");
const tituloFormulario = document.getElementById("tituloFormulario");
const btnEliminar = document.getElementById("btnEliminar");
const toast = document.getElementById("toast");

let contactos = [];

// ---------- Cargar y pintar ----------

async function cargarContactos() {
  try {
    contactos = await obtenerContactos();
    pintarContactos(contactos);
  } catch (error) {
    mostrarToast("No se pudo conectar con el servidor");
    console.error(error);
  }
}

function pintarContactos(lista) {
  listaContactos.innerHTML = "";
  contador.textContent = `${lista.length} contacto${lista.length === 1 ? "" : "s"}`;
  estadoVacio.classList.toggle("oculto", lista.length !== 0);

  lista.forEach((contacto) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-contacto";
    tarjeta.innerHTML = `
      <div class="tarjeta-inicial">${contacto.nombre.charAt(0).toUpperCase()}</div>
      <h3 class="tarjeta-nombre">${contacto.nombre}</h3>
      <p class="tarjeta-empresa">${contacto.empresa}</p>
      <p class="tarjeta-linea"><span>T</span>${contacto.telefono}</p>
      <p class="tarjeta-linea"><span>@</span>${contacto.correo}</p>
    `;
    tarjeta.addEventListener("click", () => abrirFormularioEdicion(contacto));
    listaContactos.appendChild(tarjeta);
  });
}

// ---------- Búsqueda ----------

buscador.addEventListener("input", () => {
  const termino = buscador.value.trim().toLowerCase();
  const filtrados = contactos.filter(
    (c) =>
      c.nombre.toLowerCase().includes(termino) ||
      c.empresa.toLowerCase().includes(termino)
  );
  pintarContactos(filtrados);
});

// ---------- Abrir / cerrar panel ----------

function abrirFormularioNuevo() {
  formContacto.reset();
  document.getElementById("contactoId").value = "";
  tituloFormulario.textContent = "Nuevo contacto";
  btnEliminar.classList.add("oculto");
  mostrarPanel();
}

function abrirFormularioEdicion(contacto) {
  document.getElementById("contactoId").value = contacto._id;
  document.getElementById("nombre").value = contacto.nombre;
  document.getElementById("telefono").value = contacto.telefono;
  document.getElementById("correo").value = contacto.correo;
  document.getElementById("empresa").value = contacto.empresa;
  document.getElementById("notas").value = contacto.notas;
  tituloFormulario.textContent = "Editar contacto";
  btnEliminar.classList.remove("oculto");
  mostrarPanel();
}

function mostrarPanel() {
  overlay.classList.remove("oculto");
  panel.classList.remove("oculto");
}

function cerrarPanel() {
  overlay.classList.add("oculto");
  panel.classList.add("oculto");
}

document.getElementById("btnNuevo").addEventListener("click", abrirFormularioNuevo);
document.getElementById("btnCancelar").addEventListener("click", cerrarPanel);
document.getElementById("btnCerrarPanel").addEventListener("click", cerrarPanel);
overlay.addEventListener("click", cerrarPanel);

// ---------- Guardar (crear o actualizar) ----------

formContacto.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const id = document.getElementById("contactoId").value;
  const datos = {
    nombre: document.getElementById("nombre").value.trim(),
    telefono: document.getElementById("telefono").value.trim(),
    correo: document.getElementById("correo").value.trim(),
    empresa: document.getElementById("empresa").value.trim(),
    notas: document.getElementById("notas").value.trim()
  };

  try {
    if (id) {
      await actualizarContacto(id, datos);
      mostrarToast("Contacto actualizado");
    } else {
      await crearContacto(datos);
      mostrarToast("Contacto creado");
    }
    cerrarPanel();
    cargarContactos();
  } catch (error) {
    mostrarToast("Ocurrió un error al guardar");
    console.error(error);
  }
});

// ---------- Eliminar ----------

btnEliminar.addEventListener("click", async () => {
  const id = document.getElementById("contactoId").value;
  const confirmado = confirm("¿Seguro que quieres eliminar este contacto?");
  if (!confirmado) return;

  try {
    await eliminarContacto(id);
    mostrarToast("Contacto eliminado");
    cerrarPanel();
    cargarContactos();
  } catch (error) {
    mostrarToast("No se pudo eliminar");
    console.error(error);
  }
});

// ---------- Toast ----------

let toastTimeout;
function mostrarToast(mensaje) {
  clearTimeout(toastTimeout);
  toast.textContent = mensaje;
  toast.classList.remove("oculto");
  toastTimeout = setTimeout(() => toast.classList.add("oculto"), 2500);
}

// ---------- Inicio ----------

cargarContactos();
