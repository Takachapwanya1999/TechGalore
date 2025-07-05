
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
    let url = 'http://localhost:4000/products';
    fetch(url)
      .then(res => res.json())
      .then(data => {
        // Collect all unique brands for filter dropdown
        const brands = Array.from(new Set(data.map(l => l.title && l.title.split(' ')[0])));
        setAllBrands(brands);
        let filtered = data;
        if (query) {
          const q = query.toLowerCase();
          filtered = filtered.filter(laptop =>
            (laptop.title && laptop.title.toLowerCase().includes(q)) ||
            (laptop.cpu && laptop.cpu.toLowerCase().includes(q)) ||
            (laptop.ram && laptop.ram.toLowerCase().includes(q)) ||
            (laptop.storage && laptop.storage.toLowerCase().includes(q)) ||
            (typeof laptop.price === 'number' && laptop.price.toString().includes(q))
          );
        }
        if (cond !== 'all') {
          filtered = filtered.filter(laptop => laptop.condition && laptop.condition.toLowerCase() === cond);
        }
        if (br !== 'all') {
          filtered = filtered.filter(laptop => laptop.title && laptop.title.split(' ')[0] === br);
        }
        if (minP !== '' && !isNaN(Number(minP))) {
          filtered = filtered.filter(laptop => typeof laptop.price === 'number' && laptop.price >= Number(minP));
        }
        if (maxP !== '' && !isNaN(Number(maxP))) {
          filtered = filtered.filter(laptop => typeof laptop.price === 'number' && laptop.price <= Number(maxP));
        }
        setLaptops(filtered);
      });
  };

  useEffect(() => {
    fetchLaptops();
  }, []);


  // Instant search and filter: fetch on every search/filter change
  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchLaptops(search, condition, brand, minPrice, maxPrice);
    }, 250); // debounce for 250ms
    return () => clearTimeout(timeout);
  }, [search, condition, brand, minPrice, maxPrice]);

  const handleSearch = () => {
    fetchLaptops(search, condition, brand, minPrice, maxPrice);
  };
  // ...existing code...

  return (
    <>
      <div style={{ marginTop: '6.5rem', marginBottom: '2.5rem' }}>
        <SearchBar
          type="laptops"
          value={search}
          onChange={setSearch}
          onSearch={handleSearch}
        />
        {/* Filters Section */}
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
          <div>
            <label style={{ marginRight: 8 }}>Condition:</label>
            <select value={condition} onChange={e => setCondition(e.target.value)} style={{ padding: '0.5rem', borderRadius: 6 }}>
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="used">Used</option>
            </select>
          </div>
          <div>
            <label style={{ marginRight: 8 }}>Brand:</label>
            <select value={brand} onChange={e => setBrand(e.target.value)} style={{ padding: '0.5rem', borderRadius: 6 }}>
              <option value="all">All</option>
              {allBrands.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ marginRight: 8 }}>Min Price:</label>
            <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="e.g. 10000" style={{ width: 90, padding: '0.5rem', borderRadius: 6 }} />
          </div>
          <div>
            <label style={{ marginRight: 8 }}>Max Price:</label>
            <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="e.g. 30000" style={{ width: 90, padding: '0.5rem', borderRadius: 6 }} />
          </div>
        </div>
      </div>
      <div style={{ padding: '2rem' }}>
        <h2>Buy a Laptop ({laptops.length})</h2>
        <div className="laptop-card-grid">
          {laptops.length === 0 ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#1976d2', fontWeight: 500, fontSize: '1.2rem', padding: '2rem 0' }}>
              No laptops found. Try a different search term.
            </div>
          ) : (
            laptops.map((laptop, idx) => (
              <LaptopCard key={laptop.id || idx} laptop={{...laptop, priceDisplay: `R ${laptop.price.toLocaleString()}`}} />
            ))
          )}
        </div>

       
      </div>
    </>
  );
}
