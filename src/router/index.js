const express = require("express");

const Route = express.Router();

const categoriaController = require("../controllers/categoria.controller");
const publicacionController = require("../controllers/publicacion.controller");

// CRUD categoria sin DB
Route.get("/categorias", categoriaController.listarCategorias);
Route.get("/categorias/:id", categoriaController.obtenerCategoria);
Route.post("/categorias", categoriaController.crearCategoria);
Route.put("/categorias/:id", categoriaController.actualizarCategoria);
Route.delete("/categorias/:id", categoriaController.eliminarCategoria);

// CRUD publicacion sin DB
Route.get("/publicaciones", publicacionController.listarPublicaciones);
Route.get("/publicaciones/:id", publicacionController.obtenerPublicacion);
Route.post("/publicaciones", publicacionController.crearPublicacion);
Route.put("/publicaciones/:id", publicacionController.actualizarPublicacion);
Route.delete("/publicaciones/:id", publicacionController.eliminarPublicacion);

module.exports = Route;
