const db = require("../../models");
const config = require("../../config/auth.config");
const Bus = db.bus;
const BusType = db.busType;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      Message: "عنوان اتوبوس را وارد کنید",
    });
    return;
  }

  const bus = req.body;
  console.log("bus", bus);
  Bus.create(bus)
    .then((data) => {
      res.status(200).send({
        Message: "اتوبوس با موفقیت ایجاد شد",
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
  const provinceId = req.query.provinceId;
  if (provinceId) {
    if (condition) {
      condition.provinceId = provinceId;
    } else {
      condition = { provinceId: provinceId };
    }
  }

  Bus.findAll({ where: condition, include: [{ model: BusType }] })
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

  Bus.findByPk(id)
    .then((data) => {
      if (data != null) {
        res.status(200).send({
          Message: "اتوبوس با موفقیت دریافت شد",
          Status: 200,
          Data: data,
        });
      } else {
        res.status(404).send({
          Message: "اتوبوس مورد نظر یافت نشد",
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
  const bus = req.body;

  Bus.update(bus, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          Message: "اتوبوس با موفقیت بروزرسانی شد",
          Status: 200,
        });
      } else {
        res.send({
          Message: `اتوبوس مورد نظر پیدا نشد`,
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

  Bus.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          Message: "اتوبوس  با موفقیت حذف شد",
          Status: 200,
        });
      } else {
        res.send({
          message: `اتوبوس مورد نظر پیدا نشد`,
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
  Bus.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        Message: `${nums} اتوبوس با موفقیت حذ شدند`,
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
