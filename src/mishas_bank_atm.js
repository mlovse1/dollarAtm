import { Customer } from './customer_account.js';

export class ATM
{
  constructor()
  {
    this.users = new Array();
    this.currentUser = null;
  }

  addUser(name, address, number, userId, pin, initialDeposit)
  {
    let cust = new Customer(name, address, number, userId, pin, initialDeposit);
    this.currentUser = cust;
    this.users.push(cust);
  }

  login(userId, pin)
  {
    for(let i = 0; i < this.users.length; i++)
		{
			if(this.users[i].getUserId() == userId)
			{
				let correctPin = pin == this.users[i].getPin();

				if(correctPin)
				{
					this.setCurrentUser(this.users[i]);
				}

				return correctPin;
			}
		}
		return false;
  }

  logout()
  {
    this.currentUser = null;
  }

  getCurrentUser()
  {
    return this.currentUser;
  }

  setCurrentUser(currentUser)
  {
    this.currentUser = currentUser;
  }

  checkUserBalance()
  {
    if(this.currentUser != null)
    {
      this.currentUser.checkBalance();
    }
  }

  checkUserTransactions()
  {
    if(this.currentUser != null)
    {
      this.currentUser.getTransactions();
    }
  }

  depositUserChecking(amount)
  {
    if(this.currentUser != null)
    {
      this.currentUser.depositChecking(amount);
    }
  }

  depositUserSavings(amount)
  {
    if(this.currentUser != null)
    {
      this.currentUser.depositSavings(amount);
    }
  }

  withdrawUserChecking(amount)
  {
    if(this.currentUser != null)
    {
      this.currentUser.withdrawChecking(amount);
    }
  }

  withdrawUserSavings(amount)
  {
    if(this.currentUser != null)
    {
      this.currentUser.withdrawSavings(amount);
    }
  }

  userTransfer(checkingToSavings, amount)
  {
    if(this.currentUser != null)
    {
      this.currentUser.transfer(checkingToSavings, amount);
    }
  }
}
