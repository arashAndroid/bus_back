const db = require("../../models");
const config = require("../../config/auth.config");
const Travel = db.Travel;

const Op = db.Sequelize.Op;




exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      Message: "عنوان سفر را وارد کنید"
    });
    return;
  }


  const Travel = req.body;
  console.log('Travel', Travel);
  Travel.create(Travel)
    .then(data => {
      res.status(200).send({
        Message: "سفر با موفقیت ایجاد شد",
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


  Travel.findAll({ where: condition })
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

  Travel.findByPk(id)
    .then(data => {
      if (data != null) {
        res.status(200).send({
          Message: "سفر با موفقیت دریافت شد",
          Status: 200,
          Data: data

        });
      } else {
        res.status(404).send({
          Message: "سفر مورد نظر یافت نشد",
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
  const Travel = req.body;

  Travel.update(Travel, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          Message: "سفر با موفقیت بروزرسانی شد",
          Status: 200,
        });
      } else {
        res.send({
          Message: `سفر مورد نظر پیدا نشد`,
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

  Travel.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          Message: "سفر  با موفقیت حذف شد",
          Status: 200
        });
      } else {
        res.send({
          message: `سفر مورد نظر پیدا نشد`
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
  Travel.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({
        Message: `${nums} سفر با موفقیت حذ شدند`,
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

