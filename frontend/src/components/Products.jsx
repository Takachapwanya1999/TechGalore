export default function Products() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Featured Laptops</h2>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* Example product cards */}
        <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '1rem', width: '250px' }}>
          <div style={{ height: '140px', background: '#eee', borderRadius: '8px', marginBottom: '1rem' }} />
          <h3>Apple MacBook Pro 16"</h3>
          <p style={{ fontWeight: 600, color: '#1976d2', fontSize: '1.1rem' }}>R 46,000</p>
          <button style={{ background: '#222', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.5rem 1.5rem', cursor: 'pointer' }}>View</button>
        </div>
        <div style={{ background: '#fff', borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '1rem', width: '250px' }}>
          <div style={{ height: '140px', background: '#eee', borderRadius: '8px', marginBottom: '1rem' }} />
          <h3>Dell XPS 13</h3>
          <p style={{ fontWeight: 600, color: '#1976d2', fontSize: '1.1rem' }}>R 22,000</p>
          <button style={{ background: '#222', color: '#fff', border: 'none', borderRadius: '6px', padding: '0.5rem 1.5rem', cursor: 'pointer' }}>View</button>
        </div>
        {/* Add more laptop cards as needed */}
      </div>
    </div>
  );
}
