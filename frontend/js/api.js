// api.js
// Todas las funciones que hablan con el backend (fetch) viven aquí.
// Si el backend corre en otro puerto o lo despliegas en la nube,
// solo tienes que cambiar esta constante.

const API_URL = "http://localhost:3000/api/contactos_directorio";

// Obtener todos los contactos
async function obtenerContactos() {
  const respuesta = await fetch(API_URL);
  if (!respuesta.ok) throw new Error("No se pudieron cargar los contactos");
  return respuesta.json();
}

// Obtener un contacto por id
async function obtenerContactoPorId(id) {
  const respuesta = await fetch(`${API_URL}/${id}`);
  if (!respuesta.ok) throw new Error("No se encontró el contacto");
  return respuesta.json();
}

// Crear un contacto nuevo
async function crearContacto(datos) {
  const respuesta = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  });
  if (!respuesta.ok) throw new Error("No se pudo crear el contacto");
  return respuesta.json();
}

// Actualizar un contacto existente
async function actualizarContacto(id, datos) {
  const respuesta = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(datos)
  });
  if (!respuesta.ok) throw new Error("No se pudo actualizar el contacto");
  return respuesta.json();
}

// Eliminar un contacto
async function eliminarContacto(id) {
  const respuesta = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!respuesta.ok) throw new Error("No se pudo eliminar el contacto");
  return respuesta.json();
}
