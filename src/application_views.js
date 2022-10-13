import { ATM } from './mishas_bank_atm.js';
import chalk from 'chalk';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const prompt = require('prompt-sync')({sigint: true});


function validPin(pin)
{
	

	if(pin.length < 4)
	{
		return false;
	}
	return true;
}


export function app()
{
  let atm = new ATM();
  let exit = false;
  let choice = 0;
  let name = "";
  let address = "";
  let number = "";
  let id = "";

  let valid = false;
  let pin = "";
  let initialDeposit = 0;
  let amount = 0;

  do
  {
    if(atm.getCurrentUser() == null)
    {
      console.log(chalk.blue("+---------------------------+"));
      console.log(chalk.blue("| MISHA'S BANK WELCOMES YOU!|"));
      console.log(chalk.blue("+---------------------------+"));
      console.log(chalk.green("1. Create New Account"));
      console.log(chalk.green("2. Login"));
      console.log(chalk.green("3. Exit"));
      choice = prompt(chalk.green("Enter Choice (1, 2 or 3): "));

      switch(choice)
      {
        case "1":
          console.log(chalk.cyan("\n+-------------------------------+"));
          console.log(chalk.cyan("| ENTER DETAILS FOR NEW ACCOUNT |"));
          console.log(chalk.cyan("+-------------------------------+"));
          name = prompt(chalk.green("Customer Name: "));
          address = prompt(chalk.green("Customer Address: "));
          number = prompt(chalk.green("Customer Contact Number: "));
          id = prompt(chalk.green("User ID: "));

          valid = false;
          pin = "";
          do
          {
			console.log(chalk.red("Password must be 4 digits!"));
            pin = prompt(chalk.green("Pin: "));
            valid = validPin(pin);

            if(!valid)
            {
              console.log(chalk.red("Your password is invalid. Please enter a new one."));

            }
          }while(!valid);

          valid = false;
          do
          {
            initialDeposit = prompt(chalk.green("Initial Deposit: "));
            valid = !isNaN(initialDeposit);

            if(!valid)
            {
              console.log(chalk.red("Must be a number!"));
            }
          }while(!valid);

          atm.addUser(name, address, number, id, pin, parseFloat(initialDeposit));
          break;

        case "2":
          valid = false;
          do
          {
            console.log(chalk.blue("\n+---------------------+"));
            console.log(chalk.blue("| ENTER Login Details |"));
            console.log(chalk.blue("+---------------------+"));
            id = prompt(chalk.blue("User ID: "));
            password = prompt(chalk.blue("Password: "));
            valid = atm.login(id, password);

            if(!valid)
            {
              console.log(chalk.red("Invalid Credentials. Try Again!"));
            }

          }while(!valid);
          break;
        case "3":
						exit = true;
						break;
      }
    }
    else
    {
      do
				{
					console.log(chalk.blue("\n+---------------------+"));
					console.log(chalk.blue("| Welcome Customer!!! |"));
					console.log(chalk.blue("+---------------------+"));
					console.log(chalk.blue("1. Deposit Amount Checking"));
					console.log(chalk.blue("2. Deposit Amount Savings"));
					console.log(chalk.blue("3. Withdraw Amount Checking"));
					console.log(chalk.blue("4. Withdraw Amount Savings"));
					console.log(chalk.blue("5. Transfer Between Accounts"));
					console.log(chalk.blue("6. View 5 Recent Transactions"));
					console.log(chalk.blue("7. Display Customer Information"));
					console.log(chalk.blue("8. Sign Out"));

					choice = prompt(chalk.blue("Enter Choice (1, 2, 3, 4, 5, 6, 7, or 8): "));

					switch(choice)
					{
						case "1":
							console.log(chalk.blue("\n+------------------+"));
							console.log(chalk.blue("| Deposit Checking |"));
							console.log(chalk.blue("+------------------+"));
							amount = prompt(chalk.blue("Enter Amount: "));
							atm.depositUserChecking(parseFloat(amount));
							break;
						case "2":
							console.log(chalk.blue("\n+-----------------+"));
							console.log(chalk.blue("| Deposit Savings |"));
							console.log(chalk.blue("+-----------------+"));
							amount = prompt(chalk.blue("Enter Amount: "));
							atm.depositUserSavings(parseFloat(amount));
							break;
						case "3":
							console.log(chalk.yellow("\n+-------------------+"));
							console.log(chalk.yellow("| Withdraw Checking |"));
							console.log(chalk.yellow("+-------------------+"));
							amount = prompt(chalk.yellow("Enter Amount: "));
							atm.withdrawUserChecking(parseFloat(amount));
							break;
						case "4":
							console.log(chalk.yellow("\n+------------------+"));
							console.log(chalk.yellow("| Withdraw Savings |"));
							console.log(chalk.yellow("+------------------+"));
							amount = prompt(chalk.yellow("Enter Amount: "));
							atm.withdrawUserSavings(parseFloat(amount));
							break;
						case "5":
							console.log(chalk.yellow("\n+----------------+"));
							console.log(chalk.yellow("| Transfer Money |"));
							console.log(chalk.yellow("+----------------+"));
							console.log(chalk.yellow("1. Checking to Savings"));
							console.log(chalk.yellow("2. Savings to Checking"));
							//enter which to transfer from and to.
							choice = prompt(chalk.green("Enter Choice (1 or 2): "));

							if(choice == "1")
							{
								amount = prompt(chalk.yellow("Enter Amount: "));
								atm.userTransfer(true, parseFloat(amount));
							}
							else if(choice == "2")
							{
								amount = prompt(chalk.yellow("Enter Amount: "));
								atm.userTransfer(false, parseFloat(amount));
							}
							break;
						case "6":
							console.log(chalk.blue("\n+-----------------------+"));
							console.log(chalk.blue("| 5 Recent Transactions |"));
							console.log(chalk.blue("+-----------------------+"));
							atm.checkUserTransactions(atm.getCurrentUser());
							break;
						case "7":
							console.log(chalk.blue("\n+------------------------------+"));
							console.log(chalk.blue("| Display Customer Information |"));
							console.log(chalk.blue("+------------------------------+"));
							console.log(atm.getCurrentUser().printCustomer());
							//need to add update options
							break;
						case "8":
							atm.logout();
							break;
					}
				}while(choice != 8);
    }

  }while(!exit);


}
