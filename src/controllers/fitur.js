const joi = require("joi");
const { Op } = require("sequelize");
const { user, fitur } = require("../../models");

exports.addLike = async (req, res) => {
  const schema = joi.object({
    idJourney: joi.number(),
    value: joi.boolean(),
  });

  const { error } = schema.validate(req.body);
  if (error)
    return res.status(400).send({
      error,
    });
  try {
    const body = req.body;

    let data;
    if (body.value) {
      data = await fitur.create({
        idUser: req.user.id,
        idJourney: body.idJourney,
      });
    } else {
      data = await fitur.destroy({
        where: { idJourney: body.idJourney, idUser: req.user.id },
      });
    }

    res.status(200).send({
      status: "success",
      message: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

