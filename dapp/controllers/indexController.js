var Web3 = require('web3');
var ctr = require('../public/javascripts/ctr');

/**
 * 进入主页
 */
exports.index = async (req, res) => {
    var ret = await ctr.prototype.getConnectWeb3();
    if (req.session.login == null) {
        req.session.login = 1;
    }
    var myBalance = await ctr.prototype.getBalance(ret.web3, ret.usrAdr[req.session.login]);
    return_balance = (myBalance / 1000000000000000000).toFixed(2);
    res.render("index", {
        account: req.session.login,
        myBalance: return_balance
    });
};

/**
 * 更改账户
 */
exports.checkAccount = async (req, res) => {
    req.session.login = parseInt(req.body.account);
    res.send({ status: 1 }).end();
}

/**
 * 进入鱼塘
 */
exports.fishPool = async (req, res) => {
    var ret = await ctr.prototype.getConnectWeb3();
    if (req.session.login == null) {
        req.session.login = 1;
    }
    var myBalance = await ctr.prototype.getBalance(ret.web3, ret.usrAdr[req.session.login]);
    return_balance = (myBalance / 1000000000000000000).toFixed(2);
    res.render("fishPool", {
        account: req.session.login,
        myBalance: return_balance
    });
}

/**
 * 进行钓鱼
 */
exports.goFishing = async (req, res) => {
    var ret = await ctr.prototype.getConnectWeb3();
    var fish_state = await ctr.prototype.getFisherFishState(ret.contract, ret.usrAdr[req.session.login]);
    console.log(fish_state);
    if (parseInt(fish_state) != 0) {
        res.send({ status: 0 }).end();
    } else {
        await ctr.prototype.goFishing(ret.contract, ret.usrAdr[req.session.login]);
        var myFish = await ctr.prototype.checkMyFish(ret.contract, ret.usrAdr[req.session.login]);
        res.send({ status: 1, myfish: myFish }).end();
    }
}

/**
 * 进入仓库
 */
exports.myFish = async (req, res) => {
    var ret = await ctr.prototype.getConnectWeb3();
    if (req.session.login == null) {
        req.session.login = 1;
    }
    var myBalance = await ctr.prototype.getBalance(ret.web3, ret.usrAdr[req.session.login]);
    return_balance = (myBalance / 1000000000000000000).toFixed(2);
    var fishInfo = await ctr.prototype.checkMyFish(ret.contract, ret.usrAdr[req.session.login]);
    res.render('myFish', {
        account: req.session.login,
        myBalance: return_balance,
        fishInfo: fishInfo
    });
}

/**
 * 放生自己的鱼
 */
exports.releaseFish = async (req, res) => {
    var ret = await ctr.prototype.getConnectWeb3();
    var result = await ctr.prototype.releaseFish(ret.contract, ret.usrAdr[req.session.login]);
    res.send({ status: result }).end();
}

/**
 * 进入市场
 */
exports.market = async (req, res) => {
    var ret = await ctr.prototype.getConnectWeb3();
    if (req.session.login == null) {
        req.session.login = 1;
    }
    var myBalance = await ctr.prototype.getBalance(ret.web3, ret.usrAdr[req.session.login]);
    return_balance = (myBalance / 1000000000000000000).toFixed(2);
    var fishInfo = await ctr.prototype.checkMyFish(ret.contract, ret.usrAdr[req.session.login]);
    var marketInfo = await ctr.prototype.getMarketInfo(ret.contract, ret.usrAdr[req.session.login]);
    res.render("market", {
        account: req.session.login,
        myBalance: return_balance,
        fishInfo: fishInfo,
        marketInfo: marketInfo
    });
}

/**
 * 挂牌自己的鱼
 */
exports.sellFish = async (req, res) => {
    var sellPrice = req.body.sellPrice;
    var ret = await ctr.prototype.getConnectWeb3();
    var result = await ctr.prototype.sellMyFish(ret.contract, ret.usrAdr[req.session.login], sellPrice);
    res.send({ status: result }).end();
}

/**
 * 购买鱼
 */
exports.buyFish = async (req, res) => {
    var buyPrice = req.body.buyPrice;
    var buyFishID = req.body.buyFishID;
    var ret = await ctr.prototype.getConnectWeb3();
    var result = await ctr.prototype.buyFish(ret.contract, ret.usrAdr[req.session.login], buyPrice, buyFishID);
    res.send({ status: result }).end();
}