import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, auth, signInAnonymous } from './firebase';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Dashboard from './components/Dashboard';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  // Sign in anonymously and set up Firestore listener
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = await signInAnonymous();
        setUserId(user.uid);
      } catch (error) {
        console.error('Authentication error:', error);
        setError('Failed to authenticate. Please try again.');
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Set up Firestore listener once we have a userId
  useEffect(() => {
    if (!userId) return;

    const transactionsRef = collection(db, `users/${userId}/transactions`);
    const q = query(transactionsRef, orderBy('date', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const transactionData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactions(transactionData);
        setLoading(false);
      },
      (error) => {
        console.error('Firestore error:', error);
        setError('Failed to load transactions. Please refresh the page.');
        setLoading(false);
      }
    );

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [userId]);

  const addTransaction = async (transaction) => {
    if (!userId) return;

    try {
      if (editingTransaction) {
        // Update existing transaction
        const transactionRef = doc(db, `users/${userId}/transactions/${editingTransaction.id}`);
        await updateDoc(transactionRef, transaction);
      } else {
        // Add new transaction
        await addDoc(collection(db, `users/${userId}/transactions`), transaction);
      }
    } catch (error) {
      console.error('Error saving transaction:', error);
      setError('Failed to save transaction. Please try again.');
    }
  };

  const deleteTransaction = async (transactionId) => {
    if (!userId) return;

    try {
      const transactionRef = doc(db, `users/${userId}/transactions/${transactionId}`);
      await deleteDoc(transactionRef);
    } catch (error) {
      console.error('Error deleting transaction:', error);
      setError('Failed to delete transaction. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading your transactions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="text-red-500 text-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">Error</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Personal Finance Tracker</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Track your income and expenses with ease</p>
        </header>

        <main>
          <Dashboard transactions={transactions} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <TransactionForm 
                addTransaction={addTransaction} 
                editingTransaction={editingTransaction}
                setEditingTransaction={setEditingTransaction}
              />
            </div>
            
            <div className="lg:col-span-2">
              <TransactionList 
                transactions={transactions} 
                onEdit={setEditingTransaction} 
                onDelete={deleteTransaction} 
              />
            </div>
          </div>
        </main>

        <footer className="mt-16 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} Personal Finance Tracker. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

export default App
