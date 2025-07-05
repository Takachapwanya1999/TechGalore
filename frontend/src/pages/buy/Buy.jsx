import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import LaptopCard from '../../components/LaptopCard';

export default function Buy() {
  const [laptops, setLaptops] = useState([]);
  const [search, setSearch] = useState("");
  const [condition, setCondition] = useState('all');
  const [brand, setBrand] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [allBrands, setAllBrands] = useState([]);

  // Fetch all products (laptops), filter on frontend for multi-field search and filters
  const fetchLaptops = (query = "", cond = condition, br = brand, minP = minPrice, maxP = maxPrice) => {
    let url = 'http://localhost:3001/products';
    fetch(url)
      .then(res => res.json())
      .then(data => {
        let filtered = data.filter(laptop => {
          const matchesSearch = laptop.name.toLowerCase().includes(query.toLowerCase()) ||
                              laptop.description.toLowerCase().includes(query.toLowerCase()) ||
                              laptop.processor.toLowerCase().includes(query.toLowerCase());
          
          const matchesCondition = cond === 'all' || laptop.condition.toLowerCase() === cond.toLowerCase();
          const matchesBrand = br === 'all' || laptop.name.toLowerCase().includes(br.toLowerCase());
          const matchesMinPrice = !minP || laptop.price >= parseInt(minP);
          const matchesMaxPrice = !maxP || laptop.price <= parseInt(maxP);
          
          return matchesSearch && matchesCondition && matchesBrand && matchesMinPrice && matchesMaxPrice;
        });
        setLaptops(filtered);
      });
  };

  useEffect(() => {
    fetchLaptops();
    // Get unique brands for filter
    fetch('http://localhost:3001/products')
      .then(res => res.json())
      .then(data => {
        const brands = [...new Set(data.map(item => item.name.split(' ')[0]))];
        setAllBrands(brands);
      });
  }, []);

  useEffect(() => {
    fetchLaptops(search, condition, brand, minPrice, maxPrice);
  }, [search, condition, brand, minPrice, maxPrice]);

  // Helper function to get products by category
  const getProductsByCategory = (category) => {
    switch(category) {
      case 'all':
        return laptops;
      case 'recommended':
        return laptops.filter(laptop => 
          (laptop.ram === '16GB' || laptop.storage.includes('512GB')) && 
          laptop.price >= 15000 && laptop.price <= 25000
        );
      case 'apple':
        return laptops.filter(laptop => 
          laptop.name.toLowerCase().includes('macbook') || 
          laptop.name.toLowerCase().includes('apple')
        );
      case 'under20k':
        return laptops.filter(laptop => laptop.price < 20000);
      case 'gaming':
        return laptops.filter(laptop => 
          laptop.name.toLowerCase().includes('razer') || 
          laptop.name.toLowerCase().includes('msi') || 
          laptop.name.toLowerCase().includes('rog') ||
          laptop.name.toLowerCase().includes('gaming')
        );
      case 'business':
        return laptops.filter(laptop => 
          laptop.name.toLowerCase().includes('thinkpad') || 
          laptop.name.toLowerCase().includes('xps') || 
          laptop.name.toLowerCase().includes('spectre') ||
          laptop.name.toLowerCase().includes('envy')
        );
      case 'new':
        return laptops.filter(laptop => laptop.condition.toLowerCase() === 'new');
      default:
        return laptops;
    }
  };

  // Check if any filters are active
  const hasActiveFilters = search || condition !== 'all' || brand !== 'all' || minPrice || maxPrice;

  return (
    <div style={{ marginTop: '80px', padding: '2rem', background: '#f8f9fa', minHeight: '100vh' }}>
      <SearchBar search={search} setSearch={setSearch} />
      
      {/* Filters */}
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center', marginTop: '1rem', flexWrap: 'wrap', background: 'white', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontWeight: '500', color: '#374151', marginRight: '8px' }}>Condition:</label>
          <select 
            value={condition} 
            onChange={(e) => setCondition(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white', fontSize: '0.9rem' }}
          >
            <option value="all">All</option>
            <option value="new">New</option>
            <option value="used">Used</option>
          </select>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontWeight: '500', color: '#374151', marginRight: '8px' }}>Brand:</label>
          <select 
            value={brand} 
            onChange={(e) => setBrand(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white', fontSize: '0.9rem' }}
          >
            <option value="all">All</option>
            {allBrands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontWeight: '500', color: '#374151', marginRight: '8px' }}>Min Price:</label>
          <input 
            type="number" 
            value={minPrice} 
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="Min"
            style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white', fontSize: '0.9rem', width: '90px' }}
          />
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontWeight: '500', color: '#374151', marginRight: '8px' }}>Max Price:</label>
          <input 
            type="number" 
            value={maxPrice} 
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="Max"
            style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #d1d5db', background: 'white', fontSize: '0.9rem', width: '90px' }}
          />
        </div>
      </div>

      {/* Product Sections */}
      {!hasActiveFilters ? (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* All Products Section */}
          <div style={{ marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
              All Products ({getProductsByCategory('all').length})
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
              {getProductsByCategory('all').map(laptop => (
                <LaptopCard key={laptop.id} laptop={laptop} />
              ))}
            </div>
          </div>

          {/* Recommended Section */}
          {getProductsByCategory('recommended').length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
                Recommended ({getProductsByCategory('recommended').length})
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {getProductsByCategory('recommended').map(laptop => (
                  <LaptopCard key={laptop.id} laptop={laptop} />
                ))}
              </div>
            </div>
          )}

          {/* Apple Devices Section */}
          {getProductsByCategory('apple').length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
                Apple Devices ({getProductsByCategory('apple').length})
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {getProductsByCategory('apple').map(laptop => (
                  <LaptopCard key={laptop.id} laptop={laptop} />
                ))}
              </div>
            </div>
          )}

          {/* Under R20,000 Section */}
          {getProductsByCategory('under20k').length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
                Under R20,000 ({getProductsByCategory('under20k').length})
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {getProductsByCategory('under20k').map(laptop => (
                  <LaptopCard key={laptop.id} laptop={laptop} />
                ))}
              </div>
            </div>
          )}

          {/* Gaming Laptops Section */}
          {getProductsByCategory('gaming').length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
                Gaming Laptops ({getProductsByCategory('gaming').length})
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {getProductsByCategory('gaming').map(laptop => (
                  <LaptopCard key={laptop.id} laptop={laptop} />
                ))}
              </div>
            </div>
          )}

          {/* Business Laptops Section */}
          {getProductsByCategory('business').length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
                Business Laptops ({getProductsByCategory('business').length})
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {getProductsByCategory('business').map(laptop => (
                  <LaptopCard key={laptop.id} laptop={laptop} />
                ))}
              </div>
            </div>
          )}

          {/* New Arrivals Section */}
          {getProductsByCategory('new').length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
                New Arrivals ({getProductsByCategory('new').length})
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {getProductsByCategory('new').map(laptop => (
                  <LaptopCard key={laptop.id} laptop={laptop} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        // Show filtered results with original styling
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '600', color: '#1f2937', marginBottom: '1rem' }}>
            Search Results ({laptops.length})
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {laptops.map(laptop => (
              <LaptopCard key={laptop.id} laptop={laptop} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
