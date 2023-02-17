import React, { FC, useEffect, useContext, useState } from 'react';
import { useStyles } from './styles';
import { IOption, SelectElement } from '../../components/select-element';
import { SymbolsContext } from 'src/App';
import { useLocation, useNavigate } from 'react-router-dom';
import { convert, getHistory, setStorage } from 'src/services/api';
import { ERoutes } from 'src/types/enums';
import { daysOptions, History } from 'src/components/history';

export interface IHistoryData {
  statistics: Record<string, string | null | number>;
  history: Record<string, string | number | null>[];
}

export const Converter: FC = () => {
  const styles = useStyles();
  const options = useContext(SymbolsContext);
  const [fromSymbol, setFromSymbol] = useState<IOption | null>(null);
  const [toSymbol, setToSymbol] = useState<IOption | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [convertResult, setConvertResult] = useState<number | null>(null);
  const [rate, setRate] = useState<string>('');
  const [convertedAmount, setConvertedAmount] = useState<string>('');
  const [convertedFromSymbol, setConvertedFromSymbol] = useState<string>('');
  const [convertedToSymbol, setConvertedToSymbol] = useState<string>('');
  const { search } = useLocation();
  const navigate = useNavigate();
  const [daysAmount, setDaysAmount] = useState<IOption>(daysOptions[0]);
  const [historyData, setHistoryData] = useState<IHistoryData>({
    statistics: {},
    history: []
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const from = searchParams.get('from') || '';
    const to = searchParams.get('to') || '';
    const amountValue = searchParams.get('amount') || '';

    setFromSymbol({ value: from, label: from });
    setToSymbol({ value: to, label: to });
    setAmount(amountValue);
    setConvertedAmount('');

    const fetchData = async (from: string, to: string, amountValue: string) => {
      const response = await convert(from, to, amountValue);
      setConvertResult(response.data.result);
      setRate(response.data.info.rate);
      setConvertedAmount(response.data.query.amount);
      setConvertedFromSymbol(response.data.query.from);
      setConvertedToSymbol(response.data.query.to);
    };

    if (from && to && amountValue) {
      fetchData(from, to, amountValue);
    }
  }, [search]);

  useEffect(() => {
    if (convertedFromSymbol && convertedToSymbol) {
      const date = new Date();
      const end_date = date.toISOString().slice(0, 10);
      const start_date = new Date(
        date.getTime() - 86400000 * Number(daysAmount.value)
      )
        .toISOString()
        .slice(0, 10);

      const fetchData = async () => {
        const response = await getHistory(
          start_date,
          end_date,
          convertedFromSymbol,
          convertedToSymbol
        );
        const ratesDates = Object.keys(response?.data?.rates);
        const historyData = ratesDates.reduce(
          (acc: IHistoryData, next: string) => {
            const rate = response.data.rates[next][convertedToSymbol];
            if (!acc.statistics.lowest || acc.statistics.lowest > rate) {
              acc.statistics.lowest = rate;
            }
            if (!acc.statistics.highest || acc.statistics.highest < rate) {
              acc.statistics.highest = rate;
            }
            acc.statistics.average = (
              rate / ratesDates.length +
              Number(acc.statistics.average)
            ).toFixed(6);
            acc.history.unshift({
              date: next.split('-').reverse().join('/'),
              rate
            });
            return acc;
          },
          {
            statistics: {
              lowest: null,
              highest: null,
              average: 0
            },
            history: []
          }
        );
        setHistoryData(historyData);
      };

      fetchData();
    }
  }, [convertedFromSymbol, convertedToSymbol, daysAmount.value]);

  const onFromSymbolChanged = (fromSymbol: IOption) => {
    setFromSymbol(fromSymbol);
  };

  const onToSymbolChanged = (toSymbol: IOption) => {
    setToSymbol(toSymbol);
  };

  const onChangeSymbols = () => {
    setToSymbol(fromSymbol);
    setFromSymbol(toSymbol);
  };

  const onChangeAmountValue = (value: string) => {
    if (value === '' || /^[0-9.\b]+$/.test(value)) {
      setAmount(value);
    }
  };

  const convertHandler = () => {
    navigate(
      `${ERoutes.сonverter}?from=${fromSymbol?.value}&to=${toSymbol?.value}&amount=${amount}`
    );

    const newDate = new Date().toISOString();
    const [date, time] = newDate.slice(0, 16).split('T');
    const key = date.split('-').reverse().join('/') + ' @ ' + time;
    setStorage(
      newDate,
      key,
      amount,
      fromSymbol?.value as string,
      toSymbol?.value as string
    );
  };

  const onChangeDaysAmount = (selected: IOption) => {
    setDaysAmount(selected);
  };

  return (
    <main className={styles.main}>
      <h1>I want to convert</h1>
      <div className={styles.converter}>
        <div className={styles.converterHolder}>
          <div className={styles.inputHolder}>
            <label htmlFor="amount">Amount</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => onChangeAmountValue(e.target.value)}
            />
          </div>
          <div className={styles.inputHolder}>
            <label htmlFor="from">From</label>
            <SelectElement
              setSelectValue={onFromSymbolChanged}
              filterValue={fromSymbol}
              options={options}
              placeholder=""
            />
          </div>
          <span
            className="material-icons change-symbols-button"
            onClick={() => onChangeSymbols()}
          >
            compare_arrows
          </span>
          <div className={styles.inputHolder}>
            <label htmlFor="to">To</label>
            <SelectElement
              setSelectValue={onToSymbolChanged}
              filterValue={toSymbol}
              options={options}
              placeholder=""
            />
          </div>
          <button
            className={styles.convertButton}
            disabled={
              !amount ||
              !fromSymbol?.value ||
              !toSymbol?.value ||
              fromSymbol?.value === toSymbol?.value
            }
            onClick={convertHandler}
          >
            Convert
          </button>
        </div>
        {convertedAmount && (
          <div className={styles.convertedResult}>
            <div className="result">
              <span className="amount-from">{convertedAmount}</span>
              <span className="symbol-from">{convertedFromSymbol}</span>=
              <span className="amount-to">
                <b>{convertResult}</b>
              </span>
              <span className="symbol-to">
                <b>{convertedToSymbol}</b>
              </span>
            </div>
            <ul className="currency-list">
              <li>
                1<span className="sybmol-from">{convertedFromSymbol}</span>=
                <span className="rate-to">{rate}</span>
                <span className="symbol-to">{convertedToSymbol}</span>
              </li>
              <li>
                1<span className="sybmol-to">{convertedToSymbol}</span>=
                <span className="rate-from">
                  {(1 / Number(rate)).toFixed(6)}
                </span>
                <span className="sybmol-from">{convertedFromSymbol}</span>
              </li>
            </ul>
          </div>
        )}
      </div>
      {convertedAmount && (
        <History
          historyData={historyData}
          onChangeDaysAmount={onChangeDaysAmount}
          daysAmount={daysAmount}
        />
      )}
    </main>
  );
};
