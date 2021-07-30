const db = require("../../models");
const config = require("../../config/auth.config");
const BusType = db.busType;

const Op = db.Sequelize.Op;




exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      Message: "عنوان نوع اتوبوس را وارد کنید"
    });
    return;
  }


  const busType = req.body;
  console.log('busType', busType);
  BusType.create(busType)
    .then(data => {
      res.status(200).send({
        Message: "نوع اتوبوس با موفقیت ایجاد شد",
        Status: 201,

      });
    })
    .catch(err => {
      res.status(500).send({
        Message:
          err.message || "خطای سرور",
        Status: 500
      });
    });
};

exports.getAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
  const provinceId = req.query.provinceId;
  if (provinceId) {
    if (condition) {
      condition.provinceId = provinceId;
    } else {
      condition = { provinceId: provinceId };
    }
  }


  BusType.findAll({ where: condition })
    .then(data => {
      res.status(200).send({
        Message: "تمامی راننده‌ها با موفقیت دریافت شدند",
        Status: 200,
        Data: data

      });
    })
    .catch(err => {
      res.status(500).send({
        Message:
          err.message || "خطای سرور",
        Status: 500
      });
    });
};

exports.get = (req, res) => {
  const id = req.params.id;

  BusType.findByPk(id)
    .then(data => {
      if (data != null) {
        res.status(200).send({
          Message: "نوع اتوبوس با موفقیت دریافت شد",
          Status: 200,
          Data: data

        });
      } else {
        res.status(404).send({
          Message: "نوع اتوبوس مورد نظر یافت نشد",
          Status: 404,

        });
      }
    })
    .catch(err => {
      res.status(500).send({
        Message:
          err.message || "خطای سرور",
        Status: 500
      });
    });
};



exports.update = (req, res) => {
  const id = req.params.id;
  const busType = req.body;

  BusType.update(busType, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          Message: "نوع اتوبوس با موفقیت بروزرسانی شد",
          Status: 200,
        });
      } else {
        res.send({
          Message: `نوع اتوبوس مورد نظر پیدا نشد`,
          Status: 400
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        Message:
          err.message || "خطای سرور",
        Status: 500
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  BusType.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          Message: "نوع اتوبوس  با موفقیت حذف شد",
          Status: 200
        });
      } else {
        res.send({
          message: `نوع اتوبوس مورد نظر پیدا نشد`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        Message:
          err.message || "خطای سرور",
        Status: 500
      });
    });
};

exports.deleteAll = (req, res) => {
  BusType.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({
        Message: `${nums} نوع اتوبوس با موفقیت حذ شدند`,
        Status: 200
      });
    })
    .catch(err => {
      res.status(500).send({
        Message:
          err.message || "خطای سرور",
        Status: 500
      });

    });
};

