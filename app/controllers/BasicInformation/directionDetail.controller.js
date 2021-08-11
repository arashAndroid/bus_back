const db = require("../../models");
const config = require("../../config/auth.config");
const DirectionDetail = db.directionDetail;
const City = db.city;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const directionDetail = req.body;
  directionDetail.directionId = req.params.did;
  console.log("directionDetail", directionDetail);
  DirectionDetail.create(directionDetail)
    .then((data) => {
      res.status(200).send({
        Message: "جزئیات-مسیر با موفقیت ایجاد شد",
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
exports.bulkCreate = (req, res) => {
  const directionDetails = req.body;
  console.log("directionDetail", directionDetails);
  DirectionDetail.bulkCreate(dataArray)
    .then(() => {
      return DirectionDetail.findAll();
    })
    .then((directionDetailsAll) => {
      console.log(directionDetailsAll);
      res.status(200).send({
        Message: "جزئیات-مسیر‌ها با موفقیت ایجاد شدند",
        Status: 201,
      });
    });
};

exports.getAll = (req, res) => {
  const did = req.params.did;
  var condition;
  if (did) {
    if (condition) {
      condition.directionId = did;
    } else {
      condition = { directionId: did };
    }
  }

  DirectionDetail.findAll({ where: condition, include: [{ model: City }] })
    .then((data) => {
      res.status(200).send({
        Message: "تمامی جزئیات-مسیرها با موفقیت دریافت شدند",
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

  DirectionDetail.findByPk(id)
    .then((data) => {
      if (data != null) {
        res.status(200).send({
          Message: "جزئیات-مسیر با موفقیت دریافت شد",
          Status: 200,
          Data: data,
        });
      } else {
        res.status(404).send({
          Message: "جزئیات-مسیر مورد نظر یافت نشد",
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
  const directionDetail = req.body;

  DirectionDetail.update(directionDetail, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          Message: "جزئیات-مسیر با موفقیت بروزرسانی شد",
          Status: 200,
        });
      } else {
        res.send({
          Message: `جزئیات-مسیر مورد نظر پیدا نشد`,
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

  DirectionDetail.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          Message: "جزئیات-مسیر  با موفقیت حذف شد",
          Status: 200,
        });
      } else {
        res.send({
          message: `جزئیات-مسیر مورد نظر پیدا نشد`,
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
  DirectionDetail.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        Message: `${nums} جزئیات-مسیر با موفقیت حذ شدند`,
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
