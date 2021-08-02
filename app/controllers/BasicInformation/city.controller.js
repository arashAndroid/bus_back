const db = require("../../models");
const config = require("../../config/auth.config");
const City = db.city;

const Op = db.Sequelize.Op;




exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      Message: "عنوان شهر را وارد کنید"
    });
    return;
  }


  const city = req.body;
  console.log('city', city);
  City.create(city)
    .then(data => {
      res.status(200).send({
        Message: "شهر با موفقیت ایجاد شد",
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


  City.findAll({ where: condition })
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

  City.findByPk(id)
    .then(data => {
      if (data != null) {
        res.status(200).send({
          Message: "شهر با موفقیت دریافت شد",
          Status: 200,
          Data: data

        });
      } else {
        res.status(404).send({
          Message: "شهر مورد نظر یافت نشد",
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
  const city = req.body;

  City.update(city, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          Message: "شهر با موفقیت بروزرسانی شد",
          Status: 200,
        });
      } else {
        res.send({
          Message: `شهر مورد نظر پیدا نشد`,
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

  City.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          Message: "شهر  با موفقیت حذف شد",
          Status: 200
        });
      } else {
        res.send({
          message: `شهر مورد نظر پیدا نشد`
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
  City.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({
        Message: `${nums} شهر با موفقیت حذ شدند`,
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

