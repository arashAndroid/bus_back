const db = require("../../models");
const config = require("../../config/auth.config");
const DirectionStation = db.directionStation;

const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      Message: "عنوان مسیر-ایستگاه را وارد کنید",
    });
    return;
  }

  const directionStation = req.body;
  console.log("directionStation", directionStation);
  DirectionStation.create(directionStation)
    .then((data) => {
      res.status(200).send({
        Message: "مسیر-ایستگاه با موفقیت ایجاد شد",
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
  const directionStations = req.body;
  console.log("directionStation", directionStations);
  DirectionStation.bulkCreate(dataArray)
    .then(() => {
      return DirectionStation.findAll();
    })
    .then((directionStationsAll) => {
      console.log(directionStationsAll);
      res.status(200).send({
        Message: "مسیر-ایستگاه‌ها با موفقیت ایجاد شدند",
        Status: 201,
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

  DirectionStation.findAll({ where: condition })
    .then((data) => {
      res.status(200).send({
        Message: "تمامی مسیر-ایستگاهها با موفقیت دریافت شدند",
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

  DirectionStation.findByPk(id)
    .then((data) => {
      if (data != null) {
        res.status(200).send({
          Message: "مسیر-ایستگاه با موفقیت دریافت شد",
          Status: 200,
          Data: data,
        });
      } else {
        res.status(404).send({
          Message: "مسیر-ایستگاه مورد نظر یافت نشد",
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
  const directionStation = req.body;

  DirectionStation.update(directionStation, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          Message: "مسیر-ایستگاه با موفقیت بروزرسانی شد",
          Status: 200,
        });
      } else {
        res.send({
          Message: `مسیر-ایستگاه مورد نظر پیدا نشد`,
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

  DirectionStation.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          Message: "مسیر-ایستگاه  با موفقیت حذف شد",
          Status: 200,
        });
      } else {
        res.send({
          message: `مسیر-ایستگاه مورد نظر پیدا نشد`,
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
  DirectionStation.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        Message: `${nums} مسیر-ایستگاه با موفقیت حذ شدند`,
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
