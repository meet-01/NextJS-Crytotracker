import Image from "next/image";
import { useState } from "react";
import Coins from "../components/Coins";
import Layout from "../components/Layout";
import SearchBar from "../components/SearchBar";
import CoinList from "../components/CoinList";

export default function Home({ filteredCoins }) {
  const [search, setSearch] = useState("");

  const allCoins = filteredCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(search.toLocaleLowerCase());
  });

  const handleChange = (e) => {
    e.preventDefault();

    setSearch(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className="coin_app">
        <SearchBar type="text" placeholder="search" onChange={handleChange} />
        <CoinList filteredCoins={allCoins} />
      </div>
    </Layout>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
  );
  const filteredCoins = await res.json();

  return {
    props: { filteredCoins },
  };
};
