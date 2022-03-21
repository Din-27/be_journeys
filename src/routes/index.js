const express = require('express')
const router = express.Router()
const { auth } = require('../middlewars/auth')
const { uploadFile } = require('../middlewars/uploadFile')

const { 
    register, 
    Login, 
    checkAuth 
} = require('../controllers/auth')

const { 
    addJourney, 
    getJourneys, 
    getJourney, 
    updateJourney, 
    deleteJourney,
    getMyJourney
} = require('../controllers/add')

const { 
    addBookmark,
    getBookmarks,
    getBookmark,
    getBookmarkUser,
    deleteBookmark,
    deleteMybookmark
 } = require('../controllers/bookmark')
const { updateUser } = require('../controllers/user')

const { addLike, getLikes } = require('../controllers/fitur')



router.patch('/user/:id', auth, uploadFile('image'), updateUser)
router.post('/register', register)
router.post('/login', Login)
router.get("/check-auth", auth, checkAuth);

router.delete('/journey/:id', auth,  deleteJourney)
router.post('/journey', auth, uploadFile('image'),  addJourney)
router.patch('/journey/:id', auth,  updateJourney)
router.get('/journeys',  getJourneys)
router.get('/journey/:id', getJourney)
router.get('/my-journey',  auth, getMyJourney)

router.post('/bookmark', auth,  addBookmark)
router.get('/bookmarks',  getBookmarks)
router.get('/my-bookmarks', auth,  getBookmarkUser)
router.get('/bookmark/:id', auth,  getBookmark)
// router.delete('/my-bookmark/:id', auth,  deleteMybookmark)
router.delete('/bookmark/:id', auth,  deleteBookmark)

router.post('/like', auth, addLike)
// router.get('/likes', getLikes)

module.exports = router