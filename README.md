Ledger System

Overview

This project implements a simple ledger system to manage internal and external financial transactions. It includes functionalities to retrieve account balances, transfer funds, and reverse transactions.

Features: 

- Retrieve account balance.

- Transfer funds between internal accounts.

- Transfer funds to or from external accounts.

- Reverse a previous transaction.

- Maintain a transaction history.

Installation & Setup

Clone the repository:

- git clone https://github.com/Mialy333/Qonto.git
cd Qonto

- Install dependencies (if any):

- npm install # Only if there are dependencies

Usage

1. Checking an account balance

To check the balance of an account, call the getBalance function:

console.log(getBalance("IBAN1")); // Returns the balance of IBAN1

2. Internal fund transfer

To transfer funds between two internal accounts, use:

moveFundsInternal("IBAN1", "IBAN2", 200);

This transfers 200 units from IBAN1 to IBAN2.

3. External fund transfer

To transfer funds between an internal and an external account, use:

moveFunds("IBAN1", "IBAN_EXTERNAL", 100);
moveFunds("IBAN_EXTERNAL", "IBAN2", 50);

This simulates a transaction to or from an external account.

4. Reversing a transaction

To reverse a transaction, find the transaction ID and call:

reverseTransaction(1); // Reverses the transaction with ID 1

5. Viewing transaction history

To see the full transaction history:

console.log(ledger.transactions);

Running Tests

To manually test the functions, execute the provided test cases:

// Checking initial balances
console.log(getBalance("IBAN1"));
console.log(getBalance("IBAN2"));

// Performing transactions
moveFundsInternal("IBAN1", "IBAN2", 200);
moveFunds("IBAN1", "IBAN_EXTERNAL", 100);
moveFunds("IBAN_EXTERNAL", "IBAN2", 50);

// Reversing a transaction
reverseTransaction(1);

// Checking updated balances
console.log(getBalance("IBAN1"));
console.log(getBalance("IBAN2"));

// Displaying transaction history
console.log(ledger.transactions);

Notes

Ensure that transactions are logged correctly in ledger.transactions.

Always check for sufficient balance before transferring funds.

Use moveFundsInternal for internal transactions and moveFunds for external ones.
