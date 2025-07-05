import { FiInstagram, FiFacebook, FiX, FiYoutube, FiLinkedin } from 'react-icons/fi';

const footerLinks = [
  {
    title: 'About',
    links: [
      'How it works', 'Why Us?', 'Media', 'Reviews', 'Board of Directors', 'Group Structure', 'Our story', 'Terms of Sale', 'Condition report'
    ]
  },
  {
    title: 'Buying & Selling',
    links: [
      'Buy a laptop', 'Sell my laptop', 'Auctions', 'Valuation'
    ]
  },
  {
    title: 'Value Added Services',
    links: [
      'Finance', 'Finance calculator', 'Insurance', 'Auctions', 'Trade-ins', 'Dealers'
    ]
  },
  {
    title: 'Most Popular Brands',
    links: [
      'Apple', 'Dell', 'HP', 'Lenovo', 'Acer', 'Asus', 'MSI', 'Samsung', 'Microsoft', 'Huawei'
    ]
  },
  {
    title: 'Get in Touch',
    links: [
      'Customer care', 'Our Locations', 'FAQs', 'Careers'
    ]
  }
];

export default function FooterFull() {
  return (
    <footer style={{ background: '#232f3e', color: '#fff', padding: '3rem 0 1.5rem 0', marginTop: '2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          <FiInstagram size={28} style={iconStyle} />
          <FiFacebook size={28} style={iconStyle} />
          <FiX size={28} style={iconStyle} />
          <FiYoutube size={28} style={iconStyle} />
          <FiLinkedin size={28} style={iconStyle} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3.5rem', marginBottom: '2.5rem' }}>
          {footerLinks.map(col => (
            <div key={col.title}>
              <div style={{ fontWeight: 700, marginBottom: 12, fontSize: '1.08rem', color: '#e5e7eb' }}>{col.title}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {col.links.map(link => {
                  // Make 'Our story' clickable and route to /about
                  if (link.toLowerCase() === 'our story') {
                    return (
                      <li
                        key={link}
                        style={{ marginBottom: 7, color: '#cbd5e1', fontSize: '1rem', cursor: 'pointer', textDecoration: 'underline' }}
                        onClick={() => window.location.href = '/about'}
                      >
                        {link}
                      </li>
                    );
                  }
                  return (
                    <li key={link} style={{ marginBottom: 7, color: '#cbd5e1', fontSize: '1rem', cursor: 'pointer' }}>{link}</li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', color: '#cbd5e1', fontSize: '0.98rem', marginTop: '2rem' }}>
          Technology Galore &copy; {new Date().getFullYear()} | Privacy policy | Terms of use | Cookie policy | Return policy
        </div>
      </div>
    </footer>
  );
}

const iconStyle = {
  color: '#fff',
  margin: '0 0.7rem',
  cursor: 'pointer',
  opacity: 0.85,
  transition: 'opacity 0.2s',
};
