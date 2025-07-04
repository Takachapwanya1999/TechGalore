import React from 'react'
import SearchBar from '../components/SearchBar'
import Products from '../components/Products'
import HomeFeatures from '../components/HomeFeatures'
import FooterFull from '../components/FooterFull'


const Home = () => {
  return (
    <>
      <div style={{ minHeight: '100vh', background: '#f4f6fa' }}>
        <SearchBar />
        <Products />
        <HomeFeatures />
      </div>
      <FooterFull />
    </>
  );
}

export default Home
