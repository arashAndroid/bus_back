const { authJwt } = require("../../middleware");
const CityController = require("../../controllers/BasicInformation/bus.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });



  app.post(
    "/api/v1/bus",
    CityController.create
        [authJwt.verifyToken, authJwt.isAdmin],
  );
  app.get(
    "/api/v1/bus",
    CityController.getAll
        [authJwt.verifyToken, authJwt.isAdmin],
  );
  app.get(
    "/api/v1/bus/:id",
    CityController.get
        [authJwt.verifyToken, authJwt.isAdmin],
  );
  app.put(
    "/api/v1/bus/:id",
    CityController.update
        [authJwt.verifyToken, authJwt.isAdmin],
  );

  app.delete(
    "/api/v1/bus/:id",
    CityController.delete
        [authJwt.verifyToken, authJwt.isAdmin],
  );

  // app.delete(
  //   "/api/v1/bus",
  //   CityController.deleteAll
  // );
};
