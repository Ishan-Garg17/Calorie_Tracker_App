import { useContext, useState } from "react";
import AuthContext from "../../auth/AuthContext";
import "./Form.scss";
import React from "react";
import axios from "axios";

interface CalorieFormData {
  title: string;
  price: string;
  calorie: number;
  date: string;
  userID: number;
}

function CalorieForm(props: any) {
  const [foodName, setFoodName] = useState<string>("");
  const [foodPrice, setFoodPrice] = useState<string>("");
  const [foodCalorie, setFoodCalorie] = useState<string>("");
  const currentDate = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState<string>(currentDate);
  const ctx = useContext(AuthContext);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    if (
      date === "" ||
      foodName === "" ||
      foodPrice === "" ||
      foodCalorie === ""
    ) {
      window.alert("Please Enter all fields correctly");
    } else {
      const newData = {
        title: foodName,
        price: foodPrice,
        calorie: Number(foodCalorie),
        date: date,
        userID: ctx.user.id,
      };
      try {
        const response = await axios.put(
          `http://localhost:3003/food`,
          newData,
          {
            headers: {
              token: ctx.token,
            },
          }
        );
        formElement.reset();
        console.log("before submission", ctx.fetchData);
        ctx.onSetFetchData();
        console.log("after submission", ctx.fetchData);
        setFoodCalorie("");
        setFoodName("");
        setFoodPrice("");
        setDate("");
      } catch (error) {
        console.log("error", error);
        window.alert("Please Try Again");
      }
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="">
        <input
          onChange={(e) => setFoodName(e.target.value)}
          type="text"
          minLength={4}
          placeholder="Enter Name"
        />
      </div>
      <div className="">
        <input
          min={0}
          max={5000}
          onChange={(e) => setFoodPrice(e.target.value)}
          type="number"
          placeholder="Price"
        />
      </div>

      <div className="">
        <input
          min={0}
          max={500}
          onChange={(e) => setFoodCalorie(e.target.value)}
          type="number"
          placeholder="Calorie Value"
        />
      </div>

      <div className="">
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          type="date"
          max={currentDate}
          value={date}
          placeholder="Date"
        />
      </div>

      <button type="submit">Submit</button>
      <br />
    </form>
  );
}
export default CalorieForm;
