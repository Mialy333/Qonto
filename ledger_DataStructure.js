// Data
const ledger = {
  accounts: {
    IBAN1: 6000, // Current balance
    IBAN2: 7000,
  },
  transactions: [], // Transactions
};

// Function GetBalance
function getBalance(iban) {
  if (ledger.accounts.hasOwnProperty(iban)) {
    // If the account exists
    return ledger.accounts[iban]; // Current Balance is ...
  } else {
    throw new Error("Compte non trouvé : " + iban); // error
  }
}

// Tests
try {
  console.log(getBalance("IBAN1"));
} catch (error) {
  console.error(error.message);
}

// Function moveFundsInternal
function moveFundsInternal(emitterIban, receiverIban, amount) {
  // Check that both of the account are existing
  if (!ledger.accounts.hasOwnProperty(emitterIban)) {
    throw new Error("Compte émetteur non trouvé : " + emitterIban);
  }
  if (!ledger.accounts.hasOwnProperty(receiverIban)) {
    throw new Error("Compte receveur non trouvé : " + receiverIban);
  }

  // Check that the emitter has enought amount
  if (ledger.accounts[emitterIban] < amount) {
    throw new Error("Fonds insuffisants pour le compte : " + emitterIban);
  }

  // Current balance updating
  ledger.accounts[emitterIban] -= amount;
  ledger.accounts[receiverIban] += amount;

  // Transaction storage
  const transaction = {
    id: ledger.transactions.length + 1,
    emitterIban: emitterIban,
    receiverIban: receiverIban,
    amount: amount,
    date: new Date().toISOString(),
  };
  ledger.transactions.push(transaction);

  console.log(
    `Transaction réussie : ${amount} transférés de ${emitterIban} à ${receiverIban}`
  );
}

// Tests
try {
  console.log("Solde initial IBAN1 :", getBalance("IBAN1"));
  console.log("Solde initial IBAN2 :", getBalance("IBAN2"));

  moveFundsInternal("IBAN1", "IBAN2", 1000); // Transfert

  console.log("Nouveau solde IBAN1 :", getBalance("IBAN1"));
  console.log("Nouveau solde IBAN2 :", getBalance("IBAN2"));

  console.log("Historique des transactions :", ledger.transactions);
} catch (error) {
  console.error(error.message);
}

function moveFunds(emitterIban, receiverIban, amount) {
  // Implémentation ici
}

function reverseTransaction(transactionId) {
  // Implémentation ici
}

// Tests
console.log(getBalance("IBAN1"));
moveFundsInternal("IBAN1", "IBAN2", 1000);
console.log(getBalance("IBAN1"));
console.log(getBalance("IBAN2"));
