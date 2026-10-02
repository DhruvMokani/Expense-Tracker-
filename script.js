var total = 0;
var expenses = [];

var savedExpenses = localStorage.getItem("expenses");
savedExpenses = JSON.parse(savedExpenses);

if(savedExpenses != null)
{
    expenses = savedExpenses;
}

expenses.forEach(function(expense)
{
    total += expense.amount;
});

document.getElementById("addExpense").addEventListener("click", addExpense);
document.getElementById("clearExpenses").addEventListener("click", clearExpenses);

document.getElementById("total").textContent = total;

renderExpenses();

function addExpense()
{
    var a = document.getElementById("expensename").value;
    var b = document.getElementById("expenseamount").value;

    if(a == "")
    {
        alert("Please enter an expense name");
        return;
    }

    if(b == "")
    {
        alert("Please enter the expense amount");
        return;
    }

    b = Number(b);

    if(isNaN(b))
    {
        alert("Please enter a valid amount");
        return;
    }

    if(b < 0)
    {
        alert("Please enter a positive amount");
        return;
    }

    var expense = {
        name: a,
        amount: b
    };

    expenses.push(expense);

    total += b;

    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("total").textContent = total;

    renderExpenses();

    document.getElementById("expensename").value = "";
    document.getElementById("expenseamount").value = "";
}

function renderExpenses()
{
    document.getElementById("expenseList").innerHTML = "";

    expenses.forEach(function(expense, index)
    {
        var item = document.createElement("li");
        var actions = document.createElement("div");

        actions.className = "actions";

        item.textContent = expense.name + " - ₹" + expense.amount;

        var list = document.getElementById("expenseList");

        var button = document.createElement("button");

        button.textContent = "Delete";
        button.className = "deleteButton";

        actions.appendChild(button);

        button.addEventListener("click", function()
        {
            deleteExpense(index);
        });

        var edit = document.createElement("button");

        edit.textContent = "Edit";
        edit.className = "editButton";

        actions.appendChild(edit);

        edit.addEventListener("click", function()
        {
            var newName = prompt("Enter new expense name");

            if(newName == null)
            {
                return;
            }

            if(newName == "")
            {
                alert("Please enter an expense name");
                return;
            }

            var newAmount = prompt("Enter new amount");

            if(newAmount == null)
            {
                return;
            }

            newAmount = Number(newAmount);

            if(isNaN(newAmount))
            {
                alert("Please enter a valid amount");
                return;
            }

            if(newAmount < 0)
            {
                alert("Please enter a positive amount");
                return;
            }

            var oldAmount = expenses[index].amount;

            expenses[index].amount = newAmount;
            expenses[index].name = newName;

            total = total - oldAmount + newAmount;

            localStorage.setItem("expenses", JSON.stringify(expenses));

            document.getElementById("total").textContent = total;

            renderExpenses();
        });

        item.appendChild(actions);
        list.appendChild(item);
    });
}

function deleteExpense(index)
{
    var amount = expenses[index].amount;

    expenses.splice(index, 1);

    total -= amount;

    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("total").textContent = total;

    renderExpenses();
}

function clearExpenses()
{
    expenses = [];

    total = 0;

    localStorage.removeItem("expenses");

    document.getElementById("total").textContent = total;

    renderExpenses();
}