import { useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';
import { LuWallet } from "react-icons/lu";

const App = () => {
    // 항목 내용 상태
    const [charge, setCharge] = useState('');

    // 가격 상태
    const [amount, setAmount] = useState('');

    // 아이디
    const [id, setId] = useState("")

    // 수정
    const [edit, setEdit] = useState(false);

    // alert
    const [alert, setAlert] = useState({ show: false });

    // 목록
    const [expenses, setExpenses] = useState([
        // { id: 1, charge: '렌트비', amount: 1200 },
        // { id: 2, charge: '교통비', amount: 400 },
        // { id: 3, charge: '식비', amount: 1 },
    ]);

    // 아이템 삭제하기
    const handleDelete = id => {
        const newExpenses = expenses.filter((expense) => expense.id !== id);
        setExpenses(newExpenses);
        handleAlert({type: "danger", text: "삭제되었습니다."})
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
        // let value = Number(e.target.value)
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
                handleAlert({type: "success", text: "수정되었습니다."})
            } else {
                const newExpense = {id: crypto.randomUUID(), charge, amount}
                // 불변성을 지켜주기 위해 새로운 expense생성
                const newExpenses = [...expenses, newExpense]
                setExpenses(newExpenses)
                handleAlert({ type:"success", text: "추가되었습니다." })
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

    // 숫자 3자리 콤마찍기
    const totalAmount = expenses.reduce((acc, curr)=> {
        return acc += curr.amount
    }, 0)

    // const keyUpAmount = (e) => {
    //     let target = e.target
    //     let value = e.target.value;
    //     value = Number(value.replaceAll(',', ''));
    //     console.log(value);
    //     if(isNaN(value)) {
    //         target.value = 0;
    //     }else {
    //         const formatValue = value.toLocaleString('ko-KR');
    //         target.value = formatValue;
    //     }
    // }


    return (
        <main className="main-container">
            {alert.show ? <Alert type={alert.type} text={alert.text} /> : null }
            <h1 className='main-title'><LuWallet /> 얼마썼게?</h1>

            <ExpenseForm 
                charge={charge} 
                handleCharge={handleCharge}
                amount={amount} 
                handleAmount={handleAmount} 
                handleSubmit={handleSubmit}
                edit={edit}
            />
        
            <p className='total-amount'> 
                <span>
                    {totalAmount.toLocaleString('ko-KR')} 원
                </span>
            </p>
            
            <ExpenseList 
                expenses={expenses} 
                handleDelete={handleDelete}
                handleEdit={handleEdit} 
                clearItems={clearItems}
            />
        </main>
    );
};

export default App;
