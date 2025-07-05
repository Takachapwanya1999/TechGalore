import React, { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#a259f7', '#f75990', '#f7b259', '#59f7b2', '#f75959', '#59a2f7'];

export default function DashboardCharts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ condition: 'All', ram: 'All', storage: 'All' });
  const [visibleChart, setVisibleChart] = useState('all');

  // Simulated busy hours data (replace with real data if available)
  const busyHours = [
    { hour: '08:00', orders: 2 },
    { hour: '09:00', orders: 4 },
    { hour: '10:00', orders: 7 },
    { hour: '11:00', orders: 10 },
    { hour: '12:00', orders: 13 },
    { hour: '13:00', orders: 15 },
    { hour: '14:00', orders: 12 },
    { hour: '15:00', orders: 9 },
    { hour: '16:00', orders: 6 },
    { hour: '17:00', orders: 3 },
  ];

  useEffect(() => {
    fetch('http://localhost:3001/laptops')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{color:'#fff'}}>Loading charts...</div>;

  // Get unique filter options
  const allConditions = Array.from(new Set(products.map(p => p.condition)));
  const allRams = Array.from(new Set(products.map(p => p.ram)));
  const allStorages = Array.from(new Set(products.map(p => p.storage)));

  // Filter products
  const filtered = products.filter(p =>
    (filter.condition === 'All' || p.condition === filter.condition) &&
    (filter.ram === 'All' || p.ram === filter.ram) &&
    (filter.storage === 'All' || p.storage === filter.storage)
  );

  // Chart 1: Price distribution
  const priceData = filtered.map(p => ({ name: p.title, price: p.price }));
  // Chart 2: Condition count
  const conditionCounts = filtered.reduce((acc, p) => {
    acc[p.condition] = (acc[p.condition] || 0) + 1;
    return acc;
  }, {});
  const conditionData = Object.entries(conditionCounts).map(([name, value]) => ({ name, value }));
  // Chart 3: RAM distribution
  const ramCounts = filtered.reduce((acc, p) => {
    acc[p.ram] = (acc[p.ram] || 0) + 1;
    return acc;
  }, {});
  const ramData = Object.entries(ramCounts).map(([name, value]) => ({ name, value }));
  // Chart 4: Storage distribution
  const storageCounts = filtered.reduce((acc, p) => {
    acc[p.storage] = (acc[p.storage] || 0) + 1;
    return acc;
  }, {});
  const storageData = Object.entries(storageCounts).map(([name, value]) => ({ name, value }));
  // Pie chart: All products by CPU
  const cpuCounts = filtered.reduce((acc, p) => {
    acc[p.cpu] = (acc[p.cpu] || 0) + 1;
    return acc;
  }, {});
  const cpuData = Object.entries(cpuCounts).map(([name, value]) => ({ name, value }));

  return (
    <div>
      <div style={{display:'flex',gap:16,justifyContent:'center',marginTop:16,marginBottom:24,flexWrap:'wrap'}}>
        <div>
          <label style={{color:'#222',marginRight:8,fontWeight:600}}>Condition:</label>
          <select value={filter.condition} onChange={e => setFilter(f => ({...f, condition: e.target.value}))}>
            <option value="All">All</option>
            {allConditions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label style={{color:'#222',marginRight:8,fontWeight:600}}>RAM:</label>
          <select value={filter.ram} onChange={e => setFilter(f => ({...f, ram: e.target.value}))}>
            <option value="All">All</option>
            {allRams.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div>
          <label style={{color:'#222',marginRight:8,fontWeight:600}}>Storage:</label>
          <select value={filter.storage} onChange={e => setFilter(f => ({...f, storage: e.target.value}))}>
            <option value="All">All</option>
            {allStorages.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
        <div style={{marginLeft:24}}>
          <label style={{color:'#222',marginRight:8,fontWeight:600}}>Show:</label>
          <select value={visibleChart} onChange={e => setVisibleChart(e.target.value)}>
            <option value="all">All Charts</option>
            <option value="price">Price Distribution</option>
            <option value="condition">Condition Breakdown</option>
            <option value="ram">RAM Distribution</option>
            <option value="storage">Storage Distribution</option>
            <option value="cpu">Products by CPU (Pie)</option>
          </select>
        </div>
        <div style={{marginLeft:24}}>
          <label style={{color:'#222',marginRight:8,fontWeight:600}}>Show:</label>
          <select value={visibleChart} onChange={e => setVisibleChart(e.target.value)}>
            <option value="all">All Charts</option>
            <option value="price">Price Distribution</option>
            <option value="condition">Condition Breakdown</option>
            <option value="ram">RAM Distribution</option>
            <option value="storage">Storage Distribution</option>
            <option value="cpu">Products by CPU (Pie)</option>
            <option value="busy">Busy Hours</option>
          </select>
        </div>
      </div>
      <div style={{
        display: visibleChart === 'all' ? 'flex' : 'block',
        flexWrap: 'wrap',
        gap: 32,
        justifyContent: 'center',
        marginTop: 32,
        background: '#fff',
        borderRadius: 24,
        boxShadow: '0 4px 24px 0 rgba(0,0,0,0.07)',
        padding: visibleChart === 'all' ? 0 : 32
      }}>
        {(visibleChart === 'all' || visibleChart === 'price') && (
          <div style={{background:'#fff',padding:24,borderRadius:16,minWidth:340,boxShadow:'0 2px 8px 0 rgba(0,0,0,0.04)',marginBottom:visibleChart==='all'?0:32,borderBottom:visibleChart==='all'? '2px solid #f0f0f0':'none'}}>
            <h4 style={{color:'#222'}}>Price Distribution</h4>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" hide />
                <YAxis />
                <Tooltip />
                <Bar dataKey="price" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        {(visibleChart === 'all' || visibleChart === 'condition') && (
          <div style={{background:'#fff',padding:24,borderRadius:16,minWidth:340,boxShadow:'0 2px 8px 0 rgba(0,0,0,0.04)',marginBottom:visibleChart==='all'?0:32,borderBottom:visibleChart==='all'? '2px solid #f0f0f0':'none'}}>
            <h4 style={{color:'#222'}}>Condition Breakdown</h4>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={conditionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        {(visibleChart === 'all' || visibleChart === 'ram') && (
          <div style={{background:'#fff',padding:24,borderRadius:16,minWidth:340,boxShadow:'0 2px 8px 0 rgba(0,0,0,0.04)',marginBottom:visibleChart==='all'?0:32,borderBottom:visibleChart==='all'? '2px solid #f0f0f0':'none'}}>
            <h4 style={{color:'#222'}}>RAM Distribution</h4>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ramData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#FFBB28" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        {(visibleChart === 'all' || visibleChart === 'storage') && (
          <div style={{background:'#fff',padding:24,borderRadius:16,minWidth:340,boxShadow:'0 2px 8px 0 rgba(0,0,0,0.04)',marginBottom:visibleChart==='all'?0:32,borderBottom:visibleChart==='all'? '2px solid #f0f0f0':'none'}}>
            <h4 style={{color:'#222'}}>Storage Distribution</h4>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={storageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
        {(visibleChart === 'all' || visibleChart === 'cpu') && (
          <div style={{background:'#fff',padding:24,borderRadius:16,minWidth:340,boxShadow:'0 2px 8px 0 rgba(0,0,0,0.04)',marginBottom:visibleChart==='all'?0:32,borderBottom:visibleChart==='all'? '2px solid #f0f0f0':'none'}}>
            <h4 style={{color:'#222'}}>Products by CPU (Pie)</h4>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={cpuData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {cpuData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
        {(visibleChart === 'all' || visibleChart === 'busy') && (
          <div style={{background:'#fff',padding:24,borderRadius:16,minWidth:340,boxShadow:'0 2px 8px 0 rgba(0,0,0,0.04)',marginBottom:visibleChart==='all'?0:32,borderBottom:visibleChart==='all'? '2px solid #f0f0f0':'none'}}>
            <h4 style={{color:'#222'}}>Busy Hours</h4>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={busyHours}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="orders" fill="#a259f7" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
