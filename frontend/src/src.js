var ICD_10 = [{"Code":"A06","Description":"Amebiasis"},{"Code":"A20","Description":"Plague"},{"Code":"A21","Description":"Tularemia"},{"Code":"A22","Description":"Anthrax"},{"Code":"A23","Description":"Brucellosis"},{"Code":"A24","Description":"Glanders and melioidosis"},{"Code":"A25","Description":"Rat-bite fevers"},{"Code":"A26","Description":"Erysipeloid"},{"Code":"A27","Description":"Leptospirosis"},{"Code":"A32","Description":"Listeriosis"},{"Code":"A33","Description":"Tetanus neonatorum"},{"Code":"A34","Description":"Obstetrical tetanus"},{"Code":"A36","Description":"Diphtheria"}];

//console.log(ICD_10[0].Code);

function generateCase(id, description){
    var singleCase = '';
    singleCase += '<div class="form-check"><input class="form-check-input" type="checkbox" value="" id="';
    singleCase += id;
    singleCase += '"><label class="form-check-label" for="';
    singleCase += id;
    singleCase += '">';
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
});

