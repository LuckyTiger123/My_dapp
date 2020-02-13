var Web3 = require('web3');

class ctr {
    constructor() {
    }

    /**
     * 与区块链网络建立连接
     */
    async getConnectWeb3() {
        var web3 = new Web3();
        web3.setProvider(new Web3.providers.HttpProvider("http://localhost:7545"));
        var address = "0xbD389176dd82A844c71B4835a2Cb16c3a2fE2DD5";
        var abi = [
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "fish_id",
                        "type": "uint256"
                    }
                ],
                "name": "buyFish",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getCommodity",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "count",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "fish_color",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "fish_size",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "fish_price",
                        "type": "uint256[]"
                    },
                    {
                        "internalType": "uint256[]",
                        "name": "cmID",
                        "type": "uint256[]"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getFisherFish",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "fish_color",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "fish_size",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "fish_state",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getFisherFishState",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "state",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "random_num",
                        "type": "uint256"
                    }
                ],
                "name": "goFishing",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "fish_color",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "fish_size",
                        "type": "uint256"
                    }
                ],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [],
                "name": "releaseFish",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "price",
                        "type": "uint256"
                    }
                ],
                "name": "sellFish",
                "outputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ];
        var contract = new web3.eth.Contract(abi, address);
        const usrAdr = await web3.eth.getAccounts();
        return {
            contract: contract,
            usrAdr: usrAdr,
            web3: web3
        }        
    }

    /**
     * 调用合约钓鱼函数
     * 
     * @param {struct} contract 
     * @param {string} usrAdr 
     */
    async goFishing(contract, usrAdr) {
        var random_num = Math.floor(Math.random() * 100);
        await contract.methods.goFishing(random_num).send({ from: usrAdr, gas: 200000000, value: Web3.utils.toWei('10', 'ether') });
        return 1;
    }

    /**
     * 获得某个账户的鱼的信息
     * 
     * @param {struct} contract 
     * @param {string} usrAdr 
     */
    async checkMyFish(contract, usrAdr) {
        var ret = await contract.methods.getFisherFish().call({ from: usrAdr });
        return ret;
    }

    /**
     * 以一个特定的价格卖出某个账户的鱼
     * 
     * @param {struct} contract 
     * @param {string} usrAdr 
     * @param {string} price 
     */
    async sellMyFish(contract, usrAdr, price) {
        await contract.methods.sellFish(parseInt(price)).send({ from: usrAdr, gas: 200000000 });
        return 1;
    }

    /**
     * 以某个价格去购买商场中编号为fishID的鱼
     * 
     * @param {struct} contract 
     * @param {string} usrAdr 
     * @param {string} price 
     * @param {string} fishID 
     */
    async buyFish(contract, usrAdr, price, fishID) {
        await contract.methods.buyFish(parseInt(fishID)).send({ from: usrAdr, gas: 200000000, value: Web3.utils.toWei(price, 'ether') });
        return 1;
    }

    /**
     * 放生某个账户的鱼
     * 
     * @param {struct} contract 
     * @param {string} usrAdr 
     */
    async releaseFish(contract, usrAdr) {
        await contract.methods.releaseFish().send({ from: usrAdr, gas: 200000000 });
        return 1;
    }

    /**
     * 获得商场的商品信息
     * 
     * @param {struct} contract 
     * @param {string} usrAdr 
     */
    async getMarketInfo(contract, usrAdr) {
        var ret = await contract.methods.getCommodity().call({ from: usrAdr });
        return ret;
    }

    /**
     * 获得某个用户的账户余额
     * 
     * @param {struct} web3 
     * @param {string} usrAdr 
     */
    async getBalance(web3, usrAdr) {
        var ret = await web3.eth.getBalance(usrAdr);
        return ret;
    }

    /**
     * 获得某个账户的鱼的状态，这里只返回鱼的状态，不返回其他属性
     * 
     * @param {struct} contract 
     * @param {string} usrAdr 
     */
    async getFisherFishState(contract, usrAdr) {
        var ret = await contract.methods.getFisherFishState().call({ from: usrAdr });
        return ret;
    }
}

module.exports = ctr;