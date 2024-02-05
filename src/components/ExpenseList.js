import React from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpenseList.css";
import { MdDelete } from "react-icons/md";

const ExpenseList = ({ initialExpenses, handleDelete }) => {
    return (
        <>
            <ul className="list">
                {initialExpenses.map((expense) => {
                    return (
                        <ExpenseItem
                            key={expense.id}
                            expense={expense}
                            handleDelete={handleDelete}
                        />
                    );
                })}
            </ul>
            <button className="btn">
                목록 지우기 <MdDelete className="btn-icon" />
            </button>
        </>
    );
};

export default ExpenseList;
