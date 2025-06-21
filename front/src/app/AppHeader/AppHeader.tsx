import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { appRoutesURL } from "../AppRoutes";
import styles from "./AppHeader.module.css";
import clsx from "clsx";

/**
 * Компонент header приложения (меню)
 */
export const AppHeaderUI = () => {
  const location = useLocation();
  console.log('AppHeaderUI',location.pathname);
  const menu = [
    { name: "Все котики", link: appRoutesURL.home },
    { name: "Любимые котики", link: appRoutesURL.liked },
  ];

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <ul>
          {menu.map((el, cnt) => {
            return (
              <li
                key={cnt}
                className={clsx({
                  [styles.selected]: location.pathname === el.link,
                })}
              >
                <Link to={el.link}>{el.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
