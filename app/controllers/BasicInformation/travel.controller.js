const db = require("../../models");
const config = require("../../config/auth.config");
const Travel = db.travel;
const Bus = db.bus;
const BusType = db.busType;
const City = db.city;
const Driver = db.driver;
const TravelDetail = db.travelDetail;
const Direction = db.direction;
const DirectionDetail = db.directionDetail;
var moment = require("moment");

const Op = db.Sequelize.Op;
const { v1: uuidv1 } = require("uuid");

exports.create = async (req, res) => {
  const travel = req.body;
  console.log("Travel", travel);

  Travel.create(travel)
    .then((travelRes) => {
      travelRes;
      console.log("travelRes = ", travelRes);
      DirectionDetail.findAll({
        where: { directionId: travel.directionId },
        order: [["order", "ASC"]],
      })
        .then(async (data) => {
          for (let i = 0; i < data.length; i++) {
            const source = data[i];
            for (let j = i + 1; j < data.length; j++) {
              const destination = data[j];
              var price =
                ((destination.distanceFromSource - source.distanceFromSource) /
                  (data[data.length - 1].distanceFromSource -
                    data[0].distanceFromSource)) *
                travelRes.basePrice;
              if (price < 0) {
                price *= -1;
              }
              var departureDatetime = moment(travelRes.departureDatetime)
                .add(source.durationFromSource, "m")
                .toDate();
              var travelDetail = {
                travelId: travelRes.id,
                status: 1,
                sourceId: source.cityId,
                destinationId: destination.cityId,
                departureDatetime: departureDatetime,
                price: price,
              };
              console.log("travelDetail create = ", travelDetail);
              await TravelDetail.create(travelDetail);
              // TravelDetail.create(travelDetail)
              //   .then((data) => {})
              //   .catch((err) => {
              //     res.status(500).send({
              //       Message: err.message || "خطای سرور",
              //       Status: 500,
              //     });
              //   });
            }
          }
          res.status(200).send({
            Message: "سفر با موفقیت ایجاد شد",
            Status: 201,
          });
        })
        .catch((err) => {
          res.status(500).send({
            Message: err.message || "خطای سرور",
            Status: 500,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        Message: err.message || "خطای سرور",
        Status: 500,
      });
    });
};

exports.getAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  const departureDatetime = req.query.departureDatetime;
  if (departureDatetime) {
    const dateStart = new Date(departureDatetime).setHours(0, 0, 0, 0);
    const dateEnd = new Date(departureDatetime).setHours(23, 59, 59, 0);
    console.log("dateStart ", dateStart);
    console.log("dateEnd ", dateEnd);
    if (condition) {
      condition.departureDatetime = {
        [Op.gt]: dateStart,
        [Op.lt]: dateEnd,
      };
    } else {
      condition = {
        departureDatetime: {
          [Op.gt]: dateStart,
          [Op.lt]: dateEnd,
        },
      };
    }
  }

  Travel.findAll({
    where: condition,
    include: [
      { model: Bus, include: [{ model: BusType }] },
      {
        model: Direction,
        include: [{ model: DirectionDetail, include: [{ model: City }] }],
      },
      { model: Driver },
    ],
    order: [
      // ["Direction.DirectionDetail.arrivalTime", "ASC"],
      [Direction, DirectionDetail, "durationFromSource", "ASC"],
      ["departureDateTime", "DESC"],
    ],
  })
    .then((data) => {
      res.status(200).send({
        Message: "تمامی راننده‌ها با موفقیت دریافت شدند",
        Status: 200,
        Data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        Message: err.message || "خطای سرور",
        Status: 500,
      });
    });
};

exports.get = (req, res) => {
  const id = req.params.id;

  Travel.findByPk(id)
    .then((data) => {
      if (data != null) {
        res.status(200).send({
          Message: "سفر با موفقیت دریافت شد",
          Status: 200,
          Data: data,
        });
      } else {
        res.status(404).send({
          Message: "سفر مورد نظر یافت نشد",
          Status: 404,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        Message: err.message || "خطای سرور",
        Status: 500,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  const Travel = req.body;

  Travel.update(Travel, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          Message: "سفر با موفقیت بروزرسانی شد",
          Status: 200,
        });
      } else {
        res.send({
          Message: `سفر مورد نظر پیدا نشد`,
          Status: 400,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        Message: err.message || "خطای سرور",
        Status: 500,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Travel.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          Message: "سفر  با موفقیت حذف شد",
          Status: 200,
        });
      } else {
        res.send({
          message: `سفر مورد نظر پیدا نشد`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        Message: err.message || "خطای سرور",
        Status: 500,
      });
    });
};

exports.deleteAll = (req, res) => {
  Travel.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        Message: `${nums} سفر با موفقیت حذ شدند`,
        Status: 200,
      });
    })
    .catch((err) => {
      res.status(500).send({
        Message: err.message || "خطای سرور",
        Status: 500,
      });
    });
};
