const { user } = require('../../models')
const cloudinary = require('../utils/cloudinary')

exports.updateUser = async (req, res) => {
    try {
        let { id } = req.params;
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'journeys',
          use_filename: true,
          unique_filename: false,
        })
        await user.update(
            {
                name:req.body.name, 
                email:req.body.email, 
                phone:req.body.phone, 
                image:req.file.filename
            },{
        where: {
            id
        },
      })
      let users = await user.findAll({
        where:{
          id: req.user.id
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"]
        }
      })
      res.send({
        status: "success",
        users
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };