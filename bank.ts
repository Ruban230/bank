import * as readline from 'readline';


class Customer {
    firstName: string;
    lastName: string;
    mobileNo: string;
    age: number;
    gender: string;
    accountBalance: number;
  
    constructor(firstName: string, lastName: string, mobileNo: string, age: number, gender: string, initialBalance: number = 0) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.mobileNo = mobileNo;
      this.age = age;
      this.gender = gender;
      this.accountBalance = initialBalance;
    }
  
    debit(amount: number): boolean {
      if (this.accountBalance >= amount) {
        this.accountBalance -= amount;
        console.log(`$${amount} debited from your account.`);
        return true;
      } else {
        console.log("Insufficient funds. Debit operation cancelled.");
        return false;
      }
    }
  
    credit(amount: number): void {
      if (amount >= 100) {
        this.accountBalance += amount - 1; // Deduct $1 for every $100 credited
        console.log(`$${amount} credited to your account.`);
      } else {
        this.accountBalance += amount;
        console.log(`$${amount} credited to your account.`);
      }
    }
  
    checkBalance(): void {
      console.log(`Your account balance is $${this.accountBalance}`);
    }
  }
  
  class Bank {
    customers: Map<string, Customer>;
  
    constructor() {
      this.customers = new Map();
    }
  
    addCustomer(customer: Customer): void {
      this.customers.set(customer.mobileNo, customer);
      console.log(`Customer ${customer.firstName} ${customer.lastName} added.`);
    }
  
    getCustomer(mobileNo: string): Customer | undefined {
      return this.customers.get(mobileNo);
    }
  }

const bank = new Bank();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function createCustomer() {
  rl.question("Enter first name: ", (firstName) => {
    rl.question("Enter last name: ", (lastName) => {
      rl.question("Enter mobile number: ", (mobileNo) => {
        rl.question("Enter age: ", (ageInput) => {
          const age = parseInt(ageInput);
          rl.question("Enter gender: ", (gender) => {
            rl.question("Enter initial balance: ", (balanceInput) => {
              const initialBalance = parseInt(balanceInput);
              const newCustomer = new Customer(firstName, lastName, mobileNo, age, gender, initialBalance);
              bank.addCustomer(newCustomer);
              console.log(`Customer ${firstName} ${lastName} added.`);
              startOperations();
            });
          });
        });
      });
    });
  });
}

function performOperation(customer: Customer) {
  rl.question("Select operation - (1) Check Balance, (2) Debit, (3) Credit, (4) Exit: ", (operation) => {
    switch (operation) {
      case '1':
        customer.checkBalance();
        performOperation(customer);
        break;
      case '2':
        rl.question("Enter debit amount: ", (amountInput) => {
          const amount = parseInt(amountInput);
          customer.debit(amount);
          performOperation(customer);
        });
        break;
      case '3':
        rl.question("Enter credit amount: ", (amountInput) => {
          const amount = parseInt(amountInput);
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
  rl.question("Do you want to create a new customer? (yes/no): ", (answer) => {
    if (answer.toLowerCase() === 'yes') {
      createCustomer();
    } else {
      rl.question("Enter customer's mobile number to perform operations: ", (mobileNo) => {
        const foundCustomer = bank.getCustomer(mobileNo);
        if (foundCustomer) {
          performOperation(foundCustomer);
        } else {
          console.log("Customer not found. Please try again.");
          startOperations();
        }
      });
    }
  });
}

startOperations();
