import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { routes } from 'src/routes';
import { useStyles } from 'src/styles';
import { ERoutes } from 'src/types/enums';

export const Header: FC = () => {
  const styles = useStyles();

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.headerWrapper}>
          <div className={styles.headerHolder}>
            <Link to={ERoutes.сonverter} className={styles.logo}>
              Currency<b>Exchange</b>
            </Link>
            <nav className={styles.nav}>
              <ul>
                {routes.map(({ title, path }) => (
                  <li key={path}>
                    <NavLink to={path}>{title}</NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <button className={styles.logoutButton}>Logout</button>
        </div>
      </div>
    </header>
  );
};
