import React from "react";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../auth/AuthContext";
import { FoodEntry } from "../../types/types";

function CalorieItem(props: FoodEntry) {
  const [editItem, setEditItem] = useState(false);
  const [foodName, setfoodName] = useState("Trial1");
  const [foodPrice, setfoodPrice] = useState(100);
  const [foodCalorie, setfoodCalorie] = useState(200);
  const [date, setDate] = useState("17-01-2023");
  const prevDate = new Date().toISOString().split("T")[0];

  const ctx = useContext(AuthContext);
  useEffect(() => {
    setfoodName(props.title);
    setfoodCalorie(props.calorie);
    setfoodPrice(props.price);
    setDate(props.date);
  }, [editItem]);

  const deleteHandler = () => {
    fetch(`http://localhost:3003/food/delete/${props.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", token: ctx.token },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Delete Success", result);
        ctx.onSetFetchData();
      });
  };

  const editHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      foodCalorie === 0 ||
      foodPrice === 0 ||
      foodName.trim() === "" ||
      date === ""
    ) {
      window.alert("You Can't Make the values 0");
    } else {
      const item = {
        title: foodName,
        price: Number(foodPrice),
        calorie: Number(foodCalorie),
        date: date,
      };
      fetch(`http://localhost:3003/food/edit/${props.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", token: ctx.token },
        body: JSON.stringify(item),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log("Edit Success", result);
          ctx.onSetFetchData();
          setEditItem(false);
        });
    }
  };

  return (
    <>
      {editItem && (
        <>
          <div className="overlap_container"></div>
          <form className="edit_form" onSubmit={editHandler}>
            <label>Edit Name</label>
            <input
              value={foodName}
              minLength={4}
              onChange={(e) => setfoodName(e.target.value)}
              type="text"
            />
            <label>Edit Price</label>
            <input
              min={0}
              max={10000}
              value={foodPrice}
              onChange={(e) => setfoodPrice(Number(e.target.value))}
              type="number"
            />
            <label>Edit Calories</label>
            <input
              min={0}
              max={500}
              value={foodCalorie}
              onChange={(e) => setfoodCalorie(Number(e.target.value))}
              type="number"
            />
            <label>Edit Date</label>
            <input
              value={date}
              max={prevDate}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
            <button type="submit">Save Changes</button>
            <button onClick={() => setEditItem(false)} type="submit">
              Cancel
            </button>
          </form>
        </>
      )}
      {!editItem && (
        <>
          <div className="calorie_item">
            <span className="name">{props.title}</span>
            <span className="calorie">{props.calorie} kcal</span>
            <span className="price">Rs.{props.price}</span>
            <button onClick={() => setEditItem(true)} className="action_btn">
              Edit
            </button>
            <button onClick={() => deleteHandler()} className="action_btn">
              Delete
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default CalorieItem;
