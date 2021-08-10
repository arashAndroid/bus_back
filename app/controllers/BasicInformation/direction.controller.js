const db = require("../../models");
const config = require("../../config/auth.config");
const Direction = db.direction;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      Message: "عنوان مسیر را وارد کنید",
    });
    return;
  }

  const direction = req.body;
  console.log("direction", direction);
  Direction.create(direction)
    .then((data) => {
      res.status(200).send({
        Message: "مسیر با موفقیت ایجاد شد",
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

  Direction.findAll({ where: condition })
    .then((data) => {
      res.status(200).send({
        Message: "تمامی مسیرها با موفقیت دریافت شدند",
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

  Direction.findByPk(id)
    .then((data) => {
      if (data != null) {
        res.status(200).send({
          Message: "مسیر با موفقیت دریافت شد",
          Status: 200,
          Data: data,
        });
      } else {
        res.status(404).send({
          Message: "مسیر مورد نظر یافت نشد",
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
  const direction = req.body;

  Direction.update(direction, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          Message: "مسیر با موفقیت بروزرسانی شد",
          Status: 200,
        });
      } else {
        res.send({
          Message: `مسیر مورد نظر پیدا نشد`,
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

  Direction.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          Message: "مسیر  با موفقیت حذف شد",
          Status: 200,
        });
      } else {
        res.send({
          message: `مسیر مورد نظر پیدا نشد`,
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
  Direction.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        Message: `${nums} مسیر با موفقیت حذ شدند`,
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
