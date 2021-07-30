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
  );
  app.get(
    "/api/v1/bus",
    CityController.getAll
  );
  app.get(
    "/api/v1/bus/:id",
    CityController.get
  );
  app.put(
    "/api/v1/bus/:id",
    CityController.update
  );

  app.delete(
    "/api/v1/bus/:id",
    CityController.delete
  );

  // app.delete(
  //   "/api/v1/bus",
  //   CityController.deleteAll
  // );
};
