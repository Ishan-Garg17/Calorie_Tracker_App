import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../auth/AuthContext";
import CaloriesList from "./CaloriesList";
import { FoodEntry } from "./types/types";

function FoodItems() {
  let { id } = useParams<{ id: string }>();
  const [data, setData] = useState<FoodEntry[]>([]);
  const ctx = useContext(AuthContext);

  console.log("the food ID is", id);

  useEffect(() => {
    console.log(ctx.token);
    fetch(`http://localhost:3003/food/admin/${id}`, {
      headers: {
        token: ctx.token,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("==Data Received from Backend===", res);
        setData(res);
      });
  }, [id, ctx.fetchData]);

  return (
    <div>
      {data.length === 0 ? (
        <h1>Please add Food Entry</h1>
      ) : (
        <CaloriesList data={data} />
      )}
    </div>
  );
}

export default FoodItems;
