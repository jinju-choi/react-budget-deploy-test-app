import { useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

const App = () => {
    // 항목 내용 상태
    const [charge, setCharge] = useState('');

    // 가격 상태
    const [amount, setAmount] = useState(0);

    const [expenses, setExpenses] = useState([
        { id: 1, charge: '렌트비', amount: 30000 },
        { id: 2, charge: '교통비', amount: 100000 },
        { id: 3, charge: '식비', amount: 450000 },
    ]);

    // 아이템 삭제하기
    const handleDelete = (id) => {
        const newExpenses = expenses.filter((expense) => expense.id !== id);
        setExpenses(newExpenses);
    };

    // 항목 내용
    const handleCharge = (e) => {
        console.log(e.target.value);
        setCharge(e.target.value);
    };

    // 항목 비용 
    const handleAmount = (e) => {
        console.log(e.target.value);
        setAmount(e.target.value);
    };

    // 목록 추가하기
    const handleSubmit = (e) => {
        e.preventDefault();
        if(charge !== "" && amount > 0){
            const newExpense = {id: crypto.randomUUID(), charge, amount}
            // 불변성을 지켜주기 위해 새로운 expense생성
            const newExpenses = [...expenses, newExpense]
            setExpenses(newExpenses)
            setCharge("");
            setAmount(0);
        } else {
            alert('error')
        }
    }

    return (
        <main className="main-container">
            <h1>예산 계산기</h1>

            <div
                style={{width: '100%',backgroundColor: 'white',padding: '1rem',}}>
                <ExpenseForm 
                    charge={charge} 
                    handleCharge={handleCharge}
                    amount={amount} 
                    handleAmount={handleAmount} 
                    handleSubmit={handleSubmit}
                />
            </div>
            <div
                style={{width: '100%',backgroundColor: 'white',padding: '1rem',}}>
                <ExpenseList 
                    initialExpenses={expenses} 
                    handleDelete={handleDelete} 
                />
            </div>
            <div
                style={{display: 'flex',justifyContent: 'end',marginTop: '1rem',}}>
                <p style={{ fontSize: '2rem' }}>
                    총 지출:
                    <span>원</span>
                </p>
            </div>
        </main>
    );
};

export default App;
