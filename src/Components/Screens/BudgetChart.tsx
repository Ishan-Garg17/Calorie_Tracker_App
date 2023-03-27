import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../auth/AuthContext";
import "./details.scss";

interface Month {
  id: number;
  name: string;
}

const months: Month[] = [
  { id: 1, name: "January" },
  { id: 2, name: "February" },
  { id: 3, name: "March" },
  { id: 4, name: "April" },
  { id: 5, name: "May" },
  { id: 6, name: "June" },
  { id: 7, name: "July" },
  { id: 8, name: "August" },
  { id: 9, name: "September" },
  { id: 10, name: "October" },
  { id: 11, name: "November" },
  { id: 12, name: "December" },
];

interface BudgetData {
  totalBudget: number | null;
}

function BudgetChart() {
  const monthNumber = new Date().getMonth();

  const [selectedMonth, setSelectedMonth] = useState<number>(
    months[monthNumber].id
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const [totalBudget, setTotalBudget] = useState<number | null>(0);

  let percentage: number;
  if (totalBudget! >= 5000) percentage = 0;
  else if (totalBudget === null) percentage = -1;
  else percentage = (5000 / totalBudget!) * 100; // assuming 5000 is the max budget -> this will create an offset for the circle
  const ctx = useContext(AuthContext);

  const circleStyles = {
    strokeDashoffset: percentage,
    stroke: percentage === 0 ? "red" : "white",
  };

  useEffect(() => {
    fetch(`http://localhost:3003/food/budget?month=${selectedMonth}`, {
      method: "GET",
      headers: { "Content-Type": "application/json", token: ctx.token },
    })
      .then((res) => res.json())
      .then((res: BudgetData) => {
        console.log("the response from budget api is", res);
        const { totalBudget } = res;

        setTotalBudget(totalBudget);
      });
  }, [selectedMonth, ctx.token]);

  console.log("the budget is", totalBudget);

  return (
    <div className="budget-chart">
      <div className="consumption_calories">
        <div className="input-div">
          <span>Budget Warning</span>
          <select id="month" value={selectedMonth} onChange={handleChange}>
            {months.map((month) => (
              <option key={month.id} value={month.id}>
                {month.name}
              </option>
            ))}
          </select>
        </div>
        <div className="skill">
          <div className="outer">
            <div className="inner">
              <div id="number">{totalBudget ? totalBudget : 0}</div>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="160px"
            height="190px"
          >
            <defs>
              <linearGradient id="GradientColor">
                <stop offset="0%" stopColor="white" />
                <stop offset="100%" stopColor="white" />
              </linearGradient>
            </defs>
            <circle
              style={circleStyles}
              cx="80"
              cy="85"
              r="74"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
export default BudgetChart;
