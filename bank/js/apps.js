/*global alert*/
/*global prompt*/
/*global confirm*/
/*global console*/

//creates Bank objects
function Bank() {
    this.balance = 100;
}


//adds prototypes to Bank objects
Bank.prototype = {
    credit: function credit(num) {
        var useNum = parseInt(num);
        if(isNaN(useNum)) {
            alert('Only numerical credits can be applied.');
            return '';
        }
        this.balance += useNum;
    },
    debit: function debit(num) {
        var useNum = parseInt(num);
        if(isNaN(useNum)) {
            alert('Only numerical debits can be applied.');
            return '';
        }
        this.balance -= useNum;
    }
};

var bank = new Bank();

for(var i = 0; i < 3; i++) {
    var credInput = prompt('Enter an amount to be credited to your account.');
    credInput = parseInt(credInput);
    bank.credit(credInput);
}

console.log('Bank balance after three credits is: ' + bank.balance);

for(var j = 0; j < 2; j++) {
    var debInput = prompt('Enter an amount to be credited to your account.');
    debInput = parseInt(debInput);
    bank.debit(debInput);
}

console.log('Final bank balance after two debits is: ' + bank.balance);