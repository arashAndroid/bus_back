const db = require("../../models");
const config = require("../../config/auth.config");
const User = db.user;

const Op = db.Sequelize.Op;




exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({
      Message: "عنوان کاربر را وارد کنید"
    });
    return;
  }


  const user = req.body;
  console.log('user', user);
  User.create(user)
    .then(data => {
      res.status(200).send({
        Message: "کاربر با موفقیت ایجاد شد",
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


  User.findAll({ where: condition })
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

  User.findByPk(id)
    .then(data => {
      if (data != null) {
        res.status(200).send({
          Message: "کاربر با موفقیت دریافت شد",
          Status: 200,
          Data: data

        });
      } else {
        res.status(404).send({
          Message: "کاربر مورد نظر یافت نشد",
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
  const user = req.body;

  User.update(user, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          Message: "کاربر با موفقیت بروزرسانی شد",
          Status: 200,
        });
      } else {
        res.send({
          Message: `کاربر مورد نظر پیدا نشد`,
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

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          Message: "کاربر  با موفقیت حذف شد",
          Status: 200
        });
      } else {
        res.send({
          message: `کاربر مورد نظر پیدا نشد`
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
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({
        Message: `${nums} کاربر با موفقیت حذ شدند`,
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

