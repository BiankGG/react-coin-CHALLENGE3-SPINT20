import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  const [collectionCrypto, setcollectionCrypto] = useState([]);

  useEffect(() => {
    const cryptoData = async () => {
      try {
        const response = await axios.get("https://api.coincap.io/v2/assets");
        // console.log(response.data.data);
        setcollectionCrypto(response.data.data);
      } catch (error) {
        console.error("nothing fetch");
      }
    };

    cryptoData();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <h1> Home Crypto</h1>
      <ul className={styles.cryptoList}>
        {collectionCrypto.map((crypto) => (
          <li key={crypto.id}>
            <Link to={`/Coin/${crypto.id}`} className={styles.cryptoCard}>
              <div>
                <h2>{crypto.name}</h2>
                <p>Rank: {crypto.rank}</p>
                <p>Symbol: {crypto.symbol}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
