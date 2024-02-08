import React from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpenseList.css";
import { MdDelete } from "react-icons/md";

const ExpenseList = ({ expenses, handleDelete, handleEdit, clearItems }) => {
    return (
        <>  
            {expenses.length > 0
                ?
                (<ul className="list">
                    {expenses.map((expense) => {
                        return (
                            <ExpenseItem
                                key={expense.id}
                                expense={expense}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                            />
                        );
                    })}
                </ul>)
                :
                (<ul className="list">
                    <li style={{textAlign: "center", color: "#999999"}}>지출 항목을 추가해보세요!</li>
                </ul>)
            }
            {expenses.length > 0 && (
                <div className="btn-wrap right">
                    <button className="btn" onClick={clearItems}>
                        목록 지우기 <MdDelete className="btn-icon" />
                    </button>
                </div>
            )}
        </>
    );
};

export default ExpenseList;
