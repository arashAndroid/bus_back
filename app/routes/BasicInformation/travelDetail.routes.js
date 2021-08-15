const { authJwt } = require("../../middleware");
const TravelDetailController = require("../../controllers/BasicInformation/travelDetail.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/v1/travelDetail/:tid", TravelDetailController.create, [
    authJwt.verifyToken,
    authJwt.isAdmin,
  ]);

  app.post("/api/v1/travelDetailBulk", TravelDetailController.bulkCreate, [
    authJwt.verifyToken,
    authJwt.isAdmin,
  ]);

  app.get("/api/v1/travelDetail/:tid", TravelDetailController.getAll, [
    authJwt.verifyToken,
    authJwt.isAdmin,
  ]);
  app.get("/api/v1/travelDetail/", TravelDetailController.search, []);
  app.get("/api/v1/travelDetail/:tid/:id", TravelDetailController.get, [
    authJwt.verifyToken,
    authJwt.isAdmin,
  ]);
  app.put("/api/v1/travelDetail/:tid/:id", TravelDetailController.update, [
    authJwt.verifyToken,
    authJwt.isAdmin,
  ]);

  app.delete("/api/v1/travelDetail/:tid/:id", TravelDetailController.delete, [
    authJwt.verifyToken,
    authJwt.isAdmin,
  ]);

  // app.delete(
  //   "/api/v1/travelDetail",
  //   TravelDetailController.deleteAll
  // );
};
