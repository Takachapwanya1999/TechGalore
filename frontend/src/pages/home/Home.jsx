import pcImg from '../../assets/pc.png';

export default function Home() {
  return (
    <div style={{ background: '#232f3e', color: '#fff', minHeight: 'calc(100vh - 80px)', padding: '3rem 0 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <div style={{ maxWidth: 700, marginLeft: '4vw' }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-2px' }}>CLICK YOUR NEXT</h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', color: '#e0e0e0' }}>
          Quick. Easy. Simple. Buy or sell your laptop today with immediate payment.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <button style={{ background: '#ff8200', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 8, padding: '1rem 2.5rem', fontSize: '1.1rem', cursor: 'pointer', letterSpacing: 1 }}>SELL MY LAPTOP &rsaquo;</button>
          <button style={{ background: '#ff8200', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 8, padding: '1rem 2.5rem', fontSize: '1.1rem', cursor: 'pointer', letterSpacing: 1 }}>BUY A LAPTOP &rsaquo;</button>
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={pcImg} alt="Laptop" style={{ maxWidth: 480, width: '100%', borderRadius: '1.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.18)' }} />
      </div>
      <div style={{ position: 'absolute', left: 0, bottom: '-60px', width: '100%', height: '32px', background: '#232f3e', zIndex: 1 }} />
    </div>
  );
}
