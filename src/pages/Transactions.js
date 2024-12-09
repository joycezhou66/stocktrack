import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Transactions.css";
import Button from "../components/Button"; // Import the reusable button component

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    type: "buy", // default radio option is 'buy'
    isPriority: false,
  });
  // Set document title
  useEffect(() => {
    document.title = "My Transactions";
  }, []);

  // Fetch existing transactions
  useEffect(() => {
    try {
      fetch("http://localhost:3001/transactions")
        .then((response) => response.json())
        .then((data) => setTransactions(data))
        .catch((error) => console.error("Error fetching transactions:", error));
    } catch (error) {
      console.error("Unexpected error fetching data:", error);
    }
  }, []);

  // Handle Add Transaction
  const handleAdd = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.quantity || !formData.price) {
      toast.error("Please fill out all fields."); // This uses toast, so keep it!
      return;
    }

    const newTransaction = {
      stock: { name: formData.name },
      quantity: parseInt(formData.quantity),
      price: parseFloat(formData.price),
      type: formData.type, // buy or sell
      isPriority: formData.isPriority,
      date: new Date().toISOString(),
    };

    fetch("http://localhost:3001/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTransaction),
    })
      .then((response) => response.json())
      .then((data) => {
        setTransactions((prevTransactions) => [...prevTransactions, data]);
        setFormData({
          name: "",
          quantity: "",
          price: "",
          type: "buy",
          isPriority: false,
        }); // Reset form
        toast.success("Transaction added successfully!"); // This uses toast too
      })
      .catch((error) => console.error("Error adding transaction:", error));
  };

  // Handle Delete
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?"))
      return;

    fetch(`http://localhost:3001/transactions/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTransactions((prevTransactions) =>
          prevTransactions.filter((item) => item.id !== id),
        );
        toast.success("Transaction deleted successfully!"); // Uses toast as well
      })
      .catch((error) => console.error("Error deleting transaction:", error));
  };

  return (
    <div className="transactions-page">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />

      <h1>My Transactions</h1>

      <table className="transactions-table">
        <thead>
          <tr>
            <th>Stock</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Type</th>
            <th>Priority</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item) => (
            <tr key={item.id}>
              <td>{item.stock.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.type}</td>
              <td>{item.isPriority ? "✅" : "❌"}</td>
              <td>{new Date(item.date).toLocaleString()}</td>
              <td>
                <Button
                  onClick={() => handleDelete(item.id)}
                  className="btn btn-danger"
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form className="add-transaction-form" onSubmit={handleAdd}>
        <h2>Add a Transaction</h2>

        <label>
          Stock Name:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </label>

        <label>
          Quantity:
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
            required
          />
        </label>

        <label>
          Price:
          <input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
          />
        </label>

        <fieldset>
          <legend>Transaction Type</legend>
          <label>
            <input
              type="radio"
              name="type"
              value="buy"
              checked={formData.type === "buy"}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            />
            Buy
          </label>

          <label>
            <input
              type="radio"
              name="type"
              value="sell"
              checked={formData.type === "sell"}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            />
            Sell
          </label>
        </fieldset>

        <label>
          <input
            type="checkbox"
            checked={formData.isPriority}
            onChange={(e) =>
              setFormData({ ...formData, isPriority: e.target.checked })
            }
          />
          Mark as high-priority
        </label>

        <Button type="submit" className="btn btn-success">
          Add Transaction
        </Button>
      </form>
    </div>
  );
};

export default Transactions;
