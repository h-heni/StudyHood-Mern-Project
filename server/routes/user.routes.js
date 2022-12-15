const UserController = require('../controllers/log.controllers');
const {getallUser,getUser,getUserFriends,addRemoveFriend} = require ("../controllers/user.controllers");
const { getFeedPosts, getUserPosts, likePost } = require ("../controllers/posts.controller");

  const { authenticate } = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/register', UserController.register)
    app.post('/api/login', UserController.login)
    app.post('/api/logout', UserController.logout)



    app.get('/api/all',getallUser)
    app.get('/api/:id',getUser)
    app.get('/api/:id/friend',getUserFriends)
    app.get('/api/:id/:friend',addRemoveFriend)


    app.get("/api/post",getFeedPosts)
    app.get('/api/post/:user',getUserPosts)
    app.put('/api/:id/like',likePost)


}