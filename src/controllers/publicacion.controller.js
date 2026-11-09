const { buscarCategoriaPorId } = require("./categoria.controller");

// Datos en memoria (sin base de datos)
let publicaciones = [
  {
    id: 1,
    titulo: "Laptop Lenovo IdeaPad",
    descripcion: "Laptop en buen estado, 8GB RAM y 256GB SSD",
    precio: 450,
    categoriaId: 1,
    estado: "activo",
    fechaCreacion: "2026-11-01T10:00:00.000Z",
  },
  {
    id: 2,
    titulo: "Sofá de 3 cuerpos",
    descripcion: "Sofá de tela color gris, poco uso",
    precio: 200,
    categoriaId: 2,
    estado: "activo",
    fechaCreacion: "2026-11-02T15:30:00.000Z",
  },
];

let ultimoId = 2;

const ESTADOS_VALIDOS = ["activo", "pausado", "vendido"];

function buscarPublicacionPorId(id) {
  return publicaciones.find(function (publicacion) {
    return publicacion.id === Number(id);
  });
}

// GET /api/publicaciones
function listarPublicaciones(req, res) {
  return res.status(200).json(publicaciones);
}

// GET /api/publicaciones/:id
function obtenerPublicacion(req, res) {
  const publicacion = buscarPublicacionPorId(req.params.id);

  if (!publicacion) {
    return res.status(404).json({ mensaje: "Publicación no encontrada" });
  }

  return res.status(200).json(publicacion);
}

// POST /api/publicaciones
function crearPublicacion(req, res) {
  const { titulo, descripcion, precio, categoriaId, estado } = req.body || {};

  if (!titulo || String(titulo).trim() === "") {
    return res.status(400).json({ mensaje: "El título es obligatorio" });
  }

  if (precio === undefined || isNaN(Number(precio)) || Number(precio) < 0) {
    return res.status(400).json({ mensaje: "El precio debe ser un número mayor o igual a 0" });
  }

  if (!categoriaId || !buscarCategoriaPorId(categoriaId)) {
    return res.status(400).json({ mensaje: "La categoría indicada no existe" });
  }

  const estadoFinal = estado === undefined ? "activo" : String(estado).toLowerCase();

  if (!ESTADOS_VALIDOS.includes(estadoFinal)) {
    return res.status(400).json({ mensaje: `El estado debe ser uno de: ${ESTADOS_VALIDOS.join(", ")}` });
  }

  const nuevaPublicacion = {
    id: ++ultimoId,
    titulo: String(titulo).trim(),
    descripcion: descripcion ? String(descripcion).trim() : "",
    precio: Number(precio),
    categoriaId: Number(categoriaId),
    estado: estadoFinal,
    fechaCreacion: new Date().toISOString(),
  };

  publicaciones.push(nuevaPublicacion);

  return res.status(201).json(nuevaPublicacion);
}

// PUT /api/publicaciones/:id
function actualizarPublicacion(req, res) {
  const publicacion = buscarPublicacionPorId(req.params.id);

  if (!publicacion) {
    return res.status(404).json({ mensaje: "Publicación no encontrada" });
  }

  const { titulo, descripcion, precio, categoriaId, estado } = req.body || {};

  if (titulo !== undefined) {
    if (String(titulo).trim() === "") {
      return res.status(400).json({ mensaje: "El título no puede estar vacío" });
    }

    publicacion.titulo = String(titulo).trim();
  }

  if (descripcion !== undefined) {
    publicacion.descripcion = String(descripcion).trim();
  }

  if (precio !== undefined) {
    if (isNaN(Number(precio)) || Number(precio) < 0) {
      return res.status(400).json({ mensaje: "El precio debe ser un número mayor o igual a 0" });
    }

    publicacion.precio = Number(precio);
  }

  if (categoriaId !== undefined) {
    if (!buscarCategoriaPorId(categoriaId)) {
      return res.status(400).json({ mensaje: "La categoría indicada no existe" });
    }

    publicacion.categoriaId = Number(categoriaId);
  }

  if (estado !== undefined) {
    const estadoFinal = String(estado).toLowerCase();

    if (!ESTADOS_VALIDOS.includes(estadoFinal)) {
      return res
        .status(400)
        .json({ mensaje: `El estado debe ser uno de: ${ESTADOS_VALIDOS.join(", ")}` });
    }

    publicacion.estado = estadoFinal;
  }

  return res.status(200).json(publicacion);
}

// DELETE /api/publicaciones/:id
function eliminarPublicacion(req, res) {
  const indice = publicaciones.findIndex(function (publicacion) {
    return publicacion.id === Number(req.params.id);
  });

  if (indice === -1) {
    return res.status(404).json({ mensaje: "Publicación no encontrada" });
  }

  const [publicacionEliminada] = publicaciones.splice(indice, 1);

  return res.status(200).json({
    mensaje: "Publicación eliminada correctamente",
    publicacion: publicacionEliminada,
  });
}

module.exports = {
  listarPublicaciones,
  obtenerPublicacion,
  crearPublicacion,
  actualizarPublicacion,
  eliminarPublicacion,
  buscarPublicacionPorId,
};
