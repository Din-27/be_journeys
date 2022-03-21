const { bookmark, journey, user } = require('../../models')
// const bcrypt = require('bcrypt')

exports.addBookmark = async (req, res) => {
    try {
      let data = req.body;
      data = {
        ...data,
        status: 'success!',
        idUser: req.user.id
      }
      await bookmark.create(data)
      res.send({
        data:{
          ...data,
          status: "Success",
        message: data.status
        }
      })
    } catch (e) {
      console.log(e);
      res.status(500).send({
        status: "failed",
        message: "thats wrong",
      });
    }
  };

  exports.getBookmarks = async (req, res) => {
    try {
        let addBookmark = await bookmark.findAll({
          attributes:{
            exclude:["updatedAt", "createdAt"]
          },
        include: [
          {
            model: user,
            as: "user",
            attributes: {
              exclude: ["createdAt", "updatedAt", 'password'],
            }
          },
          {
            model: journey,
            as: "journey",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            }
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
      });
      res.send({
        status: "success...",
        data:{
            addBookmark,
            
        }
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };

  exports.getBookmark = async (req, res) => {
    try {
        let { id } = req.params
        let getBookmark = await bookmark.findOne({
            where:{
                id
            },
          attributes:{
            exclude:["updatedAt", "createdAt"]
          },
        include: [
          {
            model: user,
            as: "user",
            attributes: {
              exclude: ["createdAt", "updatedAt", 'password'],
            }
          },
          {
            model: journey,
            as: "journey",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            }
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
      });
      res.send({
        status: "success...",
        data:{
            getBookmark,
            
        }
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };

  exports.getBookmarkUser = async (req, res) => {
    try {
  
        let data = await bookmark.findAll({
          where:{
            idUser: `${req.user.id}`
          },
        include: [
          {
            model: user,
            as: "user",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            }
          },
          {
            model: journey,
            as: "journey",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            }
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
      });
      
      data = JSON.parse(JSON.stringify(data))
      data = data.map((item)=>{
        return {
          ...item,
          image: process.env.PATH_FILE + item.image
        }
      })
  
      res.send({
        status: "success...",
        data
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };
  exports.deleteMybookmark = async (req, res) => {
    try {
  
        let data = await bookmark.destroy({
          where:{
            idUser: `${req.user.id}`
          },
        include: [
          {
            model: user,
            as: "user",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            }
          },
          {
            model: journey,
            as: "journey",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            }
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
      });
      
      data = JSON.parse(JSON.stringify(data))
      data = data.map((item)=>{
        return {
          ...item,
          image: process.env.PATH_FILE + item.image
        }
      })
  
      res.send({
        status: "success...",
        data
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };

  exports.deleteBookmark = async (req, res) => {
    try {
        let { id } = req.params
        await bookmark.destroy({
            where:{
                id
            },
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
      });
      res.send({
        status: "success...",
        data:{
            id
        }
      });
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Server Error",
      });
    }
  };
