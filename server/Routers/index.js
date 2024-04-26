const express = require('express');
const router = express.Router();
const authentication = require('../middleware/authentication');
const { authorization } = require('../middleware/authorization');
const MainController = require('../Controllers/mainController');

// User Router
router.use("/users", require("./userRouter"));

// Public Router
router.use("/public", require("./publicRouters"));

// Collection Router
router.get('/collections', authentication, authorization, MainController.getAllCollection);
router.post('/collections/:artId', authentication, authorization, MainController.addCollection);
router.put('/collections/:id', authentication, authorization, MainController.updateCollection);
router.delete('/collections/:id', authentication, authorization, MainController.deleteCollection);

module.exports = router;