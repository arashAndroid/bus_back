const db = require("../../models");
const config = require("../../config/auth.config");
const Driver = db.driver;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const driver = req.body;
  console.log("driver", driver);
  Driver.create(driver)
    .then((data) => {
      res.status(200).send({
        Message: "راننده با موفقیت ایجاد شد",
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
  Driver.findAll()
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

  Driver.findByPk(id)
    .then((data) => {
      if (data != null) {
        res.status(200).send({
          Message: "راننده با موفقیت دریافت شد",
          Status: 200,
          Data: data,
        });
      } else {
        res.status(404).send({
          Message: "راننده مورد نظر یافت نشد",
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
  const driver = req.body;

  Driver.update(driver, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          Message: "راننده با موفقیت بروزرسانی شد",
          Status: 200,
        });
      } else {
        res.send({
          Message: `راننده مورد نظر پیدا نشد`,
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

  Driver.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          Message: "راننده  با موفقیت حذف شد",
          Status: 200,
        });
      } else {
        res.send({
          message: `راننده مورد نظر پیدا نشد`,
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
  Driver.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        Message: `${nums} راننده با موفقیت حذ شدند`,
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
