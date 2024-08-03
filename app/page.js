"use client";

import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDoc,
  querySnapshot,
  onSnapshot,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

export default function Home() {
  const [items, setItems] = useState([
    // { name: "Coffee", price: 4.95 },
    // { name: "Movie", price: 24.95 },
    // { name: "candy", price: 7.95 },
  ]);

  const [newItem, setNewItem] = useState({ name: "", price: "" });

  const [total, setTotal] = useState(0);

  // Add item to database
  const addItem = async (e) => {
    e.preventDefault();
    if (newItem.name !== "" && newItem.price !== "") {
      //setItems([...items, newItem])
      await addDoc(collection(db, "items"), {
        name: newItem.name,
        price: newItem.price,
      });
      // adding just 1 list of items in the database
      setNewItem({ name: "", price: "" });
    }
  };

  // Read items from database
  useEffect(() => {
    const q = query(collection(db, "items"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);

      // Calculate total price from the items array
      const calculateTotal = () => {
        const totalPrice = itemsArr.reduce((sum, item) => {
          const price = parseFloat(item.price);
          return !isNaN(price) ? sum + price : sum;
        }, 0);
        console.log("Calculated Total:", totalPrice); // Check the calculated total
        setTotal(totalPrice);
      };
      calculateTotal();
      // Optional: Clean up the subscription when the component unmounts
      return () => unsubscribe();
    });
  }, []);

  // Delete item from database
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "items", id));
  };

  return (
    <main className="flex min-h-screen flex-col items-center  justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm ">
        <h1 className="text-4xl p-4  text-center"> Expense Tracker</h1>
        <div className="bg-slate-100 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="col-span-3 p-3 border"
              type="text"
              placeholder="Enter Item"
            />
            <input
              value={newItem.price}
              className="col-span-2 mx-3 p-3 border"
              type="number"
              placeholder="Enter $"
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
            />
            <button
              onClick={addItem}
              className="text-white bg-slate-950 hover:bg-slate-900 p-3 text-x"
              type="submit"
            >
              +
            </button>
          </form>
          <ul>
            {items.map((item, id) => (
              <li
                key={item.id}
                className="my-4w-full flex justify-between bg-slate-200"
              >
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span>${item.price}</span>
                </div>
                <button
                  onClick={() => deleteItem(item.id)}
                  className="ml-8 p-4 border-1-2 border-spacing-900 hover:bg-slate-900 w-16"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? (
            ""
          ) : (
            <div className="flex justify-between p-3">
              <span>Total</span>
              <span>${total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
