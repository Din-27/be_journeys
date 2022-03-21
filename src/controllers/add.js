const { journey, user } = require('../../models')
const cloudinary = require('../utils/cloudinary')

exports.addJourney = async (req, res) =>{
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'journeys',
        use_filename: true,
        unique_filename: false,
        });
        let data = req.body
        let add = await journey.create({
            ...data,
            image: result.public_id,
            idUser: req.user.id,
            include:{
                model: user,
                as: 'user',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                }
            },
            attributes: {
                exclude: ['updatedAt']
            }
        })
        
        add = JSON.parse(JSON.stringify(add))
        res.send({
            status: 'success',
            data : {
                ...add,
                image: process.env.FILE_PATH + add.image,
            }
        })
    } catch (e) {
        console.log(e)
        res.status(500).send({
            status: 'failed',
            message: 'thats wrong'
        })
    }
}

exports.getJourneys = async (req, res) => {
    try {
        let data = await journey.findAll({
            include:{
                model: user,
                as: 'user',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                }
            },
            attibutes: {
                exclude : ["createdAt", "updatedAt"]
            }
        })
        data = JSON.parse(JSON.stringify(data))
        data = data.map((item)=>{
            return{
                ...item,
                image: process.env.FILE_PATH + item.image
            }
        })
        res.send({
            status: "success",
            data
        })
    } catch (e) {
        console.log(e)
        res.status(500).send({
            status: 'failed',
            message: 'thats wrong'
        })
    }
}

exports.getJourney = async (req, res) => {
    try {   const {id} = req.params;
            let data = await journey.findOne({
            where: {
                id
            },
            include:{
                model: user,
                as: 'user',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                }
            },
          attributes: {
            exclude: ["updatedAt"]
          }
        })
        data = JSON.parse(JSON.stringify(data))
        data = {
            ...data,
            image: process.env.FILE_PATH + data.image

        }
        res.send({
            status: 'success',
            data
        })
    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}


exports.updateJourney = async (req, res) => {
    try {
        let { id } = req.params;
        await journey.update({title:req.body.title, body:req.body.body},{
        where: {id},
      })
      let journeys = await journey.findAll({
        where:{
          id
        },
        include:{
            model: user,
            as: 'user',
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "userOrder", "user"]
        }
      })
      res.send({
        status: "success",
        journeys
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };

  exports.deleteJourney = async (req, res) => {
    try{
  
        const {id} = req.params

        await journey.destroy({
            where:{
                id
            },
            include:{
                model: user,
                as: 'user',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                }
            },
          attributes: {
            exclude: ["createdAt", "updatedAt"]
          }
        })
        res.send({
            status: 'success',
            data: {
              id:id
            }
        })
    }catch (error) {
            console.log(error)
            res.send({
                status: 'failed',
                message: 'Server Error'
            })
    }
  }

  exports.getMyJourney = async (req, res) => {
    try {
        let data = await journey.findAll({
            where:{
                idUser: `${req.user.id}`
              },
            include:{
                model: user,
                as: 'user',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                }
            },
            attibutes: {
                exclude : ["createdAt", "updatedAt"]
            }
        })
        data = JSON.parse(JSON.stringify(data))
        data = data.map((item)=>{
            return{
                ...item,
                image: process.env.FILE_PATH + item.image
            }
        })
        res.send({
            status: "success",
            data
        })
    } catch (e) {
        console.log(e)
        res.status(500).send({
            status: 'failed',
            message: 'thats wrong'
        })
    }
  };