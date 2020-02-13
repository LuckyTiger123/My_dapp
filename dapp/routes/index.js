var express = require('express');
var router = express.Router();
var indexControllers = require('../controllers/indexController');


router.get('/', indexControllers.index);                        //主页
router.post('/checkAccount', indexControllers.checkAccount)     //更改账户

router.get('/fishPool', indexControllers.fishPool);             //进入鱼塘  
router.post('/goFishing', indexControllers.goFishing);          //进行钓鱼

router.get('/myFish', indexControllers.myFish);                 //查看仓库
router.post('/releaseFish', indexControllers.releaseFish);      //放生自己的鱼

router.get('/market', indexControllers.market);                 //进入市场
router.post('/sellFish', indexControllers.sellFish);            //挂牌自己的鱼
router.post('/buyFish', indexControllers.buyFish);              //购买别人的鱼

module.exports = router;
