import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        let favoritesCoin = JSON.parse(localStorage.getItem("favoritesCoin"));
        console.log("favoritesCoin from localStorage:", favoritesCoin);

        if (favoritesCoin === null) {
          favoritesCoin = [];
        }

        const response = await axios.get(`https://api.coincap.io/v2/assets/`);
        console.log("API response:", response.data);

        const data = response.data.data;

        const updatedFavorites = [];
        data.forEach((coin) => {
          if (favoritesCoin.find((favorite) => favorite.id === coin.id)) {
            updatedFavorites.push(coin);
          }
        });
        console.log("updatedFavorites:", updatedFavorites);
        setFavorites(updatedFavorites);
        localStorage.setItem("favoritesCoin", JSON.stringify(updatedFavorites));
      } catch (error) {
        console.error("nothing fetch", error);
      }
    };
    getFavorites();
  }, []);

  if (favorites.length === 0) {
    return (
      <>
        <p>Aún no hay favoritos</p>
      </>
    );
  } else {
    return (
      <>
        <h2>Your Favorite Coins</h2>
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite.id}>
              <Link to={`/Coin/${favorite.id}`}>{favorite.name}</Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default Favorites;
