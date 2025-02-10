// Data
const ledger = {
  accounts: {
    IBAN1: 1000, // Current balance
    IBAN2: 500,
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

function moveFundsInternal(emitterIban, receiverIban, amount) {
  // Implémentation ici
}

function moveFunds(emitterIban, receiverIban, amount) {
  // Implémentation ici
}

function reverseTransaction(transactionId) {
  // Implémentation ici
}

// Tests
console.log(getBalance("IBAN1")); // Doit retourner 1000
moveFundsInternal("IBAN1", "IBAN2", 200);
console.log(getBalance("IBAN1")); // Doit retourner 800
console.log(getBalance("IBAN2")); // Doit retourner 700
