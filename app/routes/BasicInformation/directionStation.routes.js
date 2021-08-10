const { authJwt } = require("../../middleware");
const DirectionStationController = require("../../controllers/BasicInformation/directionStation.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/v1/directionStation", DirectionStationController.create, [
    authJwt.verifyToken,
    authJwt.isAdmin,
  ]);
  app.post(
    "/api/v1/directionStationBulk",
    DirectionStationController.bulkCreate,
    [authJwt.verifyToken, authJwt.isAdmin]
  );
  app.get("/api/v1/directionStation", DirectionStationController.getAll, [
    authJwt.verifyToken,
    authJwt.isAdmin,
  ]);
  app.get("/api/v1/directionStation/:id", DirectionStationController.get, [
    authJwt.verifyToken,
    authJwt.isAdmin,
  ]);
  app.put("/api/v1/directionStation/:id", DirectionStationController.update, [
    authJwt.verifyToken,
    authJwt.isAdmin,
  ]);

  app.delete(
    "/api/v1/directionStation/:id",
    DirectionStationController.delete,
    [authJwt.verifyToken, authJwt.isAdmin]
  );

  // app.delete(
  //   "/api/v1/directionStation",
  //   DirectionStationController.deleteAll
  // );
};
