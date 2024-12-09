import React from "react";

const WatchlistTable = ({ watchlist, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Stock</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Notes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {watchlist.map((item) => (
          <tr key={item.id}>
            <td>{item.stock.name}</td>
            <td>${item.stock.price}</td>
            <td>{item.quantity}</td>
            <td>{item.notes}</td>
            <td>
              <button onClick={() => onDelete(item.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WatchlistTable;
