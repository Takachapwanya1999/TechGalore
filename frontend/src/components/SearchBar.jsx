import './SearchBar.css';

// ...existing code...
export default function SearchBar({ value, onChange, onSearch }) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <input
        type="text"
        placeholder="Search for laptops, models, or brands..."
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '60%',
          padding: '0.75rem 1rem',
          fontSize: '1.1rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
        }}
        onKeyDown={e => { if (e.key === 'Enter') onSearch(); }}
      />
      <button
        style={{
          marginLeft: '1rem',
          padding: '0.75rem 2rem',
          fontSize: '1.1rem',
          borderRadius: '8px',
          border: 'none',
          background: '#222',
          color: '#fff',
          cursor: 'pointer'
        }}
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  );
}
