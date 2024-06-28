import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./Root.module.css"


function Root() {
  return (
    <div className={styles.root}>
      <h2 className={styles.rooth2}>Crypto Website</h2>
      <nav className={styles.navbar}>
        
        <ul>
          <li>
            <Link to="/"> Home</Link>
          </li>
          <li>
            <Link to="/Favorites">Favorites</Link>
          </li>
        </ul>
      </nav>
      <Outlet/>
    </div>
  );
}

export default Root;
