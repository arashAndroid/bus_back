const { authJwt } = require("../../middleware");
const DirectionDetailController = require("../../controllers/BasicInformation/directionDetail.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/v1/directionDetail/:did", DirectionDetailController.create, [
    authJwt.verifyToken,
    authJwt.isAdmin,
  ]);

  app.post(
    "/api/v1/directionDetailBulk",
    DirectionDetailController.bulkCreate,
    [authJwt.verifyToken, authJwt.isAdmin]
  );

  app.get("/api/v1/directionDetail/:did", DirectionDetailController.getAll, [
    authJwt.verifyToken,
    authJwt.isAdmin,
  ]);
  app.get("/api/v1/directionDetail/:did/:id", DirectionDetailController.get, [
    authJwt.verifyToken,
    authJwt.isAdmin,
  ]);
  app.put(
    "/api/v1/directionDetail/:did/:id",
    DirectionDetailController.update,
    [authJwt.verifyToken, authJwt.isAdmin]
  );

  app.delete(
    "/api/v1/directionDetail/:did/:id",
    DirectionDetailController.delete,
    [authJwt.verifyToken, authJwt.isAdmin]
  );

  // app.delete(
  //   "/api/v1/directionDetail",
  //   DirectionDetailController.deleteAll
  // );
};
