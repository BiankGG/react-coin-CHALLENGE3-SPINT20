import React from 'react'
import axios from 'axios'

function Favorites (){
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const getFavorites = async () => {
            try{
                let favoritesCoin = JSON.parse(localStorage.getItem("favoritesCoin"));

                if(favoritesCoin === null){
                favoritesCoin = [];
                };

                const response = await axios.get(
                `https://api.coincap.io/v2/assets/`
                );
        
                const data = response.data.data;

                const updatedFavorites = [];
                data.forEach(coin => {
                    if(favoritesCoin.filter(favorite => favorite.id === coin.id)) {
                        updatedFavorites.push(coin)
                    };
                });
                setFavorites(updatedFavorites);
                localStorage.setItem("favoritesCoin", JSON.stringify(updatedFavorites));
            }catch(error){}
                console.error("nothing fetch");
        }
        getFavorites();
    },[]);

    return(
        <>
        <h2>Your Favorite coins</h2>
        <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            <Link to={`/Coin/${favorite.id}`} className={styles.cryptoCard}>
            </Link>
          </li>
        ))}
            
        </ul>
        
        
        </>
    )

}

export default Favorites;