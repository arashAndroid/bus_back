const db = require("../../models");
const config = require("../../config/auth.config");
const TravelDetail = db.travelDetail;
const Travel = db.travel;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const travelDetail = req.body;
  travelDetail.travelId = req.params.tid;
  console.log("travelDetail", travelDetail);
  TravelDetail.create(travelDetail)
    .then((data) => {
      res.status(200).send({
        Message: "جزئیات-سفر با موفقیت ایجاد شد",
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
  const travelDetails = req.body;
  console.log("travelDetail", travelDetails);
  TravelDetail.bulkCreate(dataArray)
    .then(() => {
      return TravelDetail.findAll();
    })
    .then((travelDetailsAll) => {
      console.log(travelDetailsAll);
      res.status(200).send({
        Message: "جزئیات-سفر‌ها با موفقیت ایجاد شدند",
        Status: 201,
      });
    });
};

exports.getAll = (req, res) => {
  const tid = req.params.tid;
  var condition;
  if (tid) {
    if (condition) {
      condition.travelId = tid;
    } else {
      condition = { travelId: tid };
    }
  }

  TravelDetail.findAll({ where: condition, include: [{ model: Travel }] })
    .then((data) => {
      res.status(200).send({
        Message: "تمامی جزئیات-سفرها با موفقیت دریافت شدند",
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

  TravelDetail.findByPk(id)
    .then((data) => {
      if (data != null) {
        res.status(200).send({
          Message: "جزئیات-سفر با موفقیت دریافت شد",
          Status: 200,
          Data: data,
        });
      } else {
        res.status(404).send({
          Message: "جزئیات-سفر مورد نظر یافت نشد",
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
  const travelDetail = req.body;

  TravelDetail.update(travelDetail, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          Message: "جزئیات-سفر با موفقیت بروزرسانی شد",
          Status: 200,
        });
      } else {
        res.send({
          Message: `جزئیات-سفر مورد نظر پیدا نشد`,
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

  TravelDetail.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          Message: "جزئیات-سفر  با موفقیت حذف شد",
          Status: 200,
        });
      } else {
        res.send({
          message: `جزئیات-سفر مورد نظر پیدا نشد`,
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
  TravelDetail.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        Message: `${nums} جزئیات-سفر با موفقیت حذ شدند`,
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
