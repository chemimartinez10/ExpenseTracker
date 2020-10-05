const balance = document.getElementById('balance')
const money_plus = document.getElementById('money-plus')
const money_minus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

const deleteBtn = document.querySelectorAll('.delete-btn')

var idTransaction = +JSON.parse(localStorage.getItem('idTransaction'))

const dummyTransactions = [{
        id: 1,
        text: 'Flower',
        amount: -20
    },
    {
        id: 2,
        text: 'Salary',
        amount: 300
    },
    {
        id: 3,
        text: 'Book',
        amount: -10
    },
    {
        id: 4,
        text: 'Camera',
        amount: 150
    }
]

let transactions = JSON.parse(localStorage.getItem('transactions'))

//methods

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? '-' : '+';
    const item = document.createElement("li")
    item.classList.add(sign === '+' ? 'plus' : 'minus')
    item.innerHTML = `
    
    ${transaction.text} 
    <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onClick="deleteTransaction(${transaction.id})">x</button>
    
    `;
    list.appendChild(item)
}

function calculateBalance() {

    const amounts = JSON.parse(localStorage.getItem('transactions')).map(trans => +trans.amount)
    const income = amounts.filter(a => a > 0).reduce((acc, cur) => acc + cur, 0)
    const expense = amounts.filter(a => a < 0).reduce((acc, cur) => acc + cur, 0)
    const total = income + expense

    balance.innerText = `$${total.toFixed(2)}`
    money_plus.innerText = `$${income.toFixed(2)}`
    money_minus.innerText = `$${Math.abs(expense).toFixed(2)}`

}

function deleteTransaction(id) {
    transactions = transactions.filter(trans => trans.id !== id)
    localStorage.setItem('transactions', JSON.stringify(transactions))
    idTransaction++
    localStorage.setItem('idTransaction', JSON.stringify(idTransaction))
    init()
}

function addTransaction(e) {
    e.preventDefault()
    if (text.value.trim() !== '' && amount.value !== '') {

        transactions.push({
            id: idTransaction,
            text: text.value,
            amount: amount.value
        })

        localStorage.setItem('transactions', JSON.stringify(transactions))
        idTransaction++
        localStorage.setItem('idTransaction', JSON.stringify(idTransaction))
        init()

    } else {
        if (text.value.trim() === '') {
            alert('Enter a text')
        }
        if (amount.value === '') {
            alert('Enter an amount')
        }
    }
}

function init() {
    list.innerHTML = ''
    JSON.parse(localStorage.getItem('transactions')).forEach(addTransactionDOM)
    calculateBalance()

}
//Event listeners
form.addEventListener("submit", addTransaction)

init()