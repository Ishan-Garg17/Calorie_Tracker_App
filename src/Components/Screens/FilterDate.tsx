import React, { useState } from "react";

interface Props {
  fromDate: string;
  toDate: string;
  setFromDate: (date: string) => void;
  setToDate: (date: string) => void;
}

const FilterDate: React.FC<Props> = ({
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor="fromDate">From Date:</label>
        <input
          type="date"
          id="fromDate"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="toDate">To Date:</label>
        <input
          type="date"
          id="toDate"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>
    </>
  );
};

export default FilterDate;
