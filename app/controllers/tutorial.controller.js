const Tutorial = require("../models/tutorial.model.js");

// Crear y guardar un nuevo Tutorial (Blog)
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío."
    });
    return;
  }

  // Crear un Tutorial (Blog)
  const tutorial = new Tutorial({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    
  });

  // Guardar el Tutorial (Blog) en la base de datos
  Tutorial.create(tutorial, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocurrió un error al crear el Tutorial (Blog)."
      });
    else res.send(data);
  });
};

// Recuperar todos los Tutoriales (Blogs) de la base de datos
exports.findAll = (req, res) => {
  const title = req.query.title;

  Tutorial.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocurrió un error al recuperar los tutoriales (blogs)."
      });
    else res.send(data);
  });
};

// Encontrar un solo Tutorial (Blog) por ID
exports.findOne = (req, res) => {
  Tutorial.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró un Tutorial (Blog) con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error al recuperar el Tutorial (Blog) con el ID " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Encontrar todos los Tutoriales (Blogs) publicados
exports.findAllPublished = (req, res) => {
  Tutorial.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocurrió un error al recuperar los tutoriales (blogs) publicados."
      });
    else res.send(data);
  });
};

// Actualizar un Tutorial (Blog) identificado por el ID en la solicitud
exports.update = (req, res) => {
  // Validar la solicitud
  if (!req.body) {
    res.status(400).send({
      message: "El contenido no puede estar vacío."
    });
    return;
  }

  console.log(req.body);

  Tutorial.updateById(
    req.params.id,
    new Tutorial(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `No se encontró un Tutorial (Blog) con el ID ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error al actualizar el Tutorial (Blog) con el ID " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Eliminar un Tutorial (Blog) con el ID especificado en la solicitud
exports.delete = (req, res) => {
  Tutorial.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `No se encontró un Tutorial (Blog) con el ID ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "No se pudo eliminar el Tutorial (Blog) con el ID " + req.params.id
        });
      }
    } else res.send({ message: `¡El Tutorial (Blog) se eliminó correctamente!` });
  });
};

// Eliminar todos los Tutoriales (Blogs) de la base de datos
exports.deleteAll = (req, res) => {
  Tutorial.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocurrió un error al eliminar todos los tutoriales (blogs)."
      });
    else res.send({ message: "¡Todos los Tutoriales (Blogs) se eliminaron correctamente!" });
  });
};
