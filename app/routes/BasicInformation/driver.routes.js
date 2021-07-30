const { authJwt } = require("../../middleware");
const CityController = require("../../controllers/BasicInformation/driver.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });



  app.post(
    "/api/v1/driver",
    CityController.create
  );
  app.get(
    "/api/v1/driver",
    CityController.getAll
  );
  app.get(
    "/api/v1/driver/:id",
    CityController.get
  );
  app.put(
    "/api/v1/driver/:id",
    CityController.update
  );

  app.delete(
    "/api/v1/driver/:id",
    CityController.delete
  );

  // app.delete(
  //   "/api/v1/driver",
  //   CityController.deleteAll
  // );
};
