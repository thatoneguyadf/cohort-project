/*global alert*/
/*global prompt*/
/*global confirm*/
/*global console*/


//retireves DOM elements to input data in HTML
var sBalance = document.getElementById('sBalance');
var transact = document.getElementById('transact');
var eBalance = document.getElementById('eBalance');
var btn = document.getElementById('btn');
btn.addEventListener('click', initTransact);

//creates Bank objects
function Bank(balance) {
    this.balance = balance || 100;
}

//adds prototypes to Bank objects
Bank.prototype = {
    credit: function credit(num) {
        this.balance += num;
        updateBalance();
    },
    debit: function debit(num) {
        this.balance -= num;
        updateBalance();
    }
};

var bank = new Bank();

updateBalance();

sBalance.textContent = '$' + bank.balance;

/*//loops three times and does credits
for(var i = 0; i < 3; i++) {
    var credInput = parseInt(prompt('Enter an amount to be credited to your account.'));
    if(isNaN(credInput)) {
        alert('Only numerical credits can be applied.');
        continue;
    }
    bank.credit(credInput);
    var credLi = document.createElement('li');
    credLi.textContent = '$' + credInput + ' credit. Current balance: $' + bank.balance;
    credLi.setAttribute('class', 'credit');
    transact.appendChild(credLi);
}

console.log('Bank balance after three credits is: ' + bank.balance);


//loops twice and does debits
for(var j = 0; j < 2; j++) {
    var debInput = parseInt(prompt('Enter an amount to be credited to your account.'));
    if(isNaN(debInput)) {
        alert('Only numerical credits can be applied.');
        continue;
    }
    bank.debit(debInput);
    var debLi = document.createElement('li');
    debLi.textContent = '$' + debInput + ' debit. Current balance: $' + bank.balance;
    debLi.setAttribute('class', 'debit');
    transact.appendChild(debLi);
}

console.log('Final bank balance after two debits is: ' + bank.balance);*/

//gathers info from user and initiates doDebitCredit()
function initTransact() {
    var loops = parseInt(prompt('how many transactions would you like to do?', '1'));
    var credDeb = prompt('What type of transaction would you like to do, "credit" or "debit"?', 'credit');
    if(credDeb === 'debit') {
        doDebitCredit(loops, bank.debit.bind(bank), 'What is the value to be debited?', credDeb);
        return '';
    }
    else if(credDeb === 'credit') {
        doDebitCredit(loops, bank.credit.bind(bank), 'What is the value to be credited', credDeb);
        return '';
    }
    alert('You must enter either "debit" or "credit".');
}

//takes input from user and does debits or credits
function doDebitCredit(numLoops, action, desc, transct) {
    for(var i = 0; i < numLoops; i++) {
        var amnt = parseInt(prompt(desc));

        if(isNaN(amnt)){
            return;
        }

        action(amnt);

        var li = document.createElement('li');
        li.textContent = '$' + amnt + ' ' + transct + '. Current balance: $' + bank.balance;
        li.setAttribute('class', transct);
        transact.appendChild(li);
    }
}

//updates current balance
function updateBalance() {
    eBalance.textContent = '$' + bank.balance;
    if(bank.balance < 0) {
        eBalance.setAttribute('class', 'debit');
        return '';
    }
    eBalance.setAttribute('class', 'credit');
}