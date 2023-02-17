import axios from 'axios';

const storageKey = 'conversion-history';

export const getSymbols = () => {
  return axios.get(`${process.env.REACT_APP_API}/symbols`);
};

export const convert = (from: string, to: string, amount: string) => {
  return axios.get(
    `${process.env.REACT_APP_API}/convert?from=${from}&to=${to}&amount=${amount}`
  );
};

export const getHistory = (
  startDay: string,
  endDay: string,
  base: string,
  symbol: string
) => {
  return axios.get(
    `${process.env.REACT_APP_API}/timeseries?start_date=${startDay}&end_date=${endDay}&base=${base}&symbols=${symbol}`
  );
};

export const getStorage = () => {
  return JSON.parse(localStorage.getItem(storageKey) || '{}');
};

export const setStorage = (
  key: string,
  date: string,
  amount: string,
  from: string,
  to: string
) => {
  const storage = getStorage();

  storage[key] = {
    date,
    from,
    to,
    amount
  };

  localStorage.setItem(storageKey, JSON.stringify(storage));
};

export const deleteFromStorage = (key: string) => {
  const storage = getStorage();

  delete storage[key];

  localStorage.setItem(storageKey, JSON.stringify(storage));
};

export interface IStorage {
  date: string;
  from: string;
  to: string;
  amount: string;
}
