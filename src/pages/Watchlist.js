import React, { useState, useEffect } from "react";
import "../styles/Watchlist.css";
import Button from "../components/Button"; // Import the reusable button component

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    quantity: "",
    notes: "",
  });
  const [editingItem, setEditingItem] = useState(null);

  // Set document title
  useEffect(() => {
    document.title = "My Watchlist";
  }, []);

  // Fetch watchlist
  useEffect(() => {
    try {
      fetch("http://localhost:3001/watchlist")
        .then((response) => response.json())
        .then((data) => setWatchlist(data))
        .catch((error) => console.error("Error fetching watchlist:", error));
    } catch (error) {
      console.error("Unexpected error fetching data:", error);
    }
  }, []);

  // Handle Add
  const handleAdd = (e) => {
    e.preventDefault();

    // Check for empty input
    if (
      !formData.name ||
      !formData.symbol ||
      !formData.quantity ||
      !formData.notes
    ) {
      alert("Please fill out all fields.");
      return;
    }

    const newWatchlistItem = {
      stock: {
        name: formData.name,
        symbol: formData.symbol,
      },
      quantity: parseInt(formData.quantity),
      notes: formData.notes,
      addedAt: new Date().toISOString(),
    };

    fetch("http://localhost:3001/watchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWatchlistItem),
    })
      .then((response) => response.json())
      .then((data) => {
        setWatchlist((prevWatchlist) => [...prevWatchlist, data]);
        setFormData({ name: "", symbol: "", quantity: "", notes: "" }); // Reset form
      })
      .catch((error) => console.error("Error adding to watchlist:", error));
  };

  // Handle Delete
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    fetch(`http://localhost:3001/watchlist/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setWatchlist((prevWatchlist) =>
          prevWatchlist.filter((item) => item.id !== id),
        );
      })
      .catch((error) => console.error("Error deleting watchlist item:", error));
  };

  // Handle Edit
  const handleEdit = (item) => {
    setEditingItem({ ...item });
  };

  const handleEditSave = () => {
    fetch(`http://localhost:3001/watchlist/${editingItem.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: editingItem.quantity,
        notes: editingItem.notes,
      }),
    })
      .then((response) => response.json())
      .then((updatedItem) => {
        setWatchlist((prev) =>
          prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
        );
        setEditingItem(null);
      })
      .catch((error) => console.error("Error saving edit:", error));
  };

  return (
    <div className="watchlist-page">
      <h1>My Watchlist</h1>

      <table className="watchlist-table">
        <thead>
          <tr>
            <th>Stock</th>
            <th>Symbol</th>
            <th>Quantity</th>
            <th>Notes</th>
            <th>Added At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map((item) => (
            <tr key={item.id}>
              <td>{item.stock.name}</td>
              <td>{item.stock.symbol}</td>
              <td>
                {editingItem?.id === item.id ? (
                  <input
                    type="number"
                    value={editingItem.quantity}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        quantity: parseInt(e.target.value),
                      })
                    }
                  />
                ) : (
                  item.quantity
                )}
              </td>
              <td>
                {editingItem?.id === item.id ? (
                  <input
                    type="text"
                    value={editingItem.notes}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, notes: e.target.value })
                    }
                  />
                ) : (
                  item.notes
                )}
              </td>
              <td>{new Date(item.addedAt).toLocaleString()}</td>
              <td>
                {editingItem?.id === item.id ? (
                  <>
                    <Button
                      onClick={handleEditSave}
                      className="btn btn-primary"
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => setEditingItem(null)}
                      className="btn btn-secondary"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => handleEdit(item)}
                      className="btn btn-primary"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form className="add-watchlist-form" onSubmit={handleAdd}>
        <h2>Add to Watchlist</h2>

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
          Symbol:
          <input
            type="text"
            value={formData.symbol}
            onChange={(e) =>
              setFormData({ ...formData, symbol: e.target.value })
            }
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
          Notes:
          <textarea
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            required
          />
        </label>

        <Button type="submit" className="btn btn-success">
          Add to Watchlist
        </Button>
      </form>
    </div>
  );
};

export default Watchlist;
