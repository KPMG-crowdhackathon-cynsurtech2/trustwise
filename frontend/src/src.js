var web3 = new Web3(Web3.givenProvider || "http://192.168.24.184:8545");

var billFactory = new web3.eth.Contract(billFactoryABI, '0xb4c79daB8f259C7Aee6E5b2Aa729821864227e84');
var insuranceFactory = new web3.eth.Contract(insuranceFactoryABI, '0x62d69f6867A0A084C6d313943dC22023Bc263691');

var insurerPk = Cookies.get("insurer-priv-key");
var doctorPk = Cookies.get("client-priv-key");
var clientPk = Cookies.get("doctor-priv-key")

var insurerAddress = web3.eth.accounts.privateKeyToAccount(Cookies.get("insurer-priv-key")).address;
var doctorAddress = web3.eth.accounts.privateKeyToAccount(Cookies.get("doctor-priv-key")).address;
var clientAddress = web3.eth.accounts.privateKeyToAccount(Cookies.get("client-priv-key")).address;

function createInsurance(client, expiryDate, maxPayout, coveredCases) {
    var tx = {
        from: insurerAddress,
        to: insuranceFactory.options.address,
        data: insuranceFactory.methods.create(client, expiryDate, maxPayout, coveredCases).encodeABI(),
        value: maxPayout,
        gasPrice: '0',
        gas: '4000000'
    }
    console.log(tx);
    
    web3.eth.accounts.signTransaction(tx, insurerPk).then((o) => web3.eth.sendSignedTransaction(o.rawTransaction));
}

function createBill(amountToPay, reasonCaseId, logId, patient) {
    var tx = {
        from: doctorAddress,
        to: billFactory.options.address,
        data: billFactory.methods.create(amountToPay, reasonCaseId, logId, patient).encodeABI(),
        value: '0',
        gasPrice: '0',
        gas: '4000000'
    }
    console.log(tx);
    
    web3.eth.accounts.signTransaction(tx, doctorPk).then((o) => web3.eth.sendSignedTransaction(o.rawTransaction));
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

function generateCase(id, description, i){
    var singleCase = '';
    singleCase += '<div class="form-check"><input name="';
    singleCase += id;
    singleCase += '" class="form-check-input" type="checkbox" value="';
    singleCase += i;
    singleCase += '" id="';
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
        var rawCase = generateCase(ICD_10[index].Code, ICD_10[index].Description, index);
        $("#covered-cases").append(rawCase);
    }

}

function generateDiagnosis(id, description, i){
    var singleDiagnosis = '';
    singleDiagnosis += `<option value="`;
    singleDiagnosis += i;
    singleDiagnosis += `">`;
    singleDiagnosis += id;
    singleDiagnosis += `: `;
    singleDiagnosis += description;
    singleDiagnosis += `</option>`;

    return singleDiagnosis
}

function populateDiagnosis(){

    for (let index = 1; index < ICD_10.length; index++) {
        var rawDiagnosis = generateDiagnosis(ICD_10[index].Code, ICD_10[index].Description, index);
        $("#diagnosis").append(rawDiagnosis);
    }

}

$('#insurer-form').submit(function( event ){
    console.log("submitted");
    
    data = $(this).serializeArray();
    var coveredCases = [];
    var maxPayout;
    var client;
    var expiryDate;

    data.forEach(d => {
        switch (d.name) {
            case "max-payout":
                maxPayout = d.value;
                break;
            case "client":
                client = d.value;
                break;
            case "expiry-date":
                expiryDate = (new Date(d.value)).getTime()/1000;
                break;
            default:
                coveredCases.push(d.value);
        }
    });

    console.log(client)
    console.log(expiryDate);
    console.log(maxPayout);
    console.log(coveredCases);
    
    createInsurance(client, expiryDate, maxPayout, coveredCases);

    event.preventDefault();
});

$('#settlement-form').submit(function( event ){
    console.log("submitted");
    
    data = $(this).serializeArray();
    console.log(data);
    
    var amountToPay;
    var reasonCaseId;
    var logId;
    var patient;

    data.forEach(d => {
        switch (d.name) {
            case "diagnosis":
                reasonCaseId = d.value;
                break;
            case "settlement":
                amountToPay = d.value;
                break;
            case "patient":
                patient = d.value;
                break;
            case "reference":
                logId = d.value;
                break;
        }
    });

    console.log(amountToPay)
    console.log(reasonCaseId);
    console.log(logId);
    console.log(patient);
    
    createBill(amountToPay, reasonCaseId, logId, patient)

    event.preventDefault();
});

$(document).ready(function () {
    populateCases();
    populateDiagnosis();

    console.log(Cookies.get("insurer-priv-key"));
    console.log(Cookies.get("client-priv-key"));
    console.log(Cookies.get("doctor-priv-key"));

    insuranceFactory.methods.getContracts().call().then(console.log);
    billFactory.methods.getContracts().call().then(console.log);
    
    // web3.eth.accounts.signTransaction(tx, testPrivateKey).then((o) => web3.eth.sendSignedTransaction(o.rawTransaction))
    // web3.eth.getBalance('0x465EF6e3e3316968792a9a448bdDa70455aAF36b').then(console.log)
});

