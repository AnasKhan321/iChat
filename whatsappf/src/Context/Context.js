import React, { createContext, useContext, useState , useMemo } from 'react';
import {io } from 'socket.io-client'
// Step 1: Create a context
const MyContext = createContext();

// Step 2: Create a provider component
export const useSocket = ()=>{
    const socket = useContext(MyContext)
    return socket ; 
}
const MyProvider = ({ children }) => {
  const [roomNo, setroom] = useState(0)
  const socket = useMemo(()=> io('localhost:8000') , [] )
  return (
    <MyContext.Provider value={socket}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };