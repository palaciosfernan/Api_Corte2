module.exports = app => {
  const Corte2 = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", Corte2.create);

  // Retrieve all Corte2
  router.get("/", Corte2.findAll);

  // Retrieve all published Corte2
  router.get("/published", Corte2.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", Corte2.findOne);

  // Update a Tutorial with id
  router.put("/:id", Corte2.update);

  // Delete a Tutorial with id
  router.delete("/:id", Corte2.delete);

  // Delete all Corte2
  router.delete("/", Corte2.deleteAll);

  app.use('/api/Corte2', router);
};
