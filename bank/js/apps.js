/*global alert*/
/*global prompt*/
/*global confirm*/
/*global console*/


//retireves DOM elements to input data in HTML
var sBalance = document.getElementById('sBalance');
var transact = document.getElementById('transact');
var eBalance = document.getElementById('eBalance');

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
        updateBalance();
    },
    debit: function debit(num) {
        var useNum = parseInt(num);
        if(isNaN(useNum)) {
            alert('Only numerical debits can be applied.');
            return '';
        }
        this.balance -= useNum;
        updateBalance();
    }
};

var bank = new Bank();

sBalance.textContent = '$' + bank.balance;

//loops three times and does credits
for(var i = 0; i < 3; i++) {
    var credInput = prompt('Enter an amount to be credited to your account.');
    var credLi = document.createElement('li');
    credInput = parseInt(credInput);
    bank.credit(credInput);
    credLi.textContent = '$' + credInput + ' credit. Current balance: $' + bank.balance;
    credLi.setAttribute('class', 'credit');
    transact.appendChild(credLi);
}

console.log('Bank balance after three credits is: ' + bank.balance);


//loops twice and does debits
for(var j = 0; j < 2; j++) {
    var debInput = prompt('Enter an amount to be credited to your account.');
    var debLi = document.createElement('li');
    debInput = parseInt(debInput);
    bank.debit(debInput);
    debLi.textContent = '$' + debInput + ' debit. Current balance: $' + bank.balance;
    debLi.setAttribute('class', 'debit');
    transact.appendChild(debLi);
}

console.log('Final bank balance after two debits is: ' + bank.balance);

function updateBalance() {
    eBalance.textContent = '$' + bank.balance;
    if(bank.balance < 0) {
        eBalance.setAttribute('class', 'debit');
        return '';
    }
    eBalance.setAttribute('class', 'credit');
}