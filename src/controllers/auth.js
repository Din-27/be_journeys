const { user } = require('../../models')
const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    const schema = joi.object({
        email: joi.string().min(5).required(),
        password: joi.string().min(8).required(),
        name: joi.string().min(3).required(),
        phone: joi.string().min(12).required()

    });
    const {error} = schema.validate(req.body)
    if(error)
    return res.status(400).send({
        error: {
            message: error.details[0].message,
        }
    })
    try {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(req.body.password, salt)
      const newUser = await user.create({
        name : req.body.name,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
      })
      const token = jwt.sign({id:newUser.id}, process.env.TOKEN_KEY)
      res.status(200).send({
          status: 'success',
          data:{
            name: newUser.name,
            token
          }
      })
      
    } catch (e) {
      console.log(e);
      res.send({
        status: "failed",
        message: "thats wrong",
      });
    }
  };

  exports.Login = async (req, res) => {
        const schema = joi.object({
        email: joi.string().email().min(5).required(),
        password: joi.string().min(8).required()
    })
    const {error} = schema.validate(req.body)
        if(error)
        return res.status(400).send({
            error: {
                message: error.details[0].message
            }
        })
    try{
        const userLogin = await user.findOne({
            where:{
                email: req.body.email,
            },
            attributes:{
                exclude: ['status', 'createdAt', 'updatedAt']
            }
        })
        const isValid = await bcrypt.compare(req.body.password, userLogin.password)
        if(!isValid){
            return res.status(400).send({
                status : 'failed',
                message: 'email and password not match'
            })
        }
        const token = jwt.sign({id:userLogin.id}, process.env.TOKEN_KEY)
        res.status(200).send({
            status: 'success',
            data:{
                user:{
                name: userLogin.name,
                email: userLogin.email,
                phone: userLogin.phone,
                image: userLogin.image,
                token
                }
            }
        })
    }catch (e) {
        console.log(e);
        res.send({
          status: "failed",
          message: "errorr",
        });
    }
    
}

exports.checkAuth = async (req, res) => {
    try {
      const id = req.user.id;
  
      const dataUser = await user.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "password"],
        },
      });
  
      if (!dataUser) {
        return res.status(404).send({
          status: "failed",
        });
      }
  
      res.send({
        status: "success...",
        data: {
          user: {
            id: dataUser.id,
            name: dataUser.name,
            email: dataUser.email,
            phone: dataUser.phone,
            image: dataUser.image,
          },
        },
      });
    } catch (error) {
      console.log(error);
      res.status({
        status: "failed",
        message: "Server Error",
      });
    }
  };

  