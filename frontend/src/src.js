var web3 = new Web3(Web3.givenProvider || "http://192.168.24.97:8545");

var billFactory = new web3.eth.Contract(billFactoryABI, '0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84');
var insuranceFactory = new web3.eth.Contract(insuranceFactoryABI, '0x62d69f6867A0A084C6d313943dC22023Bc263691');

var insurerPk = Cookies.get("insurer-priv-key");
var doctorPk = Cookies.get("client-priv-key");
var clientPk = Cookies.get("doctor-priv-key")

var insurerAddress = web3.eth.accounts.privateKeyToAccount(Cookies.get("insurer-priv-key")).address;
var doctorAddress = web3.eth.accounts.privateKeyToAccount(Cookies.get("doctor-priv-key")).address;
var clientAddress = web3.eth.accounts.privateKeyToAccount(Cookies.get("client-priv-key")).address;

function testCreateInsurance() {
    var tx = {
        from: insurerAddress,
        to: insuranceFactory,
        data: insuranceFactory.methods.create().encodeABI(), //TODO: PUT THE VALUE HERE
        value: '10000000000000', // TODO: PUT THE VALUE HERE
        gasPrice: '0',
        gas: '4000000'
    }
    web3.eth.accounts.signTransaction(tx, insurerPk).then((o) => web3.eth.sendSignedTransaction(o.rawTransaction));
}

// TEST

const testPrivateKey = Cookies.get("insurer-priv-key");
var tx = {
    from: '0x465EF6e3e3316968792a9a448bdDa70455aAF36b',
    to: '0x00c31293153d95f14FaC87a7EF2D45Bd18DeB4e2',
    value: '10000000000000',
    gasPrice: '0',
    gas: '4000000'
}

var ICD_10 = [{"Code":"A06","Description":"Amebiasis"},{"Code":"A20","Description":"Plague"},{"Code":"A21","Description":"Tularemia"},{"Code":"A22","Description":"Anthrax"},{"Code":"A23","Description":"Brucellosis"},{"Code":"A24","Description":"Glanders and melioidosis"},{"Code":"A25","Description":"Rat-bite fevers"},{"Code":"A26","Description":"Erysipeloid"},{"Code":"A27","Description":"Leptospirosis"},{"Code":"A32","Description":"Listeriosis"},{"Code":"A33","Description":"Tetanus neonatorum"},{"Code":"A34","Description":"Obstetrical tetanus"},{"Code":"A36","Description":"Diphtheria"}];

//console.log(ICD_10[0].Code);

function generateCase(id, description){
    var singleCase = '';
    singleCase += '<div class="form-check"><input class="form-check-input" type="checkbox" value="" id="';
    singleCase += id;
    singleCase += '"><label class="form-check-label" for="';
    singleCase += id;
    singleCase += '">';
    singleCase += id;
    singleCase += ": ";
    singleCase += description;
    singleCase += '</label></div>';

    return singleCase;
}

function populateCases(){

    for (let index = 1; index < ICD_10.length; index++) {
        var rawCase = generateCase(ICD_10[index].Code, ICD_10[index].Description);
        $("#covered-cases").append(rawCase);
    }

}

$(document).ready(function () {
    populateCases();

    console.log(Cookies.get("insurer-priv-key"));
    console.log(Cookies.get("client-priv-key"));
    console.log(Cookies.get("doctor-priv-key"));

    // web3.eth.accounts.signTransaction(tx, testPrivateKey).then((o) => web3.eth.sendSignedTransaction(o.rawTransaction))
    // web3.eth.getBalance('0x465EF6e3e3316968792a9a448bdDa70455aAF36b').then(console.log)
});

