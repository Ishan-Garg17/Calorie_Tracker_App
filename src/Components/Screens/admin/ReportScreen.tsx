import React, { Key, useContext } from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import AuthContext from "../../../auth/AuthContext";
import "./reportScreen.scss";
import { FoodEntry } from "../../../types/types";

interface ReportData {
  lastWeekEntries: FoodEntry[];
  weekBeforeLastEntries: FoodEntry[];
  lastWeekAvgCal: number;
  weekBeforeLastAvgCal: number;
}

function ReportScreen() {
  const [lastWeekEntries, setLastWeekEntries] = useState<FoodEntry[]>([]);
  const [lastToLastWeekEntries, setLastToLastWeekEntries] = useState<
    FoodEntry[]
  >([]);
  const [lastWeekAvgCalories, setLastWeekAvgCalories] = useState<number>(0);
  const [lastToLastWeekAvgCalories, setLastToLastWeekAvgCalories] =
    useState<number>(0);
  const ctx = useContext(AuthContext);

  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3003/food/report/${id}`, {
      headers: { token: ctx.token },
    })
      .then((res) => res.json())
      .then((res) => {
        const {
          lastWeekEntries,
          weekBeforeLastEntries,
          lastWeekAvgCal,
          weekBeforeLastAvgCal,
        } = res as ReportData;

        setLastWeekEntries(lastWeekEntries);
        setLastToLastWeekEntries(weekBeforeLastEntries);
        setLastWeekAvgCalories(lastWeekAvgCal);
        setLastToLastWeekAvgCalories(weekBeforeLastAvgCal);
      });
  }, [id]);

  return (
    <div className="food-entries-container">
      <h2>Last Week's Food Entries</h2>
      <div>
        <p>Average Calories Consumed: {lastWeekAvgCalories}</p>
        <ul>
          {lastWeekEntries.map((entry) => (
            <li key={entry.id}>
              <span>{entry.date}</span>
              <span>{entry.title}</span>
              <span>{entry.calorie} kCal</span>
            </li>
          ))}
        </ul>
      </div>
      <h2>Last to Last Week's Food Entries</h2>
      <div>
        <p>Average Calories Consumed: {lastToLastWeekAvgCalories}</p>
        <ul>
          {lastToLastWeekEntries.map((entry) => (
            <li key={entry.id}>
              <span>{entry.title}</span>
              <span>{entry.calorie} calories</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ReportScreen;
