
const Lightwallet = require('eth-lightwallet');
const Web3 = require('web3');
const HookedWeb3Provider = require('hooked-web3-provider');
const util = require('util');
const wallet = require('../../Files/wallet.json');

let web3 = new Web3();

let txutils = Lightwallet.txutils;
let signing = Lightwallet.signing;
let txOptions = Lightwallet.txOptions; 
let keystore = Lightwallet.keystore; 

let wallets = JSON.stringify(wallet);

let exemplecoinContract = '0x1D536646Afb7477C8e5593F31b6940c5cbf38862';
let erc20ExempleContract = '0xcfcAf76070530883F6cc5385fE2DA02c573Cf2D7';

let erc20ExempleABI = [{"constant":true,"inputs":[],"name":"awardsReservations","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalTokenToSale","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"recipient","type":"address"},{"name":"amount","type":"uint256"}],"name":"manuallyAssignTokens","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"rate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_rate","type":"uint256"}],"name":"setRate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"tokensSold","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pauseEmergence","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"bounty","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"walletETH","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"icoEndTimestampStage","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokensTeamBlockedTimestamp","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"tokenSale","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"setPauseEmergence","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalRaised","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"setUnPauseEmergence","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"icoStartTimestampStage","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"walletTeam","type":"address"}],"name":"sendTokenTeamAdvisor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"contractAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"burner","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]
let exemplecoinABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"withdrawerc20","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"sendTokenExeContract","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_investPercent","type":"string"},{"name":"_investValue","type":"uint256"},{"name":"_daysGracePeriod","type":"string"},{"name":"_hashPDFContract","type":"string"}],"name":"createExeCli","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"newContracts","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getNumberContracts","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]
let exempleCliABI = [{"constant":true,"inputs":[],"name":"investPercent","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"investValue","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"erc20Address","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_hash","type":"string"}],"name":"_setHashPdf","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"},{"name":"_erc20Price","type":"uint256"},{"name":"_exchangeCli","type":"address"}],"name":"_pay","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"hashPDFContract","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"daysGracePeriod","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"creditPayment","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"exemplecoinAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"contractActive","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_erc20Price","type":"uint256"},{"name":"_exchangeCli","type":"address"}],"name":"_endContract","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_exemplecoinAddress","type":"address"},{"name":"_investPercent","type":"string"},{"name":"_investValue","type":"uint256"},{"name":"_daysGracePeriod","type":"string"},{"name":"_hashPDFContract","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"}]

let Instanceexemplecoin = web3.eth.contract(exemplecoinABI).at(exemplecoinContract);
let Instanceerc20Exemple = web3.eth.contract(erc20ExempleABI).at(erc20ExempleContract);


function ContractService($q, ContractRepository) {

    async function validate(contract) {
        return $q((resolve, reject) => {
            let ks = keystore.deserialize(wallets);
            let password = contract.password;
            ks.keyFromPassword(password, function(err, pwDerivedKey) {	
                if(!ks.isDerivedKeyCorrect(pwDerivedKey)) {
                    return reject(new Error("Senha inválida"));
                }
                resolve({ks, pwDerivedKey});
            });
        });
    }

    function setWeb3Provider(ks) {
        let web3Provider = new HookedWeb3Provider({
            host: "https://rinkeby.infura.io/6618ab2040d34e518e841cafc53c4a44",
            transaction_signer: ks
        });		  
        web3.setProvider(web3Provider);
    }

    async function web3Call(to, contractData) {
        return $q((resolve, reject) => {
            web3.eth.call({
                to: to, 
                data: contractData 
            }, function(err, result) {
                if(err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    async function sendRawTransaction(signedSetValueTx) {
        return $q((resolve, reject) => {
            web3.eth.sendRawTransaction('0x' + signedSetValueTx, function(err, hash) {
                if(!util.isNullOrUndefined(err) || util.isNullOrUndefined(hash)){
                    return reject(err || new Error('return hash is null'));
                }
                resolve(hash);           
            });
        });
    }

    async function create(contract) {
        let {ks, pwDerivedKey} = await validate(contract);

        setWeb3Provider(ks);

        console.log(contract);

        let contractData = Instanceexemplecoin.balanceOf.getData(exemplecoinContract);
        let result = await web3Call(exemplecoinContract, contractData);

        let tokens = web3.toBigNumber(result).toString();
        let balance = web3.fromWei(tokens, 'ether');

        console.log(balance);

        if(contract.amount > balance) {
            throw new Error("Erro: O contrato nao possui saldo suficiente em exemplecoins, saldo Atual: " + balance);
        }

        let nonceNumber = parseInt(web3.eth.getTransactionCount(ks.getAddresses()[0], "pending"));
        let gasprices = 21000000000;
        let gasLimit = 2000000;	
        let txOptions = {
            nonce: web3.toHex(nonceNumber),
            gasLimit: web3.toHex(gasLimit),
            gasPrice: web3.toHex(gasprices),
            to: exemplecoinContract
        }
       
        let porcentagem = contract.percentage + '%';
        let valorInvestimento = parseFloat(contract.amount) * 1.0e18;
        let carencia = contract.lack;
        let hashFile = contract.pdfHash;
        if(util.isNullOrUndefined(hashFile)){
            hashFile = "    ";
        }
        
        let arg = Array.prototype.slice.call([porcentagem,valorInvestimento,carencia,hashFile]);   
        let rawTx = txutils.functionTx(exemplecoinABI, 'createExeCli', arg, txOptions)
        let signedSetValueTx = signing.signTx(ks, pwDerivedKey, rawTx, ks.getAddresses()[0]) 					

        let hash = await sendRawTransaction(signedSetValueTx);
        let numContract = await getProxNumContract(contract.password);
        
        let createdContract = await ContractRepository.create({
            customer: contract.customer,
            transaction: hash,
            number: numContract,
            address: null,
            status: 'pending'
        });

        getContract(createdContract,"concluded");
        
       return createdContract;
    }

    async function pay(contract) {
        console.log('ok');
        
        if(contract.address == contract.customerWallet) {
            throw new Error("Erro: Insira uma wallet que nao seja o proprio contrato");
        }

        console.log('ok');
        let {ks, pwDerivedKey} = await validate(contract);
        
        setWeb3Provider(ks);

        let contractData = Instanceexemplecoin.balanceOf.getData(web3.toChecksumAddress(exemplecoinContract).toString());
        let result = await web3Call(exemplecoinContract, contractData);

        let tokens = web3.toBigNumber(result).toString();
        let balance = web3.fromWei(tokens, 'ether');

        if(contract.paymentAmount >= balance) {
            throw new Error("Erro: O contrato nao possui saldo suficiente em exemplecoins, saldo Atual: " + balance);
        }

        let contracterc20ExempleData = Instanceerc20Exemple.balanceOf.getData(exemplecoinContract);
        let res = await web3Call(erc20ExempleContract, contracterc20ExempleData);

        let tokenserc20Exemple = web3.toBigNumber(res).toString();
        let balanceerc20Exemple = web3.fromWei(tokenserc20Exemple, 'ether');
        let vlrTotalerc20Exemple = parseFloat(contract.paymentAmount) / parseFloat(contract.erc20ExempleQuotation);

        if(vlrTotalerc20Exemple > balanceerc20Exemple) {
            throw new Error("Erro: O contrato nao possui saldo suficiente em erc20Exemplecoin, saldo Atual: " + balanceerc20Exemple);
        }

        let exempleCliAddress = web3.toChecksumAddress(contract.address).toString();
        let nonceNumber = parseInt(web3.eth.getTransactionCount(ks.getAddresses()[0], "pending"));
        let gasprices = 21000000000;
        let gasLimit = 200000;	
        let txOptions = {
            nonce: web3.toHex(nonceNumber),
            gasLimit: web3.toHex(gasLimit),
            gasPrice: web3.toHex(gasprices),
            to: exempleCliAddress
        }

        let vlrPagamento = parseFloat(contract.paymentAmount) * 1.0e18;
        let coterc20Exemple = parseFloat(contract.erc20ExempleQuotation) * 1.0e18;
        let walletNegociecoins = web3.toChecksumAddress(contract.customerWallet).toString(); 
        
        let arg = Array.prototype.slice.call([vlrPagamento,coterc20Exemple,walletNegociecoins]);   
        let rawTx = txutils.functionTx(exempleCliABI, '_pay', arg, txOptions);
        let signedSetValueTx = signing.signTx(ks, pwDerivedKey, rawTx, ks.getAddresses()[0]);

        let hash = await sendRawTransaction(signedSetValueTx);

        console.log(hash);
        
        return hash;
    }

    async function credit(contract) {
        let {ks, pwDerivedKey} = await validate(contract);
        
        setWeb3Provider(ks);

        let contractData = Instanceexemplecoin.balanceOf.getData(exemplecoinContract);
        let result = await web3Call(exemplecoinContract, contractData);

        let tokens = web3.toBigNumber(result).toString();
        let balance = web3.fromWei(tokens, 'ether');

        if(contract.paymentAmount > balance) {
            throw new Error("Erro: O contrato nao possui saldo suficiente em exemplecoins, saldo Atual: " + balance);
        }

        let exempleCliAddress = web3.toChecksumAddress(contract.address).toString();
        let nonceNumber = parseInt(web3.eth.getTransactionCount(ks.getAddresses()[0], "pending"));
        let gasprices = 21000000000;
        let gasLimit = 200000;	
        let txOptions = {
            nonce: web3.toHex(nonceNumber),
            gasLimit: web3.toHex(gasLimit),
            gasPrice: web3.toHex(gasprices),
            to: exempleCliAddress
        }

        let vlrPagamento = parseFloat(contract.paymentAmount) * 1.0e18;
        
        let arg = Array.prototype.slice.call([vlrPagamento]);   
        let rawTx = txutils.functionTx(exempleCliABI, 'creditPayment', arg, txOptions);
        let signedSetValueTx = signing.signTx(ks, pwDerivedKey, rawTx, ks.getAddresses()[0]);

        let hash = await sendRawTransaction(signedSetValueTx);

        return hash;
    }

    async function close(bdDate,contract) {
        if(contract.address == contract.customerWallet) {
            throw new Error("Erro: Insira uma wallet que nao seja o proprio contrato");
        }


        let {ks, pwDerivedKey} = await validate(contract);
        
        setWeb3Provider(ks);

        let contractData = Instanceexemplecoin.balanceOf.getData(web3.toChecksumAddress(contract.address).toString());
        let result = await web3Call(exemplecoinContract, contractData);

        let tokens = web3.toBigNumber(result).toString();
        let balance = web3.fromWei(tokens, 'ether');
        
        let contracterc20ExempleData = Instanceerc20Exemple.balanceOf.getData(exemplecoinContract);
        let res = await web3Call(erc20ExempleContract, contracterc20ExempleData);

        let tokenserc20Exemple = web3.toBigNumber(res).toString();
        let balanceerc20Exemple = web3.fromWei(tokenserc20Exemple, 'ether');
        let vlrTotalerc20Exemple = parseFloat(balance) / parseFloat(contract.erc20ExempleQuotation);

        if(vlrTotalerc20Exemple > balanceerc20Exemple) {
            throw new Error("Erro: O contrato nao possui saldo suficiente em erc20Exemplecoin, saldo Atual: " + balanceerc20Exemple);
        }

        let exempleCliAddress = web3.toChecksumAddress(contract.address).toString();
        let nonceNumber = parseInt(web3.eth.getTransactionCount(ks.getAddresses()[0], "pending"));
        let gasprices = 21000000000;
        let gasLimit = 200000;	
        let txOptions = {
            nonce: web3.toHex(nonceNumber),
            gasLimit: web3.toHex(gasLimit),
            gasPrice: web3.toHex(gasprices),
            to: exempleCliAddress
        }
    
        let coterc20Exemple = parseFloat(contract.erc20ExempleQuotation) * 1.0e18;
        let walletNegociecoins = web3.toChecksumAddress(contract.customerWallet).toString(); 
        
        let arg = Array.prototype.slice.call([coterc20Exemple,walletNegociecoins]);   
        let rawTx = txutils.functionTx(exempleCliABI, '_endContract', arg, txOptions)
        let signedSetValueTx = signing.signTx(ks, pwDerivedKey, rawTx, ks.getAddresses()[0]);
        let hash = await sendRawTransaction(signedSetValueTx);

        console.log(hash);

        getStatus(bdDate);
        
        return hash;
    }

    async function getContract(contract, status){
        
        web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/6618ab2040d34e518e841cafc53c4a44"));   
        let contractData = Instanceexemplecoin.newContracts.getData(contract.number.toString());
        let contractAddress = await web3Call(exemplecoinContract, contractData);

        while(contractAddress == "0x"){
            await sleep(30000);
            contractAddress = await web3Call(exemplecoinContract, contractData);
            console.log(contractAddress)
        }

        contractAddress = web3.toChecksumAddress("0x" + contractAddress.substring(26));

        await ContractRepository.update(contract.id,{
            customer: contract.customer,
            transaction: contract.hash,
            number: contract.numContract,
            address: contractAddress,
            status: status 
        });
        

        return contractAddress;
    }

    async function getProxNumContract(passWallet){
        let password = passWallet;
        let {ks} = await validate({password});
        
        setWeb3Provider(ks);

        let contractData = Instanceexemplecoin.getNumberContracts.getData();
        let result = await web3Call(exemplecoinContract, contractData);

        return web3.toBigNumber(result).toString();
    }

    async function getStatus(contract){

        if(contract.status != "pending"){
            await ContractRepository.update(contract.id,{
                status: 'pending' 
            });
        }
        
        web3 = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/6618ab2040d34e518e841cafc53c4a44"));   
        let address = web3.toChecksumAddress(contract.address).toString(); 
        
        let interfaceexempleCli = web3.eth.contract(exempleCliABI).at(address);
        let contractData = interfaceexempleCli.contractActive.getData();
        let contractStatus = await web3Call(address, contractData);
        contractStatus = web3.toBigNumber(contractStatus);
        while(contractStatus == "1"){
            await sleep(30000);
            contractStatus = await web3Call(address, contractData);
            contractStatus = web3.toBigNumber(contractStatus);
        }

        await ContractRepository.update(contract.id,{
            status: 'closed' 
        });

        return contractStatus;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

  return {
    create,
    pay,
    credit,
    close,
    getContract,
    getStatus
  }
}

module.exports = [
  '$q', 'ContractRepository', ContractService
]; 