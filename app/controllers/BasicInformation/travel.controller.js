const db = require("../../models");
const config = require("../../config/auth.config");
const Travel = db.travel;
const Bus = db.bus;
const BusType = db.busType;
const City = db.city;
const Driver = db.driver;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const travel = req.body;
  console.log("Travel", travel);

  Travel.create(travel)
    .then((data) => {
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
};

exports.getAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  const destinationId = req.query.destinationId;
  if (destinationId) {
    if (condition) {
      condition.destinationId = destinationId;
    } else {
      condition = { destinationId: destinationId };
    }
  }
  const sourceId = req.query.sourceId;
  if (sourceId) {
    if (condition) {
      condition.sourceId = sourceId;
    } else {
      condition = { sourceId: sourceId };
    }
  }
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
      { model: City },
      { model: Bus, include: [{ model: BusType },] },
      { model: Driver },
    ]
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
