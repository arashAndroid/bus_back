const { authJwt } = require("../../middleware");
const DirectionController = require("../../controllers/BasicInformation/direction.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/v1/direction", DirectionController.create, [
    authJwt.verifyToken,
    authJwt.isAdmin,
  ]);
  app.get("/api/v1/direction", DirectionController.getAll, [
    authJwt.verifyToken,
    authJwt.isAdmin,
  ]);
  app.get("/api/v1/direction/:id", DirectionController.get, [
    authJwt.verifyToken,
    authJwt.isAdmin,
  ]);
  app.put("/api/v1/direction/:id", DirectionController.update, [
    authJwt.verifyToken,
    authJwt.isAdmin,
  ]);

  app.delete("/api/v1/direction/:id", DirectionController.delete, [
    authJwt.verifyToken,
    authJwt.isAdmin,
  ]);

  // app.delete(
  //   "/api/v1/direction",
  //   DirectionController.deleteAll
  // );
};
