import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../auth/AuthContext";

interface PerDayCalData {
  day: string;
  totalCal: number;
}

function CalorieTracker(): JSX.Element {
  const ctx = useContext(AuthContext);
  const [data, setData] = useState<PerDayCalData[]>([]);
  const overLimitDates = data
    .filter((item) => item.totalCal > 2000)
    .map((item) => item.day);

  useEffect(() => {
    fetch(`http://localhost:3003/food/perDay`, {
      method: "GET",
      headers: { "Content-Type": "application/json", token: ctx.token },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("==Data Received from Backend===", res);
        setData(res);
      });
  }, [ctx.token]);

  return (
    <div className="calorie_tracker">
      <h2>Calorie Tracker(Limit=2000 kCal)</h2>
      <ul>
        {data.map((item) => (
          <li key={item.day}>
            <span
              style={{
                color: overLimitDates.includes(item.day) ? "red" : "white",
                fontWeight: overLimitDates.includes(item.day) ? 700 : undefined,
              }}
            >
              {item.day}
            </span>
            <span style={{ width: "12%" }}>:</span>
            <span
              style={{
                color: overLimitDates.includes(item.day) ? "red" : "white",
                fontWeight: overLimitDates.includes(item.day) ? 700 : undefined,
              }}
            >
              {item.totalCal} kCal
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CalorieTracker;
