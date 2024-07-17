import React, { useEffect, useState } from 'react';
import './Transactions.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState('');
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSendMoney = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/accounts/initiate_transaction/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipient, amount }),
      });

      const result = await response.json();
      console.log(result);

      setTransactions([
        ...transactions,
        {
          id: result.transaction.id,
          amount: result.transaction.amount,
          recipient: result.transaction.recipient,
          timestamp: result.transaction.timestamp,
        },
      ]);
    } catch (error) {
      console.error('Error sending money:', error);
    }
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/accounts/transaction_history/');
        const transactionData = await response.json();
        setTransactions(transactionData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="container">
      {userDetails && (
        <div>
          <header>
            <h1>Welcome, {userDetails.username}</h1>
            <p className="current-balance">Current Balance: ${userDetails.balance}</p>
          </header>
        </div>
      )}

      <h2>Transaction History</h2>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <p>Amount: ${transaction.amount}</p>
              <p>Recipient: {transaction.recipient}</p>
              <p>Timestamp: {transaction.timestamp}</p>
            </li>
          ))}
        </ul>
      )}
      <div>
        <h2>Send Money</h2>
        <form>
          <label>
            Recipient's Username:
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </label>
          <label>
            Amount:
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
          <button type="button" onClick={handleSendMoney}>
            Send Money
          </button>
        </form>
      </div>
    </div>
  );
};

export default Transactions;
