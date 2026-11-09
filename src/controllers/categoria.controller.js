// Datos en memoria (sin base de datos)
let categorias = [
  { id: 1, nombre: "Tecnología", descripcion: "Productos tecnológicos", estado: true },
  { id: 2, nombre: "Hogar", descripcion: "Artículos para el hogar", estado: true },
  { id: 3, nombre: "Vehículos", descripcion: "Autos, motos y repuestos", estado: true },
];

let ultimoId = 3;

function buscarCategoriaPorId(id) {
  return categorias.find(function (categoria) {
    return categoria.id === Number(id);
  });
}

function existeNombre(nombre, idExcluido) {
  return categorias.some(function (categoria) {
    return (
      categoria.nombre.toLowerCase() === String(nombre).trim().toLowerCase() &&
      categoria.id !== idExcluido
    );
  });
}

// GET /api/categorias
function listarCategorias(req, res) {
  return res.status(200).json(categorias);
}

// GET /api/categorias/:id
function obtenerCategoria(req, res) {
  const categoria = buscarCategoriaPorId(req.params.id);

  if (!categoria) {
    return res.status(404).json({ mensaje: "Categoría no encontrada" });
  }

  return res.status(200).json(categoria);
}

// POST /api/categorias
function crearCategoria(req, res) {
  const { nombre, descripcion, estado } = req.body || {};

  if (!nombre || String(nombre).trim() === "") {
    return res.status(400).json({ mensaje: "El nombre es obligatorio" });
  }

  if (existeNombre(nombre)) {
    return res.status(400).json({ mensaje: "Ya existe una categoría con ese nombre" });
  }

  const nuevaCategoria = {
    id: ++ultimoId,
    nombre: String(nombre).trim(),
    descripcion: descripcion ? String(descripcion).trim() : "",
    estado: estado === undefined ? true : Boolean(estado),
  };

  categorias.push(nuevaCategoria);

  return res.status(201).json(nuevaCategoria);
}

// PUT /api/categorias/:id
function actualizarCategoria(req, res) {
  const categoria = buscarCategoriaPorId(req.params.id);

  if (!categoria) {
    return res.status(404).json({ mensaje: "Categoría no encontrada" });
  }

  const { nombre, descripcion, estado } = req.body || {};

  if (nombre !== undefined) {
    if (String(nombre).trim() === "") {
      return res.status(400).json({ mensaje: "El nombre no puede estar vacío" });
    }

    if (existeNombre(nombre, categoria.id)) {
      return res.status(400).json({ mensaje: "Ya existe una categoría con ese nombre" });
    }

    categoria.nombre = String(nombre).trim();
  }

  if (descripcion !== undefined) {
    categoria.descripcion = String(descripcion).trim();
  }

  if (estado !== undefined) {
    categoria.estado = Boolean(estado);
  }

  return res.status(200).json(categoria);
}

// DELETE /api/categorias/:id
function eliminarCategoria(req, res) {
  const indice = categorias.findIndex(function (categoria) {
    return categoria.id === Number(req.params.id);
  });

  if (indice === -1) {
    return res.status(404).json({ mensaje: "Categoría no encontrada" });
  }

  const [categoriaEliminada] = categorias.splice(indice, 1);

  return res.status(200).json({
    mensaje: "Categoría eliminada correctamente",
    categoria: categoriaEliminada,
  });
}

module.exports = {
  listarCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria,
  buscarCategoriaPorId,
};
