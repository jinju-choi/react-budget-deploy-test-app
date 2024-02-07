import React from "react";
import "./ExpenseForm.css";
import { MdSend } from "react-icons/md";

const ExpenseForm = ({ charge, handleCharge, edit, amount, handleAmount, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-center">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        id="charge"
                        name="charge"
                        value={charge}
                        onChange={handleCharge}
                        required
                    />
                    <label htmlFor="charge">지출 항목</label>
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        className="form-control"
                        id="amount"
                        name="amount"
                        value={amount}
                        onChange={handleAmount}
                        required
                    />
                    <label htmlFor="amount">비용</label>
                </div>
                <div className="btn-wrap right">
                    <button type="submit" className="btn btn--primary">
                        {edit? "수정" : "추가" }
                    </button>
                </div>
            </div>
        </form>
    );
};

export default ExpenseForm;
