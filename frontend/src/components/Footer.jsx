export default function Footer() {
  return (
    <footer style={{ background: '#222', color: '#fff', textAlign: 'center', padding: '1.5rem 0', marginTop: '2rem' }}>
      <div>© {new Date().getFullYear()} Technology Galore. All rights reserved.</div>
    </footer>
  );
}
