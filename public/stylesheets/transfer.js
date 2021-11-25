let web3;
let accounts;
const ERC20_ABI = '[{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]';
document.addEventListener("DOMContentLoaded", function (event) {
    $("#connectBtn").click(function () {
        transfer();
    });
});
window.addEventListener("load", async () => {
    if (window.ethereum) {
        web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"));
        try {
            // ask user permission to access his accounts
            accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            console.log(web3);
        } catch (error) {
            console.log(error);
        }
    } else {
        console.log("must install MetaMask");
    }
});
async function transfer() {
    const abi = JSON.parse(ERC20_ABI);
    let contract = new web3.eth.Contract(abi, "0x78d9ac92584cCE354aC53389Df47927dF7429070");
    contract.setProvider(web3.currentProvider);
    await contract.methods.balanceOf("0x80534A1d48A99539Ca4A772EeA36F49DDeB49674").call(function (err, res) {
        if (err) {
            console.log("An error occured", err)
            return
        }
        console.log("The balance is: ", res / (10 ** 18))
    })
    // contract.methods.transfer("0x40B8d4A82E92970b2A26FBE9e98F843Ec6586F79", BigInt(50 * (10 ** 18)))
    //     .send({ from: "0x80534A1d48A99539Ca4A772EeA36F49DDeB49674", gas: 5000000, gasPrice: 18e9, chainId: BigInt(0x61) }, function (err, res) {
    //         if (err) {
    //             console.log("An error occured", err)
    //             return
    //         }
    //         console.log("Send to team contract: " + res)
    //     });
    
    let encodedABI = contract.methods.transfer("0x40B8d4A82E92970b2A26FBE9e98F843Ec6586F79", BigInt(50 * (10 ** 18))).encodeABI();
    let params = {
        gasPrice:web3.utils.toHex(2 * 1e9),
        gasLimit:web3.utils.toHex(210000),
        data: encodedABI,
        to: "0x40B8d4A82E92970b2A26FBE9e98F843Ec6586F79",
        chainId: BigInt(0x61),
        from: accounts[0]
    };

    web3.eth.sendTransaction(params).then(res => {
        console.log("res",res)
    }).catch(err => {
        console.log("err",err)
    });
};

function getBalance(addr) {
    console.log('getting balance for ' + addr)
    token.methods.balanceOf(addr).send(addr, function (err, bal) {
        if (err) { console.error(err) }
        console.log('token balance for account ' + addr + ' is ' + bal.toString(10))
    })
};