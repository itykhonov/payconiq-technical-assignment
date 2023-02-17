import React, { FC, useState } from 'react';
import { useStyles } from 'src/pages/converter/styles';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { IOption, SelectElement } from './select-element';
import { IHistoryData } from 'src/pages/converter';

export const daysOptions: IOption[] = [
  { value: '7', label: '7 days' },
  { value: '14', label: '14 days' },
  { value: '30', label: '30 days' }
];

export interface IProps {
  historyData: IHistoryData;
  onChangeDaysAmount: (selected: IOption) => void;
  daysAmount: IOption;
}

export const History: FC<IProps> = ({
  historyData,
  onChangeDaysAmount,
  daysAmount
}: IProps) => {
  const styles = useStyles();
  const [switcherState, setSwitcherState] = useState<boolean>(false);

  return (
    <div className={styles.history}>
      <h2>Exchange History</h2>
      <div className={styles.historyHolder}>
        <div className={styles.inputHolder}>
          <label htmlFor="duration">Duration</label>
          <SelectElement
            options={daysOptions}
            setSelectValue={onChangeDaysAmount}
            filterValue={daysAmount}
            placeholder=""
          />
        </div>
        <ul className={styles.switcher}>
          <li>
            <input
              type="radio"
              name="switcher"
              id="table"
              checked={!switcherState}
              onChange={() => setSwitcherState(!switcherState)}
            />
            <label htmlFor="table">Table</label>
          </li>
          <li>
            <input
              type="radio"
              name="switcher"
              id="chart"
              checked={switcherState}
              onChange={() => setSwitcherState(!switcherState)}
            />
            <label htmlFor="chart">Chart</label>
          </li>
        </ul>
      </div>
      <div className={styles.historyTableHoder}>
        <div className="column">
          {!switcherState && (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Exchange rate</th>
                </tr>
              </thead>
              <tbody>
                {historyData.history.map((row) => {
                  return (
                    <tr key={row.date}>
                      <td>{row.date}</td>
                      <td>{row.rate}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          {switcherState && (
            <Sparklines
              data={historyData.history.map((row) => Number(row.rate))}
            >
              <SparklinesLine color="#009688" />
            </Sparklines>
          )}
        </div>
        <div className="column">
          <table>
            <thead>
              <tr>
                <th>Statistics</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(historyData.statistics).map((row) => {
                return (
                  <tr key={row}>
                    <td>{row}</td>
                    <td>{historyData.statistics[row]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
