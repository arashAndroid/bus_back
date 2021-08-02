const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const { TimeStampToDate } = require("../utils/TimeStampToDate");


const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "ثبت نام با موفقیت انجام شد" });
                    });
                });
            } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    res.send({ message: "ثبت نام با موفقیت انجام شد" });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    let date = new Date();
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "کاربر یافت نشد" });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "رمزعبور اشتباه است"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    msg: "Login Successful",
                    status: "200",
                    data: {
                        id: user.id,
                        userName: user.username,
                        email: user.email,
                        first_name: user.username,
                        fullname: user.username,
                        last_name: user.username,
                        national_code: user.username,
                        credit: user.cash,
                        roles: authorities,
                        accessToken: token,
                        gender: 1,
                        accessTokenExpireTime: TimeStampToDate(date.setDate(date.getDate() + 30))
                    }

                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};