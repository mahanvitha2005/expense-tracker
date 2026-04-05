const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = [];

// 📥 LOAD DATA FROM BACKEND
async function loadTransactions() {
    const res = await fetch(https://expense-tracking-backend-3.onrender.com);
    transactions = await res.json();
    updateUI(transactions);
}

// ➕ ADD TRANSACTION
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newTransaction = {
        text: text.value,
        amount: +amount.value
    };

    await fetch("http://localhost:5000/transactions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newTransaction)
    });

    loadTransactions();

    text.value = "";
    amount.value = "";
});

// ❌ DELETE TRANSACTION
async function deleteTransaction(id) {
    await fetch(`http://localhost:5000/transactions/${id}`, {
        method: "DELETE"
    });

    loadTransactions();
}

// 🧾 UPDATE UI
function updateUI(data) {
    list.innerHTML = "";

    let total = 0, inc = 0, exp = 0;

    data.forEach(t => {
        const li = document.createElement("li");

        li.innerHTML = `
            ${t.text}: ₹${t.amount}
            <button onclick="deleteTransaction('${t._id}')">X</button>
        `;

        list.appendChild(li);

        total += t.amount;
        if (t.amount > 0) inc += t.amount;
        else exp += t.amount;
    });

    balance.innerText = `₹${total}`;
    income.innerText = `₹${inc}`;
    expense.innerText = `₹${Math.abs(exp)}`;
    
}

// 🚀 INITIAL LOAD
loadTransactions();
