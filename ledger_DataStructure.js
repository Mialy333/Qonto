// Ledger
const ledger = {
  accounts: {
    IBAN1: 5000,
    IBAN2: 5000,
  },
  transactions: [],
};

// Function getBalance
function getBalance(iban) {
  if (ledger.accounts.hasOwnProperty(iban)) {
    return ledger.accounts[iban];
  } else {
    throw new Error("Account not found : " + iban);
  }
}

// Function moveFundsInternal
function moveFundsInternal(emitterIban, receiverIban, amount) {
  if (!ledger.accounts.hasOwnProperty(emitterIban)) {
    throw new Error("Emitter account not found : " + emitterIban);
  }
  if (!ledger.accounts.hasOwnProperty(receiverIban)) {
    throw new Error("Receiver account not found : " + receiverIban);
  }
  if (ledger.accounts[emitterIban] < amount) {
    throw new Error("Insufficient funds in the account : " + emitterIban);
  }
  ledger.accounts[emitterIban] -= amount;
  ledger.accounts[receiverIban] += amount;
  const transaction = {
    id: ledger.transactions.length + 1,
    emitterIban: emitterIban,
    receiverIban: receiverIban,
    amount: amount,
    date: new Date().toISOString(),
  };
  ledger.transactions.push(transaction);
  console.log(
    `TRANSACTION SUCCESSFUL : ${amount} transferred to ${emitterIban} to ${receiverIban}`
  );
}

// Function moveFunds
function moveFunds(emitterIban, receiverIban, amount) {
  const isEmitterInternal = ledger.accounts.hasOwnProperty(emitterIban);
  const isReceiverInternal = ledger.accounts.hasOwnProperty(receiverIban);
  if (isEmitterInternal && isReceiverInternal) {
    throw new Error(
      "Both of the accounts are internal. Please use moveFundsInternal."
    );
  }
  if (!isEmitterInternal && !isReceiverInternal) {
    throw new Error("Neither account is internal.");
  }
  if (isEmitterInternal) {
    if (ledger.accounts[emitterIban] < amount) {
      throw new Error("Insufficient funds in the account : " + emitterIban);
    }
    ledger.accounts[emitterIban] -= amount;
  }
  if (isReceiverInternal) {
    ledger.accounts[receiverIban] += amount;
  }
  const transaction = {
    id: ledger.transactions.length + 1,
    emitterIban: emitterIban,
    receiverIban: receiverIban,
    amount: amount,
    date: new Date().toISOString(),
  };
  ledger.transactions.push(transaction);
  console.log(
    `TRANSACTION SUCCESSFUL: ${amount} transferred to ${emitterIban} to ${receiverIban}`
  );
}

// Function reverseTransaction
function reverseTransaction(transactionId) {
  const transaction = ledger.transactions.find((t) => t.id === transactionId);
  if (!transaction) {
    throw new Error("Transaction not found : " + transactionId);
  }
  if (!ledger.accounts.hasOwnProperty(transaction.emitterIban)) {
    throw new Error("Emitter account not found : " + transaction.emitterIban);
  }
  if (!ledger.accounts.hasOwnProperty(transaction.receiverIban)) {
    throw new Error("Receiver account not found : " + transaction.receiverIban);
  }
  ledger.accounts[transaction.emitterIban] += transaction.amount;
  ledger.accounts[transaction.receiverIban] -= transaction.amount;
  const reversalTransaction = {
    id: ledger.transactions.length + 1,
    emitterIban: transaction.receiverIban,
    receiverIban: transaction.emitterIban,
    amount: transaction.amount,
    date: new Date().toISOString(),
    reversedTransactionId: transactionId,
  };
  ledger.transactions.push(reversalTransaction);
  console.log(
    `TRANSACTION CANCELLED : ${transaction.amount} returned to ${transaction.receiverIban} to ${transaction.emitterIban}`
  );
}

// Tests
try {
  console.log("Initial balance IBAN1 :", getBalance("IBAN1"));
  console.log("Initial balance IBAN2 :", getBalance("IBAN2"));

  moveFundsInternal("IBAN1", "IBAN2", 200);
  console.log("Current balance IBAN1 :", getBalance("IBAN1"));
  console.log("Current balance IBAN2 :", getBalance("IBAN2"));

  moveFunds("IBAN1", "EXTERNAL_IBAN", 100);
  console.log("Current balance IBAN1 :", getBalance("IBAN1"));

  moveFunds("EXTERNAL_IBAN", "IBAN2", 50);
  console.log("Current balance IBAN2 :", getBalance("IBAN2"));

  reverseTransaction(1);
  console.log("Current balance IBAN1 :", getBalance("IBAN1"));
  console.log("Current balance IBAN2 :", getBalance("IBAN2"));

  console.log("transaction storage :", ledger.transactions);
} catch (error) {
  console.error(error.message);
}
