import React, { useState, useEffect } from 'react';
import { register, login, deposit, transfer, getTransactions } from './api';

function App() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [amount, setAmount] = useState('');
    const [recipientId, setRecipientId] = useState('');
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchTransactions();
        }
    }, []);

    const handleRegister = async () => {
        const res = await register({ email, password });
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
    };

    const handleLogin = async () => {
        const res = await login({ email, password });
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        fetchTransactions();
    };

    const fetchTransactions = async () => {
        const res = await getTransactions(localStorage.getItem('token'));
        setTransactions(res.data);
    };

    const handleDeposit = async () => {
        await deposit({ amount }, localStorage.getItem('token'));
        fetchTransactions();
    };

    const handleTransfer = async () => {
        await transfer({ amount, recipient_id: recipientId }, localStorage.getItem('token'));
        fetchTransactions();
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">Banking System</h2>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-2 border rounded" />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-2 border rounded" />
                <button onClick={handleRegister} className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
                <button onClick={handleLogin} className="w-full bg-green-500 text-white p-2 rounded mt-2">Login</button>
            </div>

            {user && (
                <div className="mt-6 w-full max-w-md">
                    <h3 className="text-xl font-semibold">Welcome, {user.email}</h3>
                    <input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} className="w-full p-2 mb-2 border rounded" />
                    <button onClick={handleDeposit} className="w-full bg-yellow-500 text-white p-2 rounded">Deposit</button>
                    <input type="text" placeholder="Recipient ID" onChange={(e) => setRecipientId(e.target.value)} className="w-full p-2 mt-2 border rounded" />
                    <button onClick={handleTransfer} className="w-full bg-red-500 text-white p-2 rounded mt-2">Transfer</button>
                </div>
            )}

            {transactions.length > 0 && (
                <div className="mt-6 w-full max-w-md">
                    <h3 className="text-xl font-semibold">Transaction History</h3>
                    <ul className="bg-white shadow-lg rounded-lg p-4">
                        {transactions.map((tx, index) => (
                            <li key={index} className="border-b py-2">{tx.details} - ${tx.amount}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;