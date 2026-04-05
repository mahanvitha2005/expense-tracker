const API_URL = "https://expense-tracking-backend-3.onrender.com";

const list = document.getElementById("list");
const balance = document.getElementById("balance");

// Load transactions
async function loadTransactions() {
  const res = await fetch(API_URL);
  const data = await res.json();

  list.innerHTML = ""; // clear list

  let total = 0;

  data.forEach(txn => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${txn.text} : ₹${txn.amount}
      <button onclick="deleteTransaction('${txn._id}')">X</button>
    `;

    list.appendChild(li);

    total += txn.amount;
  });

  balance.innerText = total;
}

// Add transaction
async function addTransaction() {
  const text = document.getElementById("text").value;
  const amount = document.getElementById("amount").value;

  if (!text || !amount) {
    alert("Enter all fields");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      text: text,
      amount: Number(amount)
    })
  });

  // clear inputs
  document.getElementById("text").value = "";
  document.getElementById("amount").value = "";

  loadTransactions(); // refresh UI
}

// Delete transaction
async function deleteTransaction(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  loadTransactions();
}

// Initial load
loadTransactions();
