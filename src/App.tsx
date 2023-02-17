import React, { createContext, FC, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/header';
import { IOption } from './components/select-element';
import { routes } from './routes';
import { getSymbols } from './services/api';
import { ERoutes } from './types/enums';

export const SymbolsContext = createContext<IOption[]>([]);

const App: FC = () => {
  const [options, setOptions] = useState<IOption[]>([]);

  useEffect(() => {
    const fetchSymbols = async () => {
      const response = await getSymbols();
      const options = Object.keys(response.data.symbols).map((symbol) => ({
        value: symbol,
        label: symbol
      }));
      setOptions(options);
    };
    fetchSymbols();
  }, []);

  return (
    <>
      <Header />
      <SymbolsContext.Provider value={options}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={ERoutes.сonverter} replace />}
          />
          {routes.map(({ component: Component, path }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </SymbolsContext.Provider>
    </>
  );
};

export default App;
