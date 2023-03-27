import React from "react";
import CalorieItem from "./CalorieItem";
import { FoodEntry } from "./types/types";

export interface CalorieListProps {
  data: FoodEntry[];
}

function CaloriesList({ data }: CalorieListProps): JSX.Element {
  console.log("food data to be printed is", data);

  if (data === undefined) {
    return <h1>Loading</h1>;
  } else {
    return (
      <div className="calorie_list" style={{ padding: "30px" }}>
        <br />
        {data.map((item) => (
          <CalorieItem
            key={item.id}
            id={item.id}
            title={item.title}
            calorie={item.calorie}
            price={item.price}
            date={item.date}
          />
        ))}
      </div>
    );
  }
}

export default CaloriesList;
