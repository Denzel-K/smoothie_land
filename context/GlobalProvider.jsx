import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, getUserTransactions } from "@/lib/appwrite";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchUserAndTransactions = async () => {
      try {
        const res = await getCurrentUser();
        if (res) {
          setIsLoggedIn(true);
          setUser(res);

          const userTransactions = await getUserTransactions(res.$id);

          // Sort transactions by date (most recent first)
          const sortedTransactions = userTransactions.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });

          setTransactions(sortedTransactions);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserAndTransactions();
  }, []);

  // Refresh transactions after an order is placed
  const refreshTransactions = async () => {
    if (user) {
      const updatedTransactions = await getUserTransactions(user.$id);

      // Sort transactions by date (most recent first)
      const sortedTransactions = updatedTransactions.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      setTransactions(sortedTransactions);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        transactions,
        refreshTransactions
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
