import chalk from "chalk";

export class Customer
{
  constructor(name, address, number, userId, pin, initialDeposit)
  {
    this.name = name;
    this.address = address;
    this.number = number;
    this.userId = userId;
    this.pin = pin;
    this.checking = initialDeposit;
    this.savings = 0;
    let transaction = name + " deposited $" + initialDeposit + " into their checking account.";
    this.transactions = [transaction];
  }

  checkBalance()
  {
    console.log(chalk.green("Checking: $" + this.checking + "\nSavings: $" + this.savings));
  }

  depositChecking(amount)
  {
    this.checking = this.checking + amount;
    let transaction = this.name + " deposited $" + amount + " into their checking account.";
    this.transactions.push(transaction);
  }

  depositSavings(amount)
  {
    this.savings = this.savings + amount;
    let transaction = this.name + " deposited $" + amount + " into their savings account.";
    this.transactions.push(transaction);
  }

  withdrawChecking(amount)
  {
    if(amount <= this.checking)
		{
			this.checking = this.checking - amount;
      let transaction = this.name + " withdrew $" + amount + " from their checking account.";
			this.transactions.push(transaction);
		}
		else
		{
			console.log(chalk.red("Invalid funds!"));
		}
  }

  withdrawSavings(amount)
  {
    if(amount <= this.savings)
		{
			this.savings = this.savings - amount;
      let transaction = this.name + " withdrew $" + amount + " from their savings account.";
			this.transactions.push(transaction);
		}
		else
		{
			console.log(chalk.red("Invalid funds!"));
		}
  }

  transfer(checkingToSavings, amount)
  {
    if(checkingToSavings)
		{
			if(amount <= this.checking)
			{
				this.checking = this.checking - amount;
				this.savings = this.savings + amount;

  			let transaction = this.name + " transferred $" + amount + " from their checking account to their savings account."
        this.transactions.push(transaction);
			}
			else
			{
				console.log(chalk.red("Invalid funds!"));
			}
		}
		else
		{
			if(amount <= this.savings)
			{
				this.savings = this.savings - amount;
				this.checking = this.checking + amount;

				let transaction = this.name + " transferred $" + amount + " from their savings account to their checking account.";
        this.transactions.push(transaction);
			}
			else
			{
				console.log(chalk.red("Invalid funds!"));
			}
		}
  }

  getName()
  {
    return this.name;
  }

  setName(name)
  {
    this.name = name;
  }

  getAddress()
  {
    return this.address;
  }

  setAddress(address)
  {
    this.address = address;
  }

  getNumber()
  {
    return this.number;
  }

  setNumber(number)
  {
    this.number = number;
  }

  getUserId()
  {
    return this.userId;
  }

  setUserId(userId)
  {
    this.userId = userId;
  }

  getPin()
  {
    return this.pin;
  }

  setPin(pin)
  {
    this.pin = pin;
  }

  getTransactions()
  {
    if(this.transactions.length > 5)
		{
			for(let i = 0; i < 5; i++)
			{
				console.log(chalk.green(this.transactions[i]));
			}
			this.checkBalance();
		}
		else
		{
			for(let i = 0; i < this.transactions.length; i++)
			{
				console.log(chalk.green(this.transactions[i]));
			}
			this.checkBalance();
		}
  }

  printCustomer()
  {
    return "Customer [name=" + this.name + ", address=" + this.address + ", number=" + this.number + ", userId=" + this.userId
				+ "]\n" + "Checking: $" + this.checking + "\nSavings: $" + this.savings;
  }
}
