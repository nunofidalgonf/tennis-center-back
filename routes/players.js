var router = require('express').Router();
const Player = require('../model/Players');
const { verifyToken } = require('../utils/verifyToken');

router.get('/', verifyToken ,(req, res) => {
  res.send('Players routing');
});



module.exports = router;
