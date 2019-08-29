import React, { createContext, useState, useContext } from "react";

const CountersContext = createContext({});

export function Provider({ children }) {
  const [productAmounts, setProductAmounts] = useState({});
  return (
    <CountersContext.Provider value={{ productAmounts, setProductAmounts }}>
      {children}
    </CountersContext.Provider>
  );
}

export function useProductAmounts() {
  return useContext(CountersContext).productAmounts;
}

export function useSetProductAmount() {
  const { setProductAmounts } = useContext(CountersContext);
  return (id, setter) =>
    setProductAmounts(prev => ({
      ...prev,
      [id]: typeof newAmount === "function" ? setter(prev[id]) : setter
    }));
}
