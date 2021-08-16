const db = require("../../models");
const config = require("../../config/auth.config");
// const Sequelize = require("sequelize");
const Ticket = db.ticket;
const Travel = db.travel;
const TravelDetail = db.travelDetail;
const Bus = db.bus;
const BusType = db.busType;
const City = db.city;
const Driver = db.driver;
const User = db.user;
const Direction = db.direction;
const DirectionDetail = db.directionDetail;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const ticket = req.body;
  Ticket.create(ticket)
    .then((data) => {
      Ticket.findAll({
        where: { id: data.id },
        include: [
          {
            model: TravelDetail,
            include: [
              { model: City, as: "source" },
              { model: City, as: "destination" },
              {
                model: Travel,
                include: [
                  { model: Bus, include: [{ model: BusType }] },
                  { model: Driver },
                ],
              },
            ],
          },

          {
            model: User,
          },
        ],
      })
        .then((data) => {
          console.log("ticket created data", data[0]);
          res.status(200).send({
            Message: "بلیط با موفقیت ایجاد شد",
            Status: 200,
            Data: data[0],
          });
        })
        .catch((err) => {
          res.status(500).send({
            Message: err.message || "خطای سرور",
            Status: 500,
          });
        });
      // res.status(200).send({
      //   Message: "بلیط با موفقیت ایجاد شد",
      //   Status: 201,
      //   Data: data,
      // });
    })
    .catch((err) => {
      res.status(500).send({
        Message: err.message || "خطای سرور",
        Status: 500,
      });
    });
};

exports.getAll = (req, res) => {
  condition = req.query;
  console.log("condition = ", condition);
  Ticket.findAll({
    where: condition,
    include: [
      {
        model: TravelDetail,
        as: "travel_detail",
        include: [
          { model: City, as: "source" },
          { model: City, as: "destination" },
          {
            model: Travel,
            include: [
              { model: Bus, include: [{ model: BusType }] },
              {
                model: Direction,
                include: [
                  {
                    model: DirectionDetail,
                  },
                ],
              },
              { model: Driver },
            ],
          },
        ],
      },

      {
        model: User,
      },
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

  Ticket.findByPk(id)
    .then((data) => {
      if (data != null) {
        res.status(200).send({
          Message: "بلیط با موفقیت دریافت شد",
          Status: 200,
          Data: data,
        });
      } else {
        res.status(404).send({
          Message: "بلیط مورد نظر یافت نشد",
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
  const ticket = req.body;

  Ticket.update(ticket, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          Message: "بلیط با موفقیت بروزرسانی شد",
          Status: 200,
        });
      } else {
        res.send({
          Message: `بلیط مورد نظر پیدا نشد`,
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

  Ticket.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          Message: "بلیط  با موفقیت حذف شد",
          Status: 200,
        });
      } else {
        res.send({
          message: `بلیط مورد نظر پیدا نشد`,
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
  Ticket.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        Message: `${nums} بلیط با موفقیت حذ شدند`,
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
