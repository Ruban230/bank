"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var Customer = /** @class */ (function () {
    function Customer(firstName, lastName, mobileNo, age, gender, initialBalance) {
        if (initialBalance === void 0) { initialBalance = 0; }
        this.firstName = firstName;
        this.lastName = lastName;
        this.mobileNo = mobileNo;
        this.age = age;
        this.gender = gender;
        this.accountBalance = initialBalance;
    }
    Customer.prototype.debit = function (amount) {
        if (this.accountBalance >= amount) {
            this.accountBalance -= amount;
            console.log("$".concat(amount, " debited from your account."));
            return true;
        }
        else {
            console.log("Insufficient funds. Debit operation cancelled.");
            return false;
        }
    };
    Customer.prototype.credit = function (amount) {
        if (amount >= 100) {
            this.accountBalance += amount - 1; // Deduct $1 for every $100 credited
            console.log("$".concat(amount, " credited to your account."));
        }
        else {
            this.accountBalance += amount;
            console.log("$".concat(amount, " credited to your account."));
        }
    };
    Customer.prototype.checkBalance = function () {
        console.log("Your account balance is $".concat(this.accountBalance));
    };
    return Customer;
}());
var Bank = /** @class */ (function () {
    function Bank() {
        this.customers = new Map();
    }
    Bank.prototype.addCustomer = function (customer) {
        this.customers.set(customer.mobileNo, customer);
        console.log("Customer ".concat(customer.firstName, " ").concat(customer.lastName, " added."));
    };
    Bank.prototype.getCustomer = function (mobileNo) {
        return this.customers.get(mobileNo);
    };
    return Bank;
}());
var bank = new Bank();
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function createCustomer() {
    rl.question("Enter first name: ", function (firstName) {
        rl.question("Enter last name: ", function (lastName) {
            rl.question("Enter mobile number: ", function (mobileNo) {
                rl.question("Enter age: ", function (ageInput) {
                    var age = parseInt(ageInput);
                    rl.question("Enter gender: ", function (gender) {
                        rl.question("Enter initial balance: ", function (balanceInput) {
                            var initialBalance = parseInt(balanceInput);
                            var newCustomer = new Customer(firstName, lastName, mobileNo, age, gender, initialBalance);
                            bank.addCustomer(newCustomer);
                            console.log("Customer ".concat(firstName, " ").concat(lastName, " added."));
                            startOperations();
                        });
                    });
                });
            });
        });
    });
}
function performOperation(customer) {
    rl.question("Select operation - (1) Check Balance, (2) Debit, (3) Credit, (4) Exit: ", function (operation) {
        switch (operation) {
            case '1':
                customer.checkBalance();
                performOperation(customer);
                break;
            case '2':
                rl.question("Enter debit amount: ", function (amountInput) {
                    var amount = parseInt(amountInput);
                    customer.debit(amount);
                    performOperation(customer);
                });
                break;
            case '3':
                rl.question("Enter credit amount: ", function (amountInput) {
                    var amount = parseInt(amountInput);
                    customer.credit(amount);
                    performOperation(customer);
                });
                break;
            case '4':
                startOperations();
                break;
            default:
                console.log("Invalid operation. Please try again.");
                performOperation(customer);
                break;
        }
    });
}
function startOperations() {
    rl.question("Do you want to create a new customer? (yes/no): ", function (answer) {
        if (answer.toLowerCase() === 'yes') {
            createCustomer();
        }
        else {
            rl.question("Enter customer's mobile number to perform operations: ", function (mobileNo) {
                var foundCustomer = bank.getCustomer(mobileNo);
                if (foundCustomer) {
                    performOperation(foundCustomer);
                }
                else {
                    console.log("Customer not found. Please try again.");
                    startOperations();
                }
            });
        }
    });
}
startOperations();
