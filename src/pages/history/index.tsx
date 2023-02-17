import React, { FC, useEffect, useState } from 'react';
import { deleteFromStorage, getStorage, IStorage } from 'src/services/api';
import { useStyles } from './styles';
import { useNavigate } from 'react-router-dom';
import { ERoutes } from 'src/types/enums';

export const History: FC = () => {
  const styles = useStyles();
  const [data, setData] = useState<Record<string, IStorage>>({});
  const navigate = useNavigate();

  useEffect(() => {
    const data = getStorage();
    setData(data);
  }, []);

  const viewRow = ({ from, to, amount }: IStorage) => {
    navigate(`${ERoutes.сonverter}?from=${from}&to=${to}&amount=${amount}`);
  };

  const deleteRow = (key: string) => {
    delete data[key];
    setData({ ...data });
    deleteFromStorage(key);
  };

  return (
    <main className={styles.main}>
      <h1>Conversion history</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Event</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((row) => {
            return (
              <tr key={row}>
                <td>{data[row].date}</td>
                <td>{`Converted an amount of ${data[row].amount} from ${data[row].from} to ${data[row].to}`}</td>
                <td>
                  <ul className={styles.actions}>
                    <li>
                      <button
                        className="view-button"
                        onClick={() => viewRow(data[row])}
                      >
                        <span className="material-icons ">remove_red_eye</span>{' '}
                        View
                      </button>
                    </li>
                    <li>
                      <button
                        className="delete-button"
                        onClick={() => deleteRow(row)}
                      >
                        <span className="material-icons ">delete_forever</span>{' '}
                        Delete from history
                      </button>
                    </li>
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
};
