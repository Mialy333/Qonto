// Structure de données pour le ledger
const ledger = {
  accounts: {
    IBAN1: 5000, // Exemple de compte avec solde initial
    IBAN2: 5000,
  },
  transactions: [], // Historique des transactions
};

// Fonction getBalance (déjà implémentée)
function getBalance(iban) {
  if (ledger.accounts.hasOwnProperty(iban)) {
    return ledger.accounts[iban];
  } else {
    throw new Error("Compte non trouvé : " + iban);
  }
}

// Fonction moveFundsInternal
function moveFundsInternal(emitterIban, receiverIban, amount) {
  // Vérifie que les deux comptes existent
  if (!ledger.accounts.hasOwnProperty(emitterIban)) {
    throw new Error("Compte émetteur non trouvé : " + emitterIban);
  }
  if (!ledger.accounts.hasOwnProperty(receiverIban)) {
    throw new Error("Compte receveur non trouvé : " + receiverIban);
  }

  // Vérifie que l'émetteur a suffisamment de fonds
  if (ledger.accounts[emitterIban] < amount) {
    throw new Error("Fonds insuffisants pour le compte : " + emitterIban);
  }

  // Met à jour les soldes
  ledger.accounts[emitterIban] -= amount; // Déduit le montant de l'émetteur
  ledger.accounts[receiverIban] += amount; // Ajoute le montant au receveur

  // Enregistre la transaction dans l'historique
  const transaction = {
    id: ledger.transactions.length + 1, // Identifiant unique
    emitterIban: emitterIban,
    receiverIban: receiverIban,
    amount: amount,
    date: new Date().toISOString(), // Date de la transaction
  };
  ledger.transactions.push(transaction);

  console.log(
    `Transaction réussie : ${amount} transférés de ${emitterIban} à ${receiverIban}`
  );
}

// Tests
try {
  console.log("Solde initial IBAN1 :", getBalance("IBAN1")); // Doit retourner 1000
  console.log("Solde initial IBAN2 :", getBalance("IBAN2")); // Doit retourner 500

  moveFundsInternal("IBAN1", "IBAN2", 5000); // Transfert de 200 de IBAN1 à IBAN2

  console.log("Nouveau solde IBAN1 :", getBalance("IBAN1")); // Doit retourner 800
  console.log("Nouveau solde IBAN2 :", getBalance("IBAN2")); // Doit retourner 700

  console.log("Historique des transactions :", ledger.transactions);
} catch (error) {
  console.error(error.message);
}
