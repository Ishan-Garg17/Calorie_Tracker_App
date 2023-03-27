import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../auth/AuthContext";
import BudgetChart from "./BudgetChart";
import CaloriesList from "./CaloriesList";
import CalorieTracker from "./CalorieTracker";
import "./details.scss";
import FilterDate from "./FilterDate";
import Pagination from "./Pagination";
import { FoodEntry } from "../../types/types";

type MetaType = {
  total: number;
  limit: number;
  totalPages: number;
  currentPage: number;
};

function Details() {
  const onReload = true;
  const ctx = useContext(AuthContext);
  const [data, setData] = useState<FoodEntry[]>([]);
  const [meta, setMeta] = useState<MetaType>({
    total: 0,
    limit: 5,
    totalPages: 0,
    currentPage: 1,
  });
  const [calorieTracker, setCalorieTracker] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [totalCal, setTotalCal] = useState<number>(10);
  const [fromDate, setFromDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [toDate, setToDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );

  useEffect(() => {
    console.log("==Entered use effect=", ctx.token, ctx.user, fromDate, toDate);

    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3003/food?page=${page}&limit=5&fromDate=${fromDate}&toDate=${toDate}`,
        {
          headers: { token: ctx.token },
        }
      );
      const result = await response.json();
      const { data2, pagination, totalCal } = result;
      setData(data2);
      setTotalCal(totalCal);
      setMeta(pagination);
    };
    fetchData();
  }, [ctx.token, fromDate, toDate, ctx.fetchData, page, onReload]);

  if (data === undefined) {
    return (
      <>
        <div className="overlap_container"></div>
        <div className="details_card">
          <i
            style={{
              zIndex: 3,
              fontSize: "5em",
              color: "white",
              position: "absolute",
              top: "50%",
              left: "50%",
            }}
            className="fa fa-spinner fa-spin"
          ></i>
        </div>
      </>
    );
  } else {
    return (
      <div className="details_card">
        <div className="top">
          <div className="result">
            <span>Your Result</span>
            <h2>{totalCal} kcal</h2>
            <span>Total Calories</span>
            <button onClick={() => setCalorieTracker(!calorieTracker)}>
              {calorieTracker ? `Go Back` : "Track Calories"}
            </button>
          </div>
          <BudgetChart />
        </div>
        {calorieTracker ? (
          <CalorieTracker />
        ) : (
          <>
            <div className="filter_calories">
              <FilterDate
                toDate={toDate}
                fromDate={fromDate}
                setFromDate={setFromDate}
                setToDate={setToDate}
              />
            </div>
            <div className="calorie_list">
              {data.length === 0 ? (
                <h1>Please add Food Entry</h1>
              ) : (
                <CaloriesList data={data} />
              )}
            </div>
            <Pagination
              currentPage={meta.currentPage}
              totalPages={meta.totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    );
  }
}

export default Details;
