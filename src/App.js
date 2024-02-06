import { useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';
import { MdCalculate } from 'react-icons/md';

const App = () => {
    // 항목 내용 상태
    const [charge, setCharge] = useState('');

    // 가격 상태
    const [amount, setAmount] = useState(0);

    // 아이디
    const [id, setId] = useState("")

    // 수정
    const [edit, setEdit] = useState(false);

    // alert
    const [alert, setAlert] = useState({ show: false });

    // 목록
    const [expenses, setExpenses] = useState([
        { id: 1, charge: '렌트비', amount: 1200 },
        { id: 2, charge: '교통비', amount: 400 },
        { id: 3, charge: '식비', amount: 1 },
    ]);

    // 아이템 삭제하기
    const handleDelete = id => {
        const newExpenses = expenses.filter((expense) => expense.id !== id);
        setExpenses(newExpenses);
        handleAlert({type: "danger", text: "목록에서 삭제되었습니다."})
    };

    // 내용 수정하기
    const handleEdit = id => {
        const expense = expenses.find(item=> item.id === id);
        const {charge, amount} = expense;
        setId(id);
        setCharge(charge);
        setAmount(amount);
        setEdit(true);
    }

    // 항목 내용
    const handleCharge = (e) => {
        setCharge(e.target.value);
    };

    // 항목 비용 
    const handleAmount = (e) => {
        setAmount(e.target.valueAsNumber);
    };

    // Alert 생성하기
    const handleAlert = ({type, text}) => {
        setAlert({show: true, type, text})
        setTimeout(() => {
            setAlert({show: false});
        }, 5000)
    }

    // 목록 추가하기
    const handleSubmit = (e) => {
        e.preventDefault();
        if(charge !== "" && amount > 0){
            if(edit){
                const newExpense = expenses.map(item => {
                    return (item.id === id ? {...item, charge, amount} : item);
                })
                setExpenses(newExpense)
                setEdit(false)
                handleAlert({type: "success", text: "아이템이 수정되었습니다."})
            } else {
                const newExpense = {id: crypto.randomUUID(), charge, amount}
                // 불변성을 지켜주기 위해 새로운 expense생성
                const newExpenses = [...expenses, newExpense]
                setExpenses(newExpenses)
                handleAlert({ type:"success", text: "목록에 추가되었습니다." })
            }
            setCharge("");
            setAmount(0);
        } else {
            handleAlert({ type:"danger", text: "지출항목을 입력해주세요. 비용은 0보다 커야 합니다." })
        }
    }

    // 목록지우기
    const clearItems = () => {
        setExpenses([])
    }

    return (
        <main className="main-container">
            {alert.show ? <Alert type={alert.type} text={alert.text} /> : null }
            <h1><MdCalculate />얼마썼노?</h1>
            <div className='total-amount'>
                <p>
                    &#8361;
                    <span>
                        {expenses.reduce((acc, curr)=> {
                            return (acc += curr.amount);
                        }, 0)}
                    </span>
                </p>
            </div>
            <div
                style={{width: '100%',backgroundColor: 'white',padding: '1rem',}}>
                <ExpenseForm 
                    charge={charge} 
                    handleCharge={handleCharge}
                    amount={amount} 
                    handleAmount={handleAmount} 
                    handleSubmit={handleSubmit}
                    edit={edit}
                />
            </div>
            <div
                style={{width: '100%',backgroundColor: 'white',padding: '1rem',}}>
                <ExpenseList 
                    expenses={expenses} 
                    handleDelete={handleDelete}
                    handleEdit={handleEdit} 
                    clearItems={clearItems}
                />
            </div>
        </main>
    );
};

export default App;
