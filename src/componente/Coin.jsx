import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import styles from './Coin.module.css';

function Coin() {
  const [coinCrypto, setCoinCrypto] = useState(null);
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const cryptoData = async () => {
      try {
        const response = await axios.get(
          `https://api.coincap.io/v2/assets/${id}`
        );

        setCoinCrypto(response.data.data);

        let favoritesCoin = JSON.parse(localStorage.getItem("favoritesCoin"));
        if(favoritesCoin !== null){
          let coin = favoritesCoin.filter(coin => coin.id === response.data.data.id);
          if(coin.length != 0){
            setIsFavorite(true);
          }
        }
      } catch (error) {
        console.error("nothing fetch");
      }
    };

    cryptoData();
  }, [id]);

  const isFav = (id) => {

    let favoritesCoin = JSON.parse(localStorage.getItem("favoritesCoin"));

    if(favoritesCoin === null){
      favoritesCoin = [];
      
    } else{
        if(isFavorite) {
          favoritesCoin = favoritesCoin.filter(coin => coin.id !== id);
          setIsFavorite(false);
        } else {
          favoritesCoin.push({id});
          setIsFavorite(true);
        }

    }

    localStorage.setItem("favoritesCoin", JSON.stringify(favoritesCoin));
  }

  if (!coinCrypto) {
    return (
      <div>
        <p>Error!</p>
      </div>
    );
  }

  return (
    <div  className={styles.coin}>
      <div className={styles.coinCard}>
      <h1>{coinCrypto.name}</h1>
      <p>Price USD: {coinCrypto.priceUsd}</p>
      <p>Rank: {coinCrypto.rank}</p>
      <p>Symbol: {coinCrypto.symbol}</p>
      <p>Info:{coinCrypto.explorer}</p>
      <button className={styles.btn} onClick={() => isFav(coinCrypto.id)}
        style={{backgroundColor: isFavorite ? 'yellow' : ''}}>Fav</button>
      </div>
    </div>
  );
}

export default Coin;
